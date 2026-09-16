import { Link } from "react-router-dom";

function NavItem({ title, link }) {
  return (
    <Link to={link}>
      {title}
    </Link>
  );
}

export default NavItem;