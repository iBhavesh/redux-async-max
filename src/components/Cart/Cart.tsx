import { useAppSelector } from "../../app/hooks";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const items = useAppSelector((state) => state.cart.items);
  const cartItems = items.map((item) => (
    <CartItem
      key={item.id}
      item={{
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        total: item.total,
        price: item.price,
      }}
    />
  ));
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartItems}</ul>
    </Card>
  );
};

export default Cart;
