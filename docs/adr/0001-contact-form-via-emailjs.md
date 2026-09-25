# 0001. Contact form sends email via EmailJS

- Status: Accepted
- Date: 2026-09-25

## Context

The public Contact page (`/contact`) has a form (name, email, message) that currently does nothing. Visitors' messages need to reach the shop's inbox (charoen239@gmail.com).

Constraints:

- The app is a client-only React SPA. There is no backend server of our own; Supabase is the only backend.
- A browser cannot send email directly, and SMTP credentials (e.g. a Gmail password) must never be shipped to the browser.
- The Gmail account belongs to the shop owner, not the developer. Development and testing must work without the owner's account.
- V1 scope: get messages delivered reliably with minimal infrastructure.

## Decision

- Use **EmailJS** (`@emailjs/browser`) to send the email from the browser. EmailJS holds the Gmail connection; the browser only sends a service ID, template ID, public key and the form fields.
- **Service layer:** `src/services/emailService.js` exports `sendContactMessage({ name, email, message })`. It takes a plain object (not `FormData`), calls EmailJS, and lets failures throw. The function name describes the business action, not the vendor, so the provider can be replaced without touching callers.
- **Submission:** the `contact` route gets an `actionContact` action, and the form uses `useFetcher()` (`<fetcher.Form>`). A fetcher submission is not a navigation, so its pending state stays local to the form.
- **Error handling:** `actionContact` reads `FormData`, calls the service inside `try/catch`, and **returns** `{ success: true }` or `{ success: false }`. It never lets the error escape, because an uncaught action error would replace the whole page with the root `errorElement` and the visitor would lose their message. The raw error is logged with `console.error`; the visitor only sees a fixed, friendly message.
- **Feedback:** `actionContact` calls `toast.success` / `toast.error` itself, matching the admin actions (e.g. `actionSettings`). The component's only reaction is resetting the form via a ref in a `useEffect` (deps: `fetcher.state`, `fetcher.data`) when `fetcher.state === 'idle' && fetcher.data?.success`.
- **Toasts:** a single `ToastContainer` sits at the app root (above `RouterProvider`) so it serves both public and admin routes.
- **Config:** `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` in `.env`.

## Alternatives considered

- **Supabase Edge Function + an email API (e.g. Resend).** Keeps the sending key fully server-side and removes the third-party-in-the-browser dependency. Rejected for V1: more setup (function deployment, secrets, CORS) than the feature needs today. Good V2 candidate.
- **Save messages to a Supabase table (admin inbox).** Gives history and an admin view. Rejected for V1: the owner would not be notified without also sending an email, so it doesn't replace email. Could complement it later.
- **`mailto:` link.** No setup, but depends on the visitor having a configured mail client and doesn't use the designed form.
- **`onSubmit` + `useState` instead of a route action.** Simpler and self-contained, but inconsistent with the action pattern used on the admin pages, and pending state must be managed by hand.
- **`<Form>` instead of `useFetcher`.** Works, but the submission counts as a navigation and shows up in the global `useNavigation()` state.

## Consequences

- **The EmailJS public key is visible to anyone.** Every `VITE_` variable is inlined into the browser bundle; `.env` is for configuration, not secrecy. Protection relies on EmailJS settings instead:
  - the template's **To Email is hardcoded** to the shop address (never taken from form input), so the key cannot be used to email anyone else;
  - **allowed origins** restricted to the production domain;
  - EmailJS **rate limits**.
- IDs live in `.env`, so development can use a personal EmailJS account and production the owner's, with no code change.
- Form input `name` attributes must match the EmailJS template's `{{placeholders}}`.
- EmailJS rejects with `{ status, text }`, not an `Error`. The action must not rely on `error.message`; show a friendly message to the visitor and log the details.
- The `ToastContainer` that lived inside the `/admin` route moves to the app root. There must be exactly one, otherwise every toast renders twice.
- **The visitor's address can never be the From address.** EmailJS sends through the connected Gmail account, and Gmail rewrites From to that account (anti-spoofing: SPF/DKIM/DMARC). The template's From Email uses the default address; the visitor is identified via Reply-To (`{{email}}`), the subject (`{{title}}` + `{{name}}`) and the body.
- **Production sender (V1): the owner's own Gmail (charoen239@gmail.com)** is connected as the EmailJS service, sending to itself. Contact emails therefore appear as "me" in the owner's inbox. Chosen to avoid creating and owning an extra account. V2 option: a dedicated sender account (e.g. "Hearing Gadget Website") for recognizable, filterable mail and to keep the owner's personal Gmail out of EmailJS.
- Delivery depends on EmailJS availability and its free-tier monthly limit.
