const number = new Intl.NumberFormat();
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function CountryTable({ items }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Image</th><th>Product</th><th>Brand</th><th>Category</th>
            <th className="num">Rating</th><th className="num">Price</th><th className="num">Stock</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.id}>
              <td><img src={product.thumbnail} alt={product.title} loading="lazy" /></td>
              <td>{product.title}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td className="num">{product.rating.toFixed(1)}</td>
              <td className="num">{currency.format(product.price)}</td>
              <td className="num">{number.format(product.stock)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
