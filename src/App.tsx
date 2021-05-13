import { useEffect } from "react";
import { fetchCartData, sendCartData } from "./app/features/cart/cartActions";
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
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (!cart.changed) return;

    dispatch(sendCartData(cart));

    return () => {};
  }, [cart, dispatch]);

  useEffect(() => {
    if (notification)
      timeoutId = setTimeout(() => {
        dispatch(showNotification(null));
      }, 2000);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [notification, dispatch]);

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
