import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../app/userSlice';
import { useState } from 'react';
import FormInput from '../components/Form/FormInput';
import { Button, Flex } from '@radix-ui/themes';

const Register = () => {
    const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', confirmPassword: '' });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setError(err);
            return;
        }
        dispatch(addUser({ nombre: form.nombre, apellido: form.apellido, email: form.email, password: form.password }));
        alert('Usuario ' + form.nombre + ' ' + form.apellido + ' registrado correctamente');
        navigate('/login');
    };

    return (
        <Flex p="5" w="100%" maxWidth="600px" align="center" justify="center" mx="auto" style={{ backgroundColor: '#f9f9f9' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <h2>Registro de Usuario</h2>

                <FormInput
                    label="Nombre"
                    name="nombre"
                    placeholder="Escribe tu nombre"
                    type="text"
                    value={form.nombre}
                    onChange={handleChange}
                />

                <FormInput
                    label="Apellido"
                    name="apellido"
                    placeholder="Escribe tu apellido"
                    type="text"
                    value={form.apellido}
                    onChange={handleChange}
                />

                <FormInput
                    label="Email"
                    name="email"
                    placeholder="Escribe tu email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <FormInput
                    label="Contraseña"
                    name="password"
                    placeholder="Escribe tu contraseña"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <FormInput
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    placeholder="Confirma tu contraseña"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Flex gap="2" mt="5" direction="column" align="center" justify="between">
                    <Button type="submit">
                        Registrarse
                    </Button>
                    <Link to="/login" style={{ color: '#007bff' }}>
                        Ya tengo cuenta
                    </Link>
                </Flex>
            </form>
        </Flex>
    );
}

export default Register;
