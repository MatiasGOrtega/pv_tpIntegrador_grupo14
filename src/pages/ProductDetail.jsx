import { useParams, Link, useNavigate } from 'react-router-dom';
import { setCurrentProduct, toggleFavorite } from '../app/productsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useEffect } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, currentItem, favorites } = useAppSelector(state => state.products);
  const product = currentItem || items.find(p => p.id === Number(id));
  const isFavorite = favorites.includes(Number(id));

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

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(Number(id)));
  };

  if (!product) {
    return (
      <Flex justify="center" align="center" style={{ height: '60vh' }}>
        <Text>Cargando producto...</Text>
      </Flex>
    );
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>Descripción: {product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <p>Calificación: {product.rating.rate}★ - ({product.rating.count} votos)</p>
      <Button onClick={handleToggleFavorite}>
        {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </Button>
      <Button onClick={() => navigate(-1)} variant="soft" size="2" color="blue">
        Volver
      </Button>
      <Link to={`/products/${product.id}/edit`}>Editar producto</Link>
    </div>
  )
}

export default ProductDetail