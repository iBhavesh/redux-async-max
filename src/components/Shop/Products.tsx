import { useAppSelector } from "../../app/hooks";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
  const products = useAppSelector((state) => state.products.products);
  const productItems = products.map((item) => {
    return <ProductItem key={item.id} item={item} />;
  });
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productItems}</ul>
    </section>
  );
};

export default Products;
