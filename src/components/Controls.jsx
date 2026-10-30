export default function Controls({ q, setQ, category, setCategory, categories, sort, setSort, dir, setDir, view, setView }) {
  return (
    <section className="controls" aria-label="Search, filter and sort">
      <label className="field grow">
        <span>Search</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Product, brand, category or tag"
        />
      </label>

      <label className="field">
        <span>Category</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All categories</option>
          {categories.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Sort by</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="title">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="stock">Stock</option>
        </select>
      </label>

      <button className="btn" onClick={() => setDir(dir === "asc" ? "desc" : "asc")} aria-label="Toggle sort direction">
        {dir === "asc" ? "Ascending ↑" : "Descending ↓"}
      </button>

      <div className="seg" role="group" aria-label="Layout">
        <button className={view === "cards" ? "on" : ""} onClick={() => setView("cards")}>Cards</button>
        <button className={view === "table" ? "on" : ""} onClick={() => setView("table")}>Table</button>
      </div>
    </section>
  );
}
