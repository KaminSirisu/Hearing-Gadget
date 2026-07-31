# HearingGadget — System Architecture

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Backend / DB | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| File Storage | Supabase Storage |

---

## Entry Point

```
main.jsx
└── <AuthProvider>          ← wraps entire app, holds user session
    └── <App />
        └── <Router>
```

`AuthProvider` calls `supabase.auth.getUser()` on mount and subscribes to `onAuthStateChange` — all routes can read `user` and `loading` via `useAuth()`.

---

## Routes

```
/                   → Home.jsx           (public)
/product            → Product.jsx        (public)
/about              → AboutUs.jsx        (public)
/contact            → Contact.jsx        (public)
/admin/login        → AdminLogin.jsx     (public)

/admin              → ProtectedRoute
                      └── AdminLayout    (Sidebar + AdminHeader + <Outlet>)
    /admin          (index) → Dashboard.jsx
    /admin/products         → Products.jsx
    /admin/categories       → Categories.jsx
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

---

## Admin Layout

```
AdminLayout
├── <Sidebar />          ← nav links, logout button
├── <AdminHeader />      ← user email display
└── <main>
    └── <Outlet />       ← page content rendered here
```

---

## Page Data Flow

### Products (`/admin/products`)

```
Products.jsx
│
├── State
│   ├── products[]         ← loaded from Supabase
│   ├── categories[]       ← loaded from Supabase (for filter dropdown + modal select)
│   ├── openModal (bool)
│   └── selectedProduct    ← null = create, object = edit
│
├── On mount
│   ├── loadProducts()  → productService.getProducts()
│   └── loadCategories() → categoryService.getCategories()
│
├── <Table columns={...} data={products} />
│   └── columns define: image, name, brand, category, price, actions
│       └── Edit btn → setSelectedProduct(row) + setOpenModal(true)
│       └── Delete btn → handleDelete(id) → productService.deleteProduct(id)
│
└── <ProductModal isOpen onClose product categories onSave />
    └── onSave = handleCreateProduct()
        ├── storageService.uploadProductImage(file)  → returns fileName
        ├── productService.createProduct(fields)      → returns { id }
        └── productImageService.createProductImage({ product_id, image_path })
```

### Categories (`/admin/categories`)

```
Categories.jsx
│
├── State
│   ├── categories[]        ← loaded from Supabase
│   ├── openModal (bool)
│   └── selectedCategory    ← null = create, object = edit
│
├── Refs (useRef — no re-render on keystroke)
│   ├── quickNameRef        ← input for Quick Add name
│   └── quickDescRef        ← textarea for Quick Add description
│
├── On mount
│   └── loadCategories() → categoryService.getCategories()
│
├── <Table columns={...} data={categories} />
│   └── columns define: name (with icon), description, product count, actions
│       └── Edit btn → setSelectedCategory(row) + setOpenModal(true)
│
├── Quick Add panel (right sidebar)
│   └── handleQuickAdd(e) → reads quickNameRef.current.value
│                         → categoryService.createCategories({ name, description })
│                         → clears refs + reloads
│
└── <CategoryModal isOpen onClose category onSave />
    └── onSave = handleSaveCategory() → categoryService.createCategories(data)
```

---

## Supabase Database Tables

### `products`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| name | text | |
| category_id | uuid FK | → categories.id |
| price | numeric | |
| description | text | |
| brand | text | |
| stock | integer | |
| is_active | boolean | |

### `categories`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| name | text | |
| description | text | |

### `product_images`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| product_id | uuid FK | → products.id |
| image_path | text | filename in Storage bucket |
| display_order | integer | |

---

## Supabase Storage

**Bucket:** `product-images`

| Operation | Function | Notes |
|---|---|---|
| Upload | `uploadProductImage(file)` | filename = `{Date.now()}-{file.name}` |
| Read URL | `getImageUrl(path)` | returns public URL |

---

## Service Layer

All Supabase calls are isolated in `src/services/`. Pages never call `supabase` directly.

```
src/services/
├── productService.js
│   ├── getProducts()          SELECT * with JOIN categories + product_images
│   ├── createProduct(data)    INSERT → returns created row
│   ├── updateProduct(id,data) UPDATE WHERE id
│   └── deleteProduct(id)      DELETE WHERE id
│
├── categoryService.js
│   ├── getCategories()        SELECT *
│   └── createCategories(data) INSERT
│
├── storageService.js
│   ├── uploadProductImage(file) → Storage PUT → returns fileName
│   └── getImageUrl(path)        → returns public URL string
│
└── productImageService.js
    └── createProductImage(data) INSERT product_images → returns created row
```

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
├── main.jsx                   entry, mounts AuthProvider
├── App.jsx                    router + route definitions
├── index.css
├── libs/
│   └── supabase.js            createClient (reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
├── context/
│   └── AuthContext.jsx        session state + useAuth()
├── routes/
│   └── ProtectedRoute.jsx     auth guard
├── layouts/
│   └── AdminLayout.jsx        Sidebar + Header + Outlet
├── pages/
│   ├── Home.jsx
│   ├── Product.jsx
│   ├── AboutUs.jsx
│   ├── Contact.jsx
│   ├── AdminLogin.jsx
│   └── admin/
│       ├── Dashboard.jsx
│       ├── Products.jsx
│       └── Categories.jsx
├── components/
│   ├── Modal.jsx              portal + ModalContext
│   ├── Table.jsx              reusable data table
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── admin/
│       ├── Sidebar.jsx
│       ├── AdminHeader.jsx
│       ├── ProductModal.jsx
│       └── CategoryModal.jsx
└── services/
    ├── productService.js
    ├── categoryService.js
    ├── storageService.js
    └── productImageService.js
```

---

## Environment Variables

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```
