# Apple Store

React storefront demo with Firebase auth, Firestore orders, and Stripe checkout.

### Credit card info for test purposes "Don't use real card data!!!":

card number: 4242 4242 4242 4242 <br />
MM/YY: 24/24<br />
CVC: 42424

---

## Prerequisites

- **Node.js 22.17.0** (recommended). The repo includes a `.nvmrc` file; from the project root run:

```bash
nvm use
```

---

## Available scripts

In the project directory:

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm start`       | Start the Vite dev server (default: port 3000). |
| `npm run dev`     | Same as `npm start`.                            |
| `npm run build`   | Production build output to the `dist/` folder. |
| `npm run preview` | Serve the production build locally for testing. |

Open [http://localhost:3000](http://localhost:3000) while the dev server is running.

---

## Source layout and import alias

The **`@/`** alias points at **`src/`** (see `vite.config.js` and `jsconfig.json` for IDE path hints). Prefer it for cross-folder imports, for example:

- `import { useStateValue } from '@/hooks/useStateValue'`
- `import { auth } from '@/lib/firebase'`
- `import { formatCurrency } from '@/utils/formatCurrency'`

Within a single feature folder you can still use relative imports (e.g. `./Subtotal` inside `features/cart`).

| Path | Role |
|------|------|
| `src/app/` | App shell: `App.jsx`, global app styles |
| `src/app/providers/` | Context providers (e.g. cart/user state) |
| `src/components/` | Reusable UI used across features |
| `src/features/` | Domain slices: `auth`, `cart`, `catalog`, `home`, `orders`, `payment` |
| `src/hooks/` | Shared hooks |
| `src/lib/` | External services (Firebase, HTTP API client) |
| `src/store/` | Client store: context definition + reducer |
| `src/utils/` | Pure utilities |
| `src/assets/` | Images and static assets |
| `src/styles/` | Global styles |
| `src/index.jsx` | Vite entry |

---

## Migration to React 19 and Vite (summary)

The app was migrated from **Create React App** (React 16 / `react-scripts`) to **Vite 6** and **React 19**, following current common practice (CRA is no longer maintained).

### Stack updates

- **React 19** and **react-dom 19** with **`createRoot`** in `src/index.jsx` (service worker removed from the entry flow).
- **Vite 6** as the bundler and dev server instead of `react-scripts`.
- **`"type": "module"`** in `package.json` for native ESM.
- **React Router 6**: `Switch` → `Routes`, `Route` uses the `element` prop, **`useNavigate`** replaces **`useHistory`**.
- **Firebase 11** using the **compat** API (`firebase/compat/app`, `firebase/compat/auth`, `firebase/compat/firestore`) so existing `auth` / `db.collection` style code continues to work.
- **Stripe**: updated **`@stripe/react-stripe-js`** and **`@stripe/stripe-js`** for current APIs.
- **axios** updated to the 1.x line.

### Dependencies removed or replaced

- **@material-ui/icons** → **`react-icons`** (only icon components were used).
- **moment** → **`Intl` / `Date`** for order timestamps in `Order.jsx`.
- **react-currency-format** → **`src/formatCurrency.js`** using **`Intl.NumberFormat`**.
- Removed unused **react-flip-move** and old CRA-related testing packages from `package.json`.

### Behavior and bug fixes bundled with the migration

- **Login route** is consistently **`/login`** (the router previously used `/Login` while links used `/login`).
- **Header** sign-in link no longer produced an invalid `to={false}` when a user was logged in; sign-out uses **`preventDefault`** on the same link.
- **Payment**: `clientSecret` is no longer initialized to a boolean; checkout uses **`async/await`** with **`confirmCardPayment`**, handles Stripe errors, and **`navigate('/orders', { replace: true })`** instead of `history.replace('./orders')`.
- **App**: **`onAuthStateChanged`** is unsubscribed on unmount.
- **Orders**: Firestore **`onSnapshot`** listener is unsubscribed when the user changes or the component unmounts.

### File layout notes

- Root **`index.html`** and **`vite.config.js`** drive the Vite setup.
- Source files that contain JSX use the **`.jsx`** extension so Vite’s HTML pipeline parses them correctly.
- **`.nvmrc`** pins Node **22.17.0** for `nvm use`.
- **`.gitignore`** includes **`/dist`** for Vite production output.

### Build note

`npm run build` may warn about a large JS chunk; much of that comes from Firebase. Optional later improvement: **Rollup `manualChunks`** to split vendor code.

---

## Learn more

- [Vite documentation](https://vite.dev/)
- [React documentation](https://react.dev/)
