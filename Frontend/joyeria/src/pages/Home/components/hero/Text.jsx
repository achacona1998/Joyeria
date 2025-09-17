import { Link } from "react-router-dom";

export const Text = () => {
  return (
    <div className="z-20 flex flex-col gap-6 px-12">
      <h1 className="text-5xl Laptop:text-7xl Tablet:text-6xl">Silena Joyeria</h1>
      <p className="text-lg Laptop:text-2xl Tablet:text-xl ">
        Descubre nuestra colección de joyas elegantes, desde anillos hasta
        collares, con diseños clásicos y modernos. Cada pieza está hecha con
        materiales de alta calidad y acabados impecables. Encuentra el regalo
        perfecto para un ser querido o consiéntete con una pieza especial.
        Nuestras joyas inspiran confianza, elegancia y belleza atemporal.
      </p>
      <Link
        to="Catalogos"
        className="p-4 text-lg font-bold text-white bg-orange-600 rounded-sm Tablet:text-xl w-fit font-roboto">
        Ver Nuestra Selección
      </Link>
    </div>
  );
};
