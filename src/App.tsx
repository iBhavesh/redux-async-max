import { useEffect } from "react";
import { showNotification } from "./app/features/ui/ui";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;
let timeoutId: NodeJS.Timeout | null;

function App() {
  const cart = useAppSelector((state) => state.cart);
  const notification = useAppSelector((state) => state.ui.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sendRequest = async () => {
      dispatch(
        showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        process.env.REACT_APP_FIREBASE_URL + "cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      dispatch(
        showNotification({
          status: "success",
          title: "Uploaded",
          message: "Uploaded cart successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendRequest().catch((error) => {
      dispatch(
        showNotification({
          status: "error",
          title: "Failed",
          message: "Oops! Something went wrong. Could not upload cart data.",
        })
      );
    });

    timeoutId = setTimeout(() => {
      dispatch(showNotification(null));
    }, 2000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [cart, dispatch]);

  const showCart = useAppSelector((state) => state.ui.showCart);
  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
