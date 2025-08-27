# Clinician Workspace (Patient Workspace)

A **React + Vite + TypeScript** app that showcases a behavioral-health **Patient Workspace** UI.
It’s built to demonstrate **design system ownership (MUI)**, **component quality (Storybook + tests)**, and will expand to **Redux Toolkit + RTK Query** for realistic data flows.

<p align="center">
  <img alt="Tech" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white">
  <img alt="Build" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="MUI" src="https://img.shields.io/badge/MUI-6-007FFF?logo=mui&logoColor=white">
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white">
  <img alt="Storybook" src="https://img.shields.io/badge/Storybook-9-FF4785?logo=storybook&logoColor=white">
</p>

---

## ✨ What’s inside

* **Vite + React + TypeScript** project scaffold
* **MUI** design system (ready for theme extension)
* **Storybook 9** for interactive component docs
* **Vitest + React Testing Library** for unit tests
* Example UI: **`PatientCard`** component with story + test

---

## 🦯 Folder structure

```
src/
 ├─ components/
 │   ├─ PatientCard.tsx
 │   ├─ PatientCard.stories.tsx
 │   └─ PatientCard.test.tsx
 ├─ theme/            # (optional) MUI theme(s)
 │   └─ index.ts
 ├─ pages/            # (upcoming) route-level screens
 ├─ api/              # (upcoming) RTK Query slices
 ├─ app/              # (upcoming) Redux store + hooks
 ├─ setupTests.ts     # Vitest + RTL setup (jest-dom adapter)
 ├─ App.tsx
 └─ main.tsx
.storybook/           # Storybook configuration
public/               # Static assets (and mock JSON when needed)
```

---

## 🔧 Requirements

* **Node**: v18+ (LTS recommended)
* **Package manager**: npm (or pnpm/yarn if you prefer)

> On Apple Silicon (M1/M2), if you hit native build issues later:
>
> ```
> rm -rf node_modules package-lock.json && npm install
> ```

---

## 🚀 Getting started

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev
# http://localhost:5173

# 3) Run Storybook
npm run storybook
# http://localhost:6006

# 4) Run tests (watch mode)
npm test
```

---

## 🧪 Testing

We use **Vitest** with **React Testing Library** and **jest-dom** matchers.

* Global setup lives in `src/setupTests.ts` and uses:

  ```ts
  import '@testing-library/jest-dom/vitest'
  ```
* Example test: `src/components/PatientCard.test.tsx`

Run tests:

```bash
npm test
```

Optional UI runner:

```bash
npm run test:ui
```

---

## 📚 Storybook

Storybook documents components in isolation.

```bash
npm run storybook
```

Open **[http://localhost:6006](http://localhost:6006)**.
Example story: `src/components/PatientCard.stories.tsx`.

---

## 🎨 Theming (MUI)

Extend tokens in `src/theme/index.ts`:

```ts
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0B6E99' },
    secondary: { main: '#6E58E5' },
  },
  shape: { borderRadius: 12 },
})
```

Wrap the app in `main.tsx` with `<ThemeProvider theme={theme}><CssBaseline />...</ThemeProvider>`.

---

## 🔄 Roadmap (short-term)

* [ ] **Redux Toolkit** store (`src/app/store.ts`)
* [ ] **RTK Query** slice for patients (`src/api/patientApi.ts`)
* [ ] **Mock API** via static JSON:

  * `public/mock/patients.json`
  * Fetch with RTK Query (`/mock/patients.json`)
* [ ] **Dashboard page** that lists PatientCards
* [ ] **Routing**, code-splitting, and basic error boundaries
* [ ] **Sentry (mock)** wiring for error reporting
* [ ] **Cypress or Playwright** for E2E smoke

---

## 🛠 Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "test": "vitest",
  "test:ui": "vitest --ui",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

---

## 🧹 Linting & formatting (optional)

Install:

```bash
npm i -D eslint prettier eslint-config-prettier eslint-plugin-react-hooks
```

Example `.eslintrc`:

```json
{
  "extends": ["eslint:recommended", "plugin:react-hooks/recommended"],
  "parserOptions": { "ecmaVersion": "latest", "sourceType": "module" },
  "env": { "browser": true, "es2022": true }
}
```

Prettier config `.prettierrc` (optional):

```json
{ "singleQuote": true, "semi": false, "trailingComma": "es5" }
```

---

## 🔐 Env (when we add APIs)

Create a `.env` (not committed) for keys like:

```
VITE_API_BASE_URL=/    # using public/ mock in dev
```

---

## 🤖 CI (optional; add later)

Add `.github/workflows/ci.yml` to run tests and build on every push:

```yaml
name: CI
on:
  push:
  pull_request:
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npm run build
      - run: npm test
```
