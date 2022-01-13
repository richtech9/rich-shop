import axios from "axios";
import { toast } from "react-toastify";

const update = async (type, payload, curp, dispatch) => {
  const quantity = type == "plus" ? curp.qty + 1 : curp.qty - 1;
  if (quantity >= 1) {
    try {
      const res = await axios.post("carts/change-quantity", {
        temp_user_id: localStorage.getItem("uid"),
        cart_id: curp.cart_id,
        type,
      });
      console.log(res);

      if (res.data) {
        if (res.data.success) {
          dispatch(payload);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }
  }
};

const remove = async (id, dispatch) => {
  try {
    const res = await axios.post("carts/destroy", {
      temp_user_id: localStorage.getItem("uid"),
      cart_id: id,
    });

    if (res.data) {
      if (res.data.success) {
        dispatch({
          type: "REMOVE_TO_CART",
          payload: { id },
        });
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("Something wrong try again!");
  }
};

const add = async (qty, variation_id, dispatch) => {
  try {
    const res = await axios.post("carts/add", {
      temp_user_id: localStorage.getItem("uid"),
      variation_id,
      qty,
    });

    if (res.data) {
      if (res.data.success) {
        dispatch({ type: "UPDATE_CART", payload: res.data.data.data });

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("Something wrong try again!");
  }
};

export { update, remove, add };
