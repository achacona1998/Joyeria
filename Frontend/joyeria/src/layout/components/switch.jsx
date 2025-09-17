import useTheme from "../../hooks/useTheme";
import { Luna, Sol } from "./RedesSociales";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-end justify-center transition-all delay-200 ">
      {theme === "dark" ? (
        <Sol className="w-8 h-8 text-yellow-500" />
      ) : (
        <Luna className="w-8 h-8 text-gray-800 " />
      )}
    </button>
  );
}
