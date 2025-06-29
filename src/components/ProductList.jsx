import { useAppSelector } from "../hooks/store"
import { Grid } from "@radix-ui/themes";
import ProductItem from "./ProductItem";


function ProductList() {

  const { items } = useAppSelector(state => state.products);

  return (
    <>
      {
        items.length > 0 ? (
          <Grid columns={"repeat(auto-fit, minmax(250px, 1fr))"} gap="4" maxWidth={"1200px"} justify={"center"} mx="auto">
            {items.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <p>No products available.</p>
        )
      }
    </>
  )
}

export default ProductList