import { toggleCart } from "../../app/features/ui/ui";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import classes from "./CartButton.module.css";

const CartButton = () => {
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const dispatch = useAppDispatch();
  const toggleCartHandler = () => {
    dispatch(toggleCart());
  };
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
