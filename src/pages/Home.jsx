//components
import ProductList from "../components/ProductList";

//custom fetch
import { customFetch } from "../utils";

//loader
export const loader = async () => {
  const request = await customFetch();
  const products = request.data;
  return { products };
};

function Home() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <ProductList />
    </div>
  );
}

export default Home;
