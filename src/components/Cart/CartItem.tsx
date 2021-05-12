import {
  addItem,
  CartItem as CI,
  removeItem,
} from "../../app/features/cart/cart";
import { useAppDispatch } from "../../app/hooks";
import classes from "./CartItem.module.css";

type Props = {
  item: CI;
};
const CartItem = (props: Props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useAppDispatch();

  const removeFromCart = () => {
    dispatch(removeItem(id));
  };

  const addToCart = () => {
    dispatch(addItem(props.item));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeFromCart}>-</button>
          <button onClick={addToCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
