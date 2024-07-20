//custom fetch
import { customFetch } from "../utils";

// useLoaderData
import { useLoaderData } from "react-router-dom";

// useState
import { useState } from "react";

// useGlobalContext
import { useGlobalContext } from "../hooks/useGlobalContext";

//loader
export const loader = async ({ params }) => {
  const request = await customFetch(`${params.id}`);
  const product = request.data;
  return { product };
};

function SingleProduct() {
  const { addToCart } = useGlobalContext();
  const { product } = useLoaderData();

  const [amount, setAmount] = useState(0);

  const handleAddToCart = () => {
    const newProduct = {
      ...product,
      amount,
    };

    // console.log(newProduct);

    addToCart(newProduct);
  };

  return (
    <div className="grid place-items-center">
      <div className="mt-5 w-96 bg-base-300 rounded-md p-4">
        <div className="flex justify-center">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <h1 className="text-2xl font-bold my-3">Title: {product.title}</h1>
        <p>{product.description}</p>
        <div className="flex justify-between my-3">
          <h3>Price: {product.price}$</h3>
          <h4>Rating: {product.rating}</h4>
        </div>
        <div className="flex items-center gap-3 justify-between ">
          <button
            onClick={() => setAmount((prev) => (prev += 1))}
            className="btn btn-accent"
          >
            +
          </button>
          <p>{amount}</p>
          <button
            disabled={amount == 0 && true}
            onClick={() => setAmount((prev) => (prev -= 1))}
            className="btn btn-accent"
          >
            -
          </button>
          <div>
            <button onClick={handleAddToCart} className="btn btn-info">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
