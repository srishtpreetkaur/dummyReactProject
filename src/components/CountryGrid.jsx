const number = new Intl.NumberFormat();
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function CountryGrid({ items }) {
  return (
    <ul className="grid">
      {items.map((product) => (
        <li key={product.id} className="card">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
          <div className="body">
            <h3>{product.title}</h3>
            <p className="muted">{product.brand} · {product.category}</p>
            <p className="description">{product.description}</p>
            <dl>
              <div><dt>Price</dt><dd>{currency.format(product.price)}</dd></div>
              <div><dt>Rating</dt><dd>{product.rating.toFixed(1)} / 5</dd></div>
              <div><dt>In stock</dt><dd>{number.format(product.stock)}</dd></div>
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}
