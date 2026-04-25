import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-black text-white">
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}