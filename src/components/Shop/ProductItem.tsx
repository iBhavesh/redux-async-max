import { addItem } from "../../app/features/cart/cart";
import { Product } from "../../app/features/products/products";
import { useAppDispatch } from "../../app/hooks";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

type Props = {
  item: Product;
};

const ProductItem = ({ item }: Props) => {
  const { title, price, description } = item;
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(addItem(item));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
