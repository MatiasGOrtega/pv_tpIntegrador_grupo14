import { useParams, Link, useNavigate } from 'react-router-dom';
import { setCurrentProduct } from '../app/productsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { Badge, Button, Flex, Inset, Text } from '@radix-ui/themes';
import FavoriteButton from '../components/FavoriteButton';
import { useEffect } from 'react';
import { DeleteButton } from '../components/DeleteButton';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, currentItem } = useAppSelector(state => state.products);
  const product = currentItem || items.find(p => p.id === Number(id));

  useEffect(() => {
    if (!product && id) {
      // Si no encontramos el producto en el estado, lo establecemos
      const foundProduct = items.find(p => p.id === Number(id));
      if (foundProduct) {
        dispatch(setCurrentProduct(foundProduct));
      } else {
        // Redirigir si el producto no existe
        navigate('/not-found', { replace: true });
      }
    }
  }, [id, items, product, dispatch, navigate]);

  if (!product) {
    return (
      <Flex justify="center" align="center" style={{ height: '60vh' }}>
        <Text>Cargando producto...</Text>
      </Flex>
    );
  }

  return (
    <div>
      <Button
        asChild
        variant="soft"
        color="gray"
        size="3"
      >
        <Link to="/">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          Volver a Inicio
        </Link>
      </Button>
      <Flex direction={{
        initial: 'column',
        md: 'row',
      }} justify="center" style={{ padding: '20px' }}>
        <Inset clip="padding-box" side="bottom" pb="current" style={{ position: 'relative' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 500,
              backgroundColor: "var(--gray-5)",
            }}
          />
          <FavoriteButton productId={product.id} />
        </Inset>
        <Flex direction="column" align="start" gap="2" maxWidth="600px" m="20px">
          <Flex direction="column" gap="2" align="start">
            <Text size="8" weight="bold">{product.title}</Text>
            <Badge size="3" variant="soft" color="blue" mt="10px">
              {product.category}
            </Badge>
            <Text size="5" color="gray">
              {product.description}
            </Text>
            <Badge color="grass" size="3">
              <Text size="6" weight="bold">
                {product.rating.rate}
                {product.rating.count > 0 && (
                  <Text size="3" color="gray" weight="light" style={{ marginLeft: '5px' }}>
                    ({product.rating.count} reseñas)
                  </Text>
                )}
              </Text>
            </Badge>
            <Text my="2" size="7" color='indigo' weight='bold'>
              ${product.price} ARS
            </Text>
          </Flex>
          <Flex direction="row" justify="between" style={{ width: '100%' }}>
            <Button
              asChild
              variant="solid"
              color="indigo"
              size="3"
            >
              <Link to={`/products/${product.id}/edit`}>Editar Producto</Link>
            </Button>
            <DeleteButton productId={product.id} />
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}

export default ProductDetail