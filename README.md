# Product Catalog – React API Dashboard

Responsive dashboard built with **React 18 + Vite**. It fetches products from the free
[DummyJSON Products API](https://dummyjson.com/docs/products) and lets you search, filter by
category, sort by name, price, rating, or stock, and switch between cards and a table.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build      # outputs /dist
npm run preview
```

## Structure
```
src/
  hooks/useCountries.js     fetch + loading/error/retry state
  components/Controls.jsx   search, category filter, sort, view toggle
  components/Stats.jsx      summary of the current results
  components/CountryGrid.jsx / CountryTable.jsx   responsive product views
  components/States.jsx     loading skeleton, error, empty state
  App.jsx                   filter/sort logic (useMemo) + layout
```

## Deploy (pick one)
- **Vercel / Netlify:** push to GitHub, import the repo. Build command `npm run build`, output `dist`.
- **GitHub Pages:** `npm run build`, then publish the `dist` folder (e.g. with the `gh-pages` package or a GitHub Action). `base` is already `./`.

## Attribution
Product data and images: [DummyJSON](https://dummyjson.com/).
