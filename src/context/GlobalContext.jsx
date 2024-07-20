// react
import { produce } from "immer";
import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

const stateFromLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("my-store")) || {
      user: null,
      isAuthReady: false,
      products: [],
      totalProducts: 0,
      totalPrice: 0,
    }
  );
};

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOG_IN":
      return { ...state, user: payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "IS_AUTH_READY":
      return { ...state, isAuthReady: true };
    case "ADD_PRODUCT":
      return { ...state, products: payload };
    case "TOTAL_PRODUCT_COUNT":
      return { ...state, totalProducts: payload };
    default:
      return state;
  }
};

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, stateFromLocalStorage());

  // add to cart
  const addToCart = (product) => {
    if (!state.products.length) {
      dispatch({ type: "ADD_PRODUCT", payload: [product] });
    } else {
      state.products.map((prod) => {
        if (prod.id == product.id) {
          const findProduct = state.products.find(
            (produ) => produ.id == product.id
          );
          const updatedAmount =
            (findProduct.amount =
            findProduct.amount +=
              product.amount);

          const updatedAmounts = state.products.map((prod) => {
            if (prod.id == updatedAmount.id) {
              return { ...prod, amount: updatedAmount };
            } else {
              return prod;
            }
          });
          dispatch({
            type: "ADD_PRODUCT",
            payload: updatedAmounts,
          });
        } else {
          dispatch({
            type: "ADD_PRODUCT",
            payload: [...state.products, product],
          });
        }
      });
    }
  };

  // increment
  const incrementAmount = (id) => {
    function toggleTodo(state, id) {
      return produce(state, (draft) => {
        const product = draft.products.find((prod) => prod.id === id);
        product.amount = product.amount + 1;
      });
    }

    const { products } = toggleTodo(state, id);
    dispatch({ type: "ADD_PRODUCT", payload: products });
  };

  // decrement
  const decrementAmount = (id) => {
    function toggleTodo(state, id) {
      return produce(state, (draft) => {
        const product = draft.products.find((prod) => prod.id === id);
        product.amount = product.amount - 1;
      });
    }

    const { products } = toggleTodo(state, id);
    dispatch({ type: "ADD_PRODUCT", payload: products });
  };

  useEffect(() => {
    let totalCount = 0;

    state.products.forEach((produc) => {
      totalCount = totalCount + produc.amount;
    });

    dispatch({ type: "TOTAL_PRODUCT_COUNT", payload: totalCount });
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem("my-store", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
        addToCart,
        incrementAmount,
        decrementAmount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
