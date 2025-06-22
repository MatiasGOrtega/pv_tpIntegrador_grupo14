import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favoritos</Link>
      <Link to="/product/new">Crear producto</Link>
    </nav>
  );
};

export default Navbar;