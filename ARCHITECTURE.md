# HearingGadget — System Architecture

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4, Lato font (`@fontsource/lato`) |
| Routing | React Router v7 (data router: `createBrowserRouter` + loaders/actions) |
| Backend / DB | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| File Storage | Supabase Storage |
| Email | EmailJS (`@emailjs/browser`) — contact form only |
| Notifications | React Toastify |
| Icons | lucide-react |
| Package manager | pnpm |

Architecture decisions are recorded in [`docs/adr/`](docs/adr/).

---

## Entry Point

```
main.jsx
└── <StrictMode>
    └── <AuthProvider>              ← wraps entire app, holds user session
        └── <App />
            ├── <ToastContainer />  ← single instance, serves public + admin routes
            └── <RouterProvider router={createBrowserRouter([...])} />
```

`AuthProvider` calls `supabase.auth.getUser()` on mount and subscribes to `onAuthStateChange` — all routes can read `user` and `loading` via `useAuth()`.

---

## Routes

Both top-level routes set `errorElement: <Error />` and a route-level `HydrateFallback`.

```
/                         → UserLayout         (Navbar + <Outlet> + Footer)
    (index)               → Home.jsx
    /products             → Products.jsx        loader: loaderProductsPublic
    /products/:slug       → ProductDetail.jsx   loader: loaderProductDetail
    /about                → AboutUs.jsx
    /contact              → Contact.jsx         action: actionContact
    /admin/login          → AdminLogin.jsx

/admin                    → ProtectedRoute
                            └── AdminLayout    (Sidebar + AdminHeader + <Outlet>)
    (index)               → AdminDashboardPage   loader: loaderDashboard
    /admin/products       → AdminProductPage     loader: loaderProducts    action: actionProducts
    /admin/categories     → AdminCategoriesPage  loader: loaderCategories  action: actionCategories
    /admin/setting        → AdminSettingPage     loader: loaderSettings    action: actionSettings
```

### Auth Guard — `ProtectedRoute`

```
useAuth()
  ├── loading = true  → show "Loading..."
  ├── user = null     → <Navigate to="/admin/login" />
  └── user exists     → render children
```

Login calls `supabase.auth.signInWithPassword({ email, password })` and navigates to `/admin` on success.
Logout calls `supabase.auth.signOut()` and navigates to `/`.

> **Known issue:** `ProtectedRoute` is a component guard, but route **loaders run before components render**. Visiting an admin URL while logged out runs its loader first; if that loader fails (e.g. `/admin/setting`), the `Error` page is shown instead of redirecting to login.

---

## Layouts

```
UserLayout                   AdminLayout
├── <Navbar />               ├── <Sidebar />          ← nav links, logout button
├── <main>                   └── <div>
│   └── <Outlet />               ├── <AdminHeader />  ← user email display
└── <Footer />                   └── <main>
                                     └── <Outlet />   ← page content rendered here
```

---

## Page Data Flow

All data-driven pages follow the same pattern (see `CLAUDE.md` → Architecture Principles):

```
Route
├── loaderX()   ← thin: calls one service function, returns its result
│                  component reads it with useLoaderData()
└── actionX()   ← reads request.formData(), calls services inside try/catch,
                   shows a toast, returns a result (never lets errors escape)
```

> Products, Categories, Settings and Contact all follow this action pattern. Forms that submit through a fetcher (the product modal, the contact form) react to `fetcher.data.success`: the modal closes / the form resets only on success, so a failed save keeps the user's input.

- **Pages** (`src/pages/**`) export the route component plus colocated `loaderX` / `actionX`.
- **Services** (`src/services/*.js`) own all I/O and **throw** on failure; they never catch.
- **Components** render props only — no fetching.
- Admin pages with several operations send a hidden `intent` field (`create` / `update` / `delete`) and branch on it inside the action.
- After an action finishes, React Router **revalidates** (re-runs the loaders of all matched routes), so lists refresh without manual reloading.
- Loading state (V1): one skeleton per page, driven by `useNavigation()`.

### Admin Dashboard (`/admin`)

`loaderDashboard` → `dashboardService.getDashboardData()`, which runs the independent queries concurrently with `Promise.all` and returns one flat object. Visitor stats/trend are **stubs** (`TODO: PostHog in V2`).

