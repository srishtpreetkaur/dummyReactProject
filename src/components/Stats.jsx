const number = new Intl.NumberFormat();
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function Stats({ items }) {
  const stock = items.reduce((total, product) => total + product.stock, 0);
  const averagePrice = items.length ? items.reduce((total, product) => total + product.price, 0) / items.length : 0;
  const topRated = items.reduce((best, product) => (product.rating > (best?.rating ?? -1) ? product : best), null);

  return (
    <section className="stats" aria-label="Summary of current results">
      <div><b>{number.format(items.length)}</b><span>products shown</span></div>
      <div><b>{number.format(stock)}</b><span>units in stock</span></div>
      <div><b>{currency.format(averagePrice)}</b><span>average price</span></div>
      <div><b>{topRated?.title ?? "—"}</b><span>highest rated</span></div>
    </section>
  );
}
