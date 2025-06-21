import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispach } from 'react-redux';
import {toggleFavorite} from '../app/productsSlice';
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispach();

  const product = useSelector(state =>
    state.products.items.find(item => item.id === parseInt(id))
  );
  const favorites = useSelector(state => state.products.favorites);
  const isFavorite = favorites.includes(parseInt(id));

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src= {product.image} alt={product.title} />
      <p>Descripción: {product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <p>Calificación: {product.rating.rate}★ - ({product.rating.count} votos)</p>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </button>
      <button onClick={() => navigate('/')}>Volver</button>
      <Link to={`/products/${product.id}/edit`}>Editar producto</Link>
    </div>
  )
}

export default ProductDetail