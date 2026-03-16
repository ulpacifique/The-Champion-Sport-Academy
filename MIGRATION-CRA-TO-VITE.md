# Migration from Create React App to Vite

This project has been migrated from Create React App (CRA) to Vite.

## What was done

- **Vite** and **@vitejs/plugin-react** added; **react-scripts** removed.
- **index.html** moved to project root; entry script is `<script type="module" src="/src/index.tsx"></script>`.
- **vite.config.ts** added (build output is `build/` so your existing `deploy` script still works).
- **tsconfig.json** updated for Vite (e.g. `moduleResolution: "bundler"`); **tsconfig.node.json** added for the config file.
- **src/vite-env.d.ts** added for `import.meta.env` typings.
- **postcss.config.js** added for Tailwind; **autoprefixer** and **postcss** added as devDependencies.
- All **process.env** usage replaced with **import.meta.env**:
  - `process.env.PUBLIC_URL` → `import.meta.env.BASE_URL` (for assets in `public/`).
  - `process.env.REACT_APP_API_URL` → `import.meta.env.VITE_API_URL`.

## What you need to do

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```
   Or install Vite and the React plugin explicitly:
   ```bash
   npm install -D vite @vitejs/plugin-react autoprefixer postcss
   ```

2. **Environment variables**  
   If you used `.env` with `REACT_APP_*` variables, switch to **Vite’s** env prefix:
   - Rename **REACT_APP_API_URL** to **VITE_API_URL** in your `.env` (and in any deployment config).
   - Only variables starting with `VITE_` are exposed to the client in Vite.

3. **Scripts**
   - **Development:** `npm run dev` or `npm start` (both run Vite dev server, default port 3000).
   - **Build:** `npm run build` (output in `build/`).
   - **Preview production build:** `npm run preview`.
   - **Deploy:** `npm run deploy` (unchanged; still uses `build/`).

4. **Optional:** Remove the old CRA `public/index.html` to avoid confusion; the app now uses the root `index.html`.

## Notes

- Static assets in `public/` are served at the root (e.g. `public/athletes/foo.jpg` → `/athletes/foo.jpg`). `import.meta.env.BASE_URL` is `'/'`.
- The `test` script was removed (CRA’s Jest). To run tests with Vite, you can add Vitest later.
