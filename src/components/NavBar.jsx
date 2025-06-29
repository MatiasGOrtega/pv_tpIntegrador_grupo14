import { TabNav, Text } from '@radix-ui/themes';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSession } from '../app/userSlice';

const Navbar = () => {

  const user = useSelector(state => state.auth.userSession);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('sessionUser');
    dispatch(logoutSession());
    navigate('/login');
  };


  return (
    <>
      <TabNav.Root size="2" color="indigo" className='bg-white shadow-md' justify={'center'} >
        {user && (
          <>
            <TabNav.Link asChild active >
              <NavLink to="/" >
                <Text size="5" weight="bold" color="indigo">Home</Text>
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild active>
              <NavLink to="/products/add" >
                <Text size="5" weight="bold" color="indigo">Crear Producto</Text>
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild active>
              <NavLink to="/favorites" >
                <Text size="5" weight="bold" color="indigo">Favoritos</Text>
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild active>
              <NavLink to="/about">
                <Text size="5" weight="bold" color="indigo">Acerca De</Text>
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild active>
              <NavLink to="/contact">
                <Text size="5" weight="bold" color="indigo">Contacto</Text>
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild active>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <Text size="5" weight="bold" color="red">Cerrar sesión</Text>
              </button>
            </TabNav.Link>
            <Text size="3" weight="medium" color="green" className="ml-4 mt-1">
              Bienvenido, {user.email}
            </Text>
          </>
        )}

        {!user && (
          <>
            <TabNav.Link asChild active>
              <NavLink to="/login">
                <Text size="5" weight="bold" color="indigo">Login</Text>
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild active>
              <NavLink to="/register">
                <Text size="5" weight="bold" color="indigo">Registro</Text>
              </NavLink>
            </TabNav.Link>
          </>
        )}
      </TabNav.Root>
    </>
  );
};

export default Navbar;