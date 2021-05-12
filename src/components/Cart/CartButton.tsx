import { toggleCart } from "../../app/features/cart/cart";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import classes from "./CartButton.module.css";

const CartButton = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const toggleCartHandler = () => {
    dispatch(toggleCart());
  };
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  );
};

export default CartButton;
