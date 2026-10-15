# Admin Panel

A modern admin dashboard built with React, Vite, and Tailwind CSS. It provides a product management interface with a responsive layout, sidebar navigation, theme switching (light/dark mode), and product detail views.

## Tech Stack

- **React 19** – UI library
- **Vite 8** – Build tool and dev server
- **Tailwind CSS 4** – Utility-first styling (via `@tailwindcss/vite`)
- **React Router 7** – Client-side routing
- **Lucide React** – Icons
- **Inter** – Font (via `@fontsource-variable/inter`)
- **ESLint** – Linting

## Features

- Responsive admin layout with collapsible sidebar and topbar
- Light / dark theme toggle (persisted via `ThemeContext`)
- Dashboard home page with product statistics
- Product listing with search and filtering
- Add-product form
- Product details page with related products
- Static demo product data (no backend required)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- npm (bundled with Node.js)

### Installation

```bash
git clone https://github.com/ali-rezai120/admin-panel.git
cd admin-panel
npm install
```

### Development

Start the dev server with hot-module replacement:

```bash
npm run dev
```

The app will be available at the URL printed in the terminal (default: `http://localhost:5173`).

### Production Build

Create an optimized production build in the `dist/` folder:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint across the project:

```bash
npm run lint
```

## Project Structure

```
admin-panel/
├── public/
│   ├── images/products/   # Product images
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── layout/        # Layout, Sidebar, Topbar
│   │   ├── module/        # Products, AddProduct, ProductStore, RelatedProducts
│   │   ├── pages/         # Page routing
│   │   └── template/      # HomePage, ProductDetails
│   ├── context/           # ThemeContext, ProductsContext
│   ├── data/              # productData.js (static demo data)
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Environment Variables

No environment variables are required to run this project. If you add any later, create a `.env` file (it is git-ignored) and expose client-safe values with the `VITE_` prefix.

## License

This project is private unless otherwise specified.
