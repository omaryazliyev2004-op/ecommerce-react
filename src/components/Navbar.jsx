import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-black text-white">
      <Link to="/">Home</Link>
      <Link to="/mac">Mac</Link>
      <Link to="/iphone">Iphone</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
}