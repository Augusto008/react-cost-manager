import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Container from "./Container";
import logo from "../../img/coin.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Cost Manager" className={styles.logo} />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to='/'>Home</Link>
          </li>
          <li className={styles.item}>
            <Link to='/newproject'>New Project</Link>
          </li>
          <li className={styles.item}>
            <Link to='/Projects'>Projects</Link>
          </li>
          <li className={styles.item}>
            <Link to='/company'>Company</Link>
          </li>
          <li className={styles.item}>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar;