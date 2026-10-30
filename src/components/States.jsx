export function Loading() {
  return (
    <div role="status" aria-live="polite">
      <p className="muted">Loading products…</p>
      <ul className="grid">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="card skeleton" aria-hidden="true" />
        ))}
      </ul>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state" role="alert">
      <h2>Couldn’t load the data</h2>
      <p className="muted">{message} Check your connection and try again.</p>
      <button className="btn primary" onClick={onRetry}>Try again</button>
    </div>
  );
}

export function EmptyState({ onReset }) {
  return (
    <div className="state">
      <h2>No products match</h2>
      <p className="muted">Try a different spelling or clear the filters.</p>
      <button className="btn primary" onClick={onReset}>Clear filters</button>
    </div>
  );
}
