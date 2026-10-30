import { useEffect, useMemo, useState } from "react";
import useProducts from "./hooks/useCountries.js";
import Controls from "./components/Controls.jsx";
import Stats from "./components/Stats.jsx";
import CountryGrid from "./components/CountryGrid.jsx";
import CountryTable from "./components/CountryTable.jsx";
import { Loading, ErrorState, EmptyState } from "./components/States.jsx";

const PAGE = 24;

export default function App() {
  const { data, loading, error, retry } = useProducts();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("title");
  const [dir, setDir] = useState("asc");
  const [view, setView] = useState("cards");
  const [visible, setVisible] = useState(PAGE);

  const categories = useMemo(() => [...new Set(data.map((product) => product.category))].sort(), [data]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = data.filter((product) => {
      if (category !== "All" && product.category !== category) return false;
      if (!term) return true;
      return (
        product.title.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    });
    const sign = dir === "asc" ? 1 : -1;
    return list.sort((a, b) =>
      sort === "title" ? sign * a.title.localeCompare(b.title) : sign * (a[sort] - b[sort])
    );
  }, [data, q, category, sort, dir]);

  useEffect(() => setVisible(PAGE), [q, category, sort, dir, view]);

  const reset = () => { setQ(""); setCategory("All"); };
  const shown = results.slice(0, visible);

  return (
    <>
      <header className="top">
        <h1>Product catalog</h1>
        <p className="muted">Explore products by category, price, rating, and availability.</p>
      </header>

      <main>
        <Controls {...{ q, setQ, category, setCategory, categories, sort, setSort, dir, setDir, view, setView }} />

        {loading && <Loading />}
        {error && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && (
          <>
            <Stats items={results} />
            {results.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              <>
                {view === "cards" ? <CountryGrid items={shown} /> : <CountryTable items={shown} />}
                {visible < results.length && (
                  <div className="more">
                    <button className="btn primary" onClick={() => setVisible((v) => v + PAGE)}>
                      Show more ({results.length - visible} left)
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      <footer className="foot">
        Product data from{" "}
        <a href="https://dummyjson.com/docs/products" target="_blank" rel="noreferrer">DummyJSON</a>.
      </footer>
    </>
  );
}
