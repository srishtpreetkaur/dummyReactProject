import { useCallback, useEffect, useState } from "react";

const URL = "https://dummyjson.com/products?limit=100";

export default function useProducts() {
  const [state, setState] = useState({ data: [], loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));

    fetch(URL, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`The API responded with status ${res.status}.`);
        return res.json();
      })
      .then((json) => {
        const data = json.products.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          brand: p.brand || "Unbranded",
          category: p.category,
          stock: p.stock,
          price: p.price,
          rating: p.rating,
          thumbnail: p.thumbnail,
          tags: p.tags ?? [],
        }));
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: [], loading: false, error: err.message || "Network error." });
      });

    return () => ctrl.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}