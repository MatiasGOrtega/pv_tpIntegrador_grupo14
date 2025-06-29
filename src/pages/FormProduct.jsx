import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { addProduct, editProduct } from '../app/productsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import FormInput from '../components/Form/FormInput'
import { Button, Flex } from '@radix-ui/themes'
import FormInputSelect from '../components/Form/FormInputSelect'

const defaultProd = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
  rating: {
    rate: 0,
    count: 0
  }
}

function FormProduct() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Obtener productos del estado de Redux
  const products = useAppSelector(state => state.products.items);
  const currentProduct = id ? products.find(p => p.id === parseInt(id)) : null;
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(defaultProd);

  useEffect(() => {
    if (isEditing && currentProduct) {
      setFormData({
        title: currentProduct.title || "",
        price: currentProduct.price || "",
        description: currentProduct.description || "",
        category: currentProduct.category || "",
        image: currentProduct.image || 'https://via.placeholder.com/150',
        rating: {
          rate: currentProduct.rating?.rate || 0,
          count: currentProduct.rating?.count || 0
        }
      });
    } else {
      setFormData(defaultProd);
    }
  }, [isEditing, currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación básica
    if (name === 'price' && value < 0) return;
    if (name === 'count' && value < 0) return;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      rating: name === 'count' ? {
        ...prev.rating,
        count: parseInt(value) || 0
      } : prev.rating
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      id: isEditing ? parseInt(id) : Date.now(),
      title: formData.title,
      price: parseFloat(formData.price).toFixed(2),
      description: formData.description,
      image: formData.image || 'https://via.placeholder.com/150',
      category: formData.category,
      rating: {
        rate: isEditing ? (currentProduct?.rating?.rate || 0) : parseFloat((Math.random() * 5).toFixed(1)),
        count: parseInt(formData.rating.count) || 0
      }
    };

    if (isEditing) {
      dispatch(editProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }

    navigate('/');
  }

  return (
    <Flex p="5" w="100%" align="center" justify="center" mx="auto" style={{ backgroundColor: '#f9f9f9' }}>
      <form onSubmit={handleSubmit} style={{ width: '500px' }}>
        <FormInput
          label="Titulo"
          name="title"
          placeholder="Escribe el titulo del producto"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />

        <FormInput
          label="Precio"
          name="price"
          placeholder="Escribe el precio del producto"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />

        <FormInput
          label="Descripción"
          name="description"
          placeholder="Escribe una descripción del producto"
          value={formData.description}
          onChange={handleChange}
        />

        <FormInput
          label="Cantidad"
          name="count"
          placeholder="Escribe la cantidad del producto (ej. 1.80)"
          type="number"
          value={formData.rating.count}
          onChange={handleChange}
        />

        <FormInputSelect
          label="Categorias"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <FormInput
          label="Imagen(url)"
          name="image"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={formData.image}
          onChange={handleChange}
        />

        <Flex gap="5" mt="5" align="center" justify="between">
          <Button type="submit">
            {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
          </Button>
          <Button variant='ghost'
            type="button"
            onClick={() => navigate('/')}
          >
            Cancelar
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default FormProduct