# Elite Project

A modern, fast React + TypeScript single-page application built with **Vite**, featuring routing, animations, carousels, and icon libraries.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Bundler | Vite 5 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Animations | AOS (Animate On Scroll) |
| Carousel | React Slick + Slick Carousel |
| Icons | React Icons, Font Awesome Free |
| SEO | React Helmet Async |
| Linting | ESLint 9 + TypeScript ESLint |

---

## 📦 Dependencies

### Runtime

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | Core UI library |
| `react-dom` | ^18.3.1 | DOM rendering |
| `react-router-dom` | ^6.27.0 | Client-side routing |
| `axios` | ^1.7.7 | HTTP requests / API calls |
| `aos` | ^2.3.4 | Scroll-triggered animations |
| `react-slick` | ^0.30.2 | Carousel / slider component |
| `slick-carousel` | ^1.8.1 | CSS + fonts for React Slick |
| `react-icons` | ^5.3.0 | Icon library (FA, MD, etc.) |
| `@fortawesome/fontawesome-free` | ^6.6.0 | Font Awesome icons (CSS) |
| `react-helmet-async` | ^2.0.5 | Dynamic `<head>` / SEO tags |

### Dev

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^5.4.8 | Dev server & bundler |
| `@vitejs/plugin-react` | ^4.3.2 | React Fast Refresh in Vite |
| `typescript` | ^5.5.3 | Static typing |
| `eslint` | ^9.11.1 | Code linting |
| `typescript-eslint` | ^8.7.0 | TypeScript ESLint rules |
| `eslint-plugin-react-hooks` | ^5.1.0-rc.0 | Enforce React hooks rules |
| `eslint-plugin-react-refresh` | ^0.4.12 | Fast Refresh lint rules |

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (or `yarn` / `pnpm`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/elite_project.git

# 2. Navigate into the project
cd elite_project

# 3. Install dependencies
npm install
```

### Available Scripts

```bash
# Start development server (hot reload)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Run ESLint across the project
npm run lint
```

---

## 🏗️ Build & Output

The project uses **Vite** with the React plugin for:

- ⚡ Instant dev server startup (ESM-based)
- 🔥 Hot Module Replacement (HMR)
- 📦 Optimized production bundle via Rollup

TypeScript is compiled (`tsc -b`) before the Vite production build to ensure type safety at build time.

---

## 🗂️ Project Structure

```
elite_project/
├── public/
├── src/
│   ├── assets/
│   ├── component/            # Public-facing pages & UI
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Work.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Contact.tsx
│   │   └── JoinTeam.tsx
│   ├── Dashboard/            # Admin/dashboard pages
│   │   ├── Dashboard.tsx
│   │   ├── HomeDashboard.tsx
│   │   ├── AboutDashboard.tsx
│   │   ├── WorkDashboard.tsx
│   │   └── ContactDashboard.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── App.css
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── package.json
```

---

## 🗺️ Routes

All routing is handled in `App.tsx` using `BrowserRouter` and React Router DOM v6.

### Public Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Landing / home page |
| `/about` | `About` | About page |
| `/work` | `Work` | Work / portfolio page |
| `/contact` | `Contact` | Contact page |
| `/join` | `JoinTeam` | Join the team / careers page |
| `/login` | `Login` | User login page |
| `/register` | `Register` | User registration page |

### Dashboard Routes

| Path | Component | Description |
|---|---|---|
| `/dashboard` | `Dashboard` | Main dashboard entry point |
| `/HomeDashboard` | `HomeDashboard` | Dashboard — home section |
| `/AboutDashboard` | `AboutDashboard` | Dashboard — about section |
| `/WorkDashboard` | `WorkDashboard` | Dashboard — work section |
| `/ContactDashboard` | `ContactDashboard` | Dashboard — contact section |

---

## 🎨 UI Libraries Setup

### AOS — Animate On Scroll

Initialize once in your root component:

```tsx
import AOS from 'aos';
import 'aos/dist/aos.css';

useEffect(() => {
  AOS.init({ duration: 800, once: true });
}, []);
```

### React Slick — Carousel

```tsx
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
```

### Font Awesome

```tsx
// In main.tsx or App.tsx
import '@fortawesome/fontawesome-free/css/all.min.css';
```

### React Helmet Async — SEO

```tsx
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Wrap your app
<HelmetProvider>
  <App />
</HelmetProvider>

// Inside any page component
<Helmet>
  <title>Page Title</title>
  <meta name="description" content="Page description" />
</Helmet>
```

---

## 🔐 Suggested: Protecting Dashboard Routes

Dashboard routes are not protected by default. Add an auth guard to restrict access to authenticated users only:

```tsx
// PrivateRoute.tsx
const PrivateRoute = ({ children }) => {
  const isAuthenticated = // check token or auth state
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// In App.tsx
<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
```

---

## 📝 Notes

- The project is **private** (`"private": true`) and not intended for npm publishing.
- Module type is set to `"module"` — all config files use ESM syntax.
- The `<Header />` component is currently **commented out** in `App.tsx`. Uncomment it when ready to add global navigation.
- Dashboard route paths use PascalCase (e.g. `/HomeDashboard`) — consider switching to lowercase kebab-case (e.g. `/dashboard/home`) for REST-style consistency.
- TypeScript strict mode is recommended for best type safety.

---

## 📄 License

Private — All rights reserved.
