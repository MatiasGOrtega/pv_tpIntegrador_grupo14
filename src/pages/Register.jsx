import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../app/userSlice';
import { useState } from 'react'; 
//Cambiar el nombre de la ruta y de la funcion de acuerdo al Slice que se vaya a crear (si es necesario)

const Register = () => {
const [form, setForm] = useState({nombre:'' , apellido:'', email:'', password:''});
const [error, setError] = useState('');
const dispatch = useDispatch(); 
const navigate = useNavigate();

const validate = () => {
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidation.test(form.email)) return 'Por favor, ingresa un email válido.';
    if (form.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    if (form.password !== form.confirmPassword) return 'Las contraseñas no coinciden.';
    return null;
}; 
const handleSubmit = (e) => {
    e.preventDefault(); 
    const err = validate();
    if (err) {
        setError(err);
        return;
    }
    dispatch(addUser({ nombre: form.nombre, apellido:form.apellido, email: form.email, password: form.password }));
    alert('Usuario ' + form.nombre + ' ' + form.apellido + ' registrado correctamente');
    navigate('/login'); 
};
return (
    <form onSubmit={handleSubmit} >
        <h2>Registro de Usuario</h2>
        <input type="text" placeholder="Nombre" value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })} required />
        <input type="text" placeholder="Apellido" value={form.apellido}
            onChange={e => setForm({ ...form, apellido: e.target.value })} required />
        <input type="email" placeholder="Correo" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Contraseña" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
        <input type="password" placeholder="Confirmar Contraseña" value={form.confirm}
            onChange={e => setForm({ ...form, confirm: e.target.value })} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrarse</button>
    </form>
);

}
