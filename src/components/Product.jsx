// rrd
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <figure>
        <img src={product.thumbnail} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="line">{product.description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
        <div>
          <Link to={`/singleProduct/${product.id}`} className="btn btn-accent">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
