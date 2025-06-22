import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../App/productsSlice' 
import { useNavigate } from 'react-router-dom'

function FormProduct() {

const dispatch=useDispatch()
const navigate=useNavigate()

const defaultProd={
  title: "",
  price: "",
  description: "",
  category: "",
  image: ""
}

const [prod, setProd] = useState(defaultProd)


const handleChange=(e)=>{
  const {name,value}=e.target;
  setProd(prev=>({...prev,[name]: value}))
}
const handleSubmit=(e)=>{
   e.preventDefault()
   dispatch(addProduct({id: Date.now(), price: parseFloat(prod.price), rating: {rate: 0, count: 0}, ...prod}))
   setProd(defaultProd)
   navigate("/")

}
  return (
   <form onSubmit={handleSubmit}>

    <label htmlFor='title'>Titulo</label>
    <input 
    id='title' 
    name='title' 
    value={prod.title}
    onChange={handleChange}
    required
    />

    <label htmlFor='price'>Precio</label>
    <input 
    id='price' 
    name='price'
    type='number'
    value={prod.price}
    onChange={handleChange}
    min="5"
    required
    />

    <label htmlFor='description'>Descripcion</label>
    <input 
    id='description' 
    name='description'
    value={prod.description}
    onChange={handleChange}
    required
    />

    <label htmlFor='category'>Categoria</label>
    <input 
    id='category' 
    name='category'
    value={prod.category}
    onChange={handleChange}
    required
    />

    <label htmlFor='image'>Imagen(url)</label>
    <input 
    id='image' 
    name='image'
    type='url'
    value={prod.image}
    onChange={handleChange}
    required
    />
    <button type='submit'>Agregar</button>
   </form>
  )
}

export default FormProduct