### Admin Products (`/admin/products`)

```
actionProducts (intent)
├── create → productService.createProduct(fields)           (slug = slugify(name))
│            └── for each image: storageService.uploadProductImage(file)
│                                → productImageService.createProductImage({ product_id, image_path })
├── update → productService.updateProduct(id, fields)
│            └── if new images uploaded: delete old files + rows, then upload/insert the new ones
└── delete → delete image files from Storage → productImageService.deleteProductImage(id)
             → productService.deleteProduct(id)
```

Each branch has its own `try/catch` and returns `{ success }`. Storage and the database can't share a transaction, so a failure part-way is not rolled back (V1 decision):

| Failure | Toast | Returns | Why |
|---|---|---|---|
| `create`: product insert fails | error | `false` | nothing saved; retry is safe |
| `create`: product saved, images fail | warning ("Edit to re-upload") | `true` | closes the modal — retrying would create a duplicate |
| `update`: product update fails | error | `false` | nothing changed |
| `update`: fields saved, images fail | warning ("Edit to re-upload") | `true` | consistent with `create` |
| `delete` fails | error ("try again") | `false` | retrying delete is idempotent |

V2 option: upload files first, then insert rows in a Postgres function (RPC) so the database part is one transaction.

### Contact form (`/contact`)

See [ADR 0001](docs/adr/0001-contact-form-via-emailjs.md) for the full rationale.

```
<fetcher.Form method="POST">          ← useFetcher: not a navigation
  title, name, email, message (required)
        │
        ▼
actionContact
├── try   → emailService.sendContactMessage({ title, name, email, message })
│           → emailjs.send(serviceId, templateId, params, publicKey)
│           → toast.success → return { success: true }
└── catch → console.error(error) → toast.error → return { success: false }
        │
        ▼
Contact.jsx useEffect: fetcher.state === 'idle' && fetcher.data?.success → form.reset()
Button disabled + spinner while fetcher.state !== 'idle'
```

The EmailJS public key is bundled into the browser by design; abuse is limited by the template's fixed **To** address, EmailJS allowed origins and rate limits.

---

## Supabase Database Tables

Columns listed are the ones the app reads/writes.

### `products`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| name | text | |
| slug | text | generated from `name` by `slugify()` in `productService` |
| category_id | uuid FK | → categories.id |
| price | numeric | |
| stock | integer | |
| description | text | |
| is_active | boolean | |
| shopee_url | text | |
| lazada_url | text | |

### `categories`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| name | text | |
| description | text | |

A category with products assigned cannot be deleted (`deleteCategories` checks `products(count)` first).

### `product_images`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| product_id | uuid FK | → products.id |
| image_path | text | filename in Storage bucket |
| display_order | integer | |

### `settings`
Single row, created with defaults by `loaderSettings` if missing.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| company_name, company_description | text | |
| logo_url | text | path in `setting-assets` bucket |
| phone, email, address | text | |
| google_maps_url, facebook_url, line_url, instagram_url | text | nullable |

---

## Supabase Storage

| Bucket | Used for | Functions |
|---|---|---|
| `product-images` | product photos | `uploadProductImage(file)`, `deleteProductImageFromStorage(path)` |
| `setting-assets` | company logo | `uploadCompanyLogo(file)`, `deleteCompanyLogoFromStorage(path)` |

`getImageUrl(path, bucket = "product-images")` returns a public URL for either bucket.

---

## Service Layer

All I/O lives in `src/services/`. Pages never call `supabase` or `emailjs` directly. Named async exports; failures are thrown, never returned.

```
src/services/
├── productService.js
│   ├── getProducts()             SELECT with categories + product_images
│   ├── getProduct(id)
│   ├── getProductBySlug(slug)    used by /products/:slug
│   ├── getProductsPageData()     Promise.all(products, categories) for /products
│   ├── createProduct(data)       INSERT (adds slug) → returns created row
│   ├── updateProduct(id, data)   UPDATE (re-generates slug)
│   └── deleteProduct(id)
│
├── categoryService.js
│   ├── getCategories()           SELECT *, products(count)
│   ├── createCategories(data)
│   ├── updateCategories(id, data)
│   └── deleteCategories(id)      refuses if the category still has products
│
├── productImageService.js
│   ├── getProductImage(productId)
│   ├── createProductImage(data)
│   ├── updateProductImage(productId, imagePath)
│   └── deleteProductImage(productId)
│
├── storageService.js             see Supabase Storage above
│
├── settingsService.js
│   ├── getSettings()
│   ├── createDefaultSettings()
│   └── updateSettings(id, data)
│
├── dashboardService.js
│   ├── getProductStats(), getCategoryStats(), getRecentProducts(), getWebsiteChecklist()
│   ├── getWebsiteVisitorStats(), getVisitorTrend()   ← stubs, PostHog in V2
│   └── getDashboardData()        orchestrator: Promise.all → one flat object
│
└── emailService.js
    └── sendContactMessage({ title, name, email, message })   EmailJS send; throws on failure
```

### Utils (`src/utils/`)

Pure functions, one per file: `slugify`, `formatPrice`, `formatRelativeTime`, `calculateSetupProgress`.

---

## Reusable Components

```
src/components/
├── Modal.jsx          ← Portal to #modal-root + ModalContext({ onClose })
│                         useModal() hook for children to call onClose without props
├── Table.jsx          ← Generic table; accepts columns[], data[], label
│
├── Navbar.jsx         ← Public site nav
├── Footer.jsx         ← Public site footer
├── HorizontalLine.jsx
└── VerticalLine.jsx

src/components/admin/
├── Sidebar.jsx        ← Nav links + logout
├── AdminHeader.jsx    ← User email + profile chip
├── ProductModal.jsx   ← Modal wrapper + ProductForm (uses useModal, useRef)
└── CategoryModal.jsx  ← Modal wrapper + CategoryForm (uses useModal)
```

### Modal pattern

```
<Modal isOpen onClose title>          ← createPortal → #modal-root
  <ModalContext.Provider value={{ onClose }}>
    {children}                        ← inner form calls useModal() to get onClose
  </ModalContext.Provider>
</Modal>
```

### Table column definition shape

```js
{
  key: string,            // unique key
  header: string,         // column header label
  align: 'left'|'center', // default 'left'
  render: (row) => ReactNode  // optional; falls back to row[key]
}
```

---

## Context

| Context | File | Provides |
|---|---|---|
| `AuthContext` | `src/context/AuthContext.jsx` | `user`, `loading` |
| `ModalContext` | `src/components/Modal.jsx` | `onClose` |

---

## File Tree

```
src/
├── main.jsx                   entry: StrictMode + AuthProvider + fonts
├── App.jsx                    ToastContainer + router + route definitions
├── index.css
├── image.js
├── assets/
├── libs/
│   └── supabase.js            createClient (reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
├── context/
│   └── AuthContext.jsx        session state + useAuth()
├── routes/
│   └── ProtectedRoute.jsx     auth guard
├── layouts/
│   ├── UserLayout.jsx         Navbar + Outlet + Footer
│   └── AdminLayout.jsx        Sidebar + Header + Outlet
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx           + loaderProductsPublic
│   ├── ProductDetail.jsx      + loaderProductDetail
│   ├── AboutUs.jsx
│   ├── Contact.jsx            + actionContact
│   ├── AdminLogin.jsx
│   ├── Error.jsx
│   └── admin/
│       ├── AdminDashboardPage.jsx
│       ├── AdminProductPage.jsx
│       ├── AdminCategoriesPage.jsx
│       └── AdminSettingPage.jsx
├── components/
│   ├── Modal.jsx, Table.jsx, Navbar.jsx, Footer.jsx, HorizontalLine.jsx, VerticalLine.jsx
│   ├── Products/              public product listing (grid, card, filters, toolbar, skeleton, banners)
│   └── admin/
│       ├── Sidebar.jsx, AdminHeader.jsx, ProductModal.jsx, CategoryModal.jsx
│       ├── Dashboard/         stat cards, checklist, recent products, trend chart, skeleton
│       └── SettingForms/      company, contact, social forms
├── services/                  see Service Layer
└── utils/                     see Utils

docs/adr/                      architecture decision records
```

---

## Environment Variables

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

All `VITE_` variables are inlined into the browser bundle at **build time** — they are configuration, not secrets. On the hosting platform they must be set in its environment settings and the site rebuilt.
