import { createContext, useEffect, useReducer, useState } from "react";
import "../styles/styles.scss";
import axios from "axios";
import reducer from "storeData/reducer";
import initialState from "storeData/initialState";
import AppContext from "storeData/AppContext";
import NextNProgress from "nextjs-progressbar";

axios.defaults.baseURL = "https://adminpanel.fasterning.com/api/v1";
export const CartContext = createContext();

const MyApp = ({ Component, pageProps }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCatAndPro = async () => {
    const res = await axios.get("product/search");
    if (res.data) {
      if (res.data.success) {
        const category = res.data.rootCategories.data;
        const allProducts = res.data.products.data;
        if (category && allProducts) {
          dispatch({
            type: "GET_ALL_CATEGORY_AND_PRODUCTS",
            payload: { category, allProducts },
          });
        } else {
          window.location.reload();
        }
      } else {
        window.location.reload();
      }
    } else {
      window.location.reload();
    }
    setLoading(false);
  };
  useEffect(() => {
    getCatAndPro();
  }, []);
  return (
    <AppContext.Provider value={{ state, dispatch, loading }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <NextNProgress
          color="#d05278"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </CartContext.Provider>
    </AppContext.Provider>
  );
};

export default MyApp;
