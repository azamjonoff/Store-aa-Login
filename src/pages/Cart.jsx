// global context
import { useGlobalContext } from "../hooks/useGlobalContext";

// component
import TableItem from "../components/TableItem";

function Cart() {
  const { products, totalProducts } = useGlobalContext();

  return (
    <div className="max-w-6xl mx-auto p-4 mt-5">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Price</th>
              <th>Change amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((prod) => {
              return <TableItem key={prod.id} prod={prod} />;
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Price</th>
              <th>Change amount</th>
              <th>Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Cart;
