//icons
import { FaTrashAlt } from "react-icons/fa";

// hooks
import { useGlobalContext } from "../hooks/useGlobalContext";

function TableItem({ prod }) {
  const { incrementAmount, decrementAmount } = useGlobalContext();

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={prod.thumbnail} alt={prod.title} />
            </div>
          </div>
          <div>
            <div className="font-bold">{prod.title}</div>
            <div className="text-sm opacity-50">{prod.brand}</div>
          </div>
        </div>
      </td>
      <td>
        ${" "}
        {(prod.price - (prod.price * prod.discountPercentage) / 100).toFixed()}
        <br />
        <span className="badge badge-accent badge-sm line-through">
          $ {prod.price}
        </span>
      </td>
      <td className="flex items-center gap-2">
        <button
          onClick={() => incrementAmount(prod.id)}
          className="btn btn-accent btn-sm"
        >
          +
        </button>
        <p>{prod.amount}</p>
        <button
          onClick={() => decrementAmount(prod.id)}
          className="btn btn-accent btn-sm"
        >
          -
        </button>
      </td>
      <th>
        <button className="btn btn-warning btn-xs">
          <FaTrashAlt className="text-lg" />
        </button>
      </th>
    </tr>
  );
}

export default TableItem;
