// useLoaderData
import { useLoaderData } from "react-router-dom";

// product
import Product from "./Product";

function ProductList() {
  const {
    products: { products },
  } = useLoaderData();

  return (
    <div className="grid grid-cols-3 gap-4 mt-3">
      {products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductList;
