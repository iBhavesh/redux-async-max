import { AppDispatch } from "../../store";
import { showNotification } from "../ui/ui";
import { CartState, replaceCart } from "./cart";

export const sendCartData = (cart: CartState) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        process.env.REACT_APP_FIREBASE_URL + "cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        showNotification({
          status: "success",
          title: "Uploaded",
          message: "Uploaded cart successfully!",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Failed",
          message: "Oops! Something went wrong. Could not upload cart data.",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        process.env.REACT_APP_FIREBASE_URL + "cart.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData: CartState = await response.json();

      return responseData;
    };
    try {
      const cartData = await sendRequest();
      dispatch(
        replaceCart({
          items: cartData.items ?? [],
          totalQuantity: cartData.totalQuantity ?? 0,
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Failed",
          message: "Oops! Something went wrong. Fetching cart data failed!",
        })
      );
    }
  };
};
