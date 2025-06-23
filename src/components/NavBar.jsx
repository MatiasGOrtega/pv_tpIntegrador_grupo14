import { TabNav, Text } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <TabNav.Root size="2" color="indigo" className='bg-white shadow-md' justify={'center'} >
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
      </TabNav.Root>
    </>
  );
};

export default Navbar;