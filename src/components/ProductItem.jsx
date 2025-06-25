import { Badge, Box, Flex, Inset, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

function ProductItem({ product }) {

  return (
    <Box className='product-card' position="relative">
      <FavoriteButton productId={product.id} />
      <Link to={`/products/${product.id}`}>
        <Flex position={"relative"} direction="column" p="2" gap="1">
          <Inset clip="padding-box" side="top" pb="current">
            <img
              src={product.image}
              alt="Bold typography"
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: 180,
                backgroundColor: "var(--gray-5)",
              }}
            />
          </Inset>

          <Flex direction="column" align="start" justify="between" gap="2">
            <Badge color="indigo">{product.category}</Badge>
            <Box width="100%">
              <Text className='title-product' as="p" size="4" weight="bold" truncate>
                {product.title}
              </Text>
            </Box>

            <Box width="100%" >
              <Text as='p' color='gray' size="3" truncate>
                {product.description}
              </Text>
            </Box>

            <Text my="2" size="5" color='indigo' weight='bold'>
              ${product.price} ARS
            </Text>

            <Badge color="grass" size="3">
              <Text weight="medium">
                {product.rating.rate} puntos
              </Text>
            </Badge>
          </Flex>
        </Flex >
      </Link>
    </Box>
  )
}

export default ProductItem