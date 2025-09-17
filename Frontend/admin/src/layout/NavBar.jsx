import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./components/switch";
import { Logo, UserIcon } from "./components/icons";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Eliminar token
    navigate("/"); // Redirigir al login
  };
  const User = () => localStorage.getItem("user");

  return (
    <nav className="flex absolute z-50 justify-between items-center px-10 w-full h-16 text-black dark:bg-black/60 dark:text-white">
      <div className="cursor-pointer" onClick={() => navigate("/dashboard")}>
        <Logo className="w-20 h-20" />
      </div>
      <div className="flex gap-3 justify-center items-center">
        <ThemeSwitcher />
        <div
          className="flex gap-3 items-end cursor-pointer"
          onClick={() => handleLogout()}>
          <UserIcon className="w-8 h-8" />
          <div className="flex flex-col">
            <span className="text-md">{User()}</span>
            <span className="text-md">Cerrar Sesión</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
