import { Link, useNavigate, useParams } from "react-router-dom";
import useGetJoyas from "../../../hooks/GET";
import { Cart } from "../../../layout/components/RedesSociales";
import { useContext } from "react";
import { CartContext } from "../../../context/contexto";
import { Precio } from "../../../utils/precioUtils";

export const Lista = () => {
  const { categoria } = useParams(); // Captura el parámetro dinámico de la URL
  const { handleAddCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Elimina la "s" si está al final de la categoría
  const categoriaSinS = categoria.endsWith("s")
    ? categoria.slice(0, -1)
    : categoria;

  // Llama al hook personalizado para obtener los datos
  const { elementos, loading, error } = useGetJoyas(
    categoriaSinS.toLowerCase()
  );

  if (loading) {
    return (
      <div className="min-h-screen px-12 pt-20 dark:text-white dark:bg-black">
        <div className="flex flex-wrap justify-center gap-6">
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col rounded-sm max-w-[200px] w-full gap-4 p-4 bg-neutral-300 animate-pulse ">
              <div className="w-full h-32 rounded-md bg-neutral-400/50 animate-pulse"></div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-4 rounded-md bg-neutral-400/50 animate-pulse"></div>
                <div className="w-4/5 h-4 rounded-md bg-neutral-400/50 animate-pulse"></div>
                <div className="w-full h-4 rounded-md bg-neutral-400/50 animate-pulse"></div>
                <div className="w-2/4 h-4 rounded-md bg-neutral-400/50 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="min-h-screen pt-20 text-center dark:text-white dark:bg-black">
        Error al cargar los productos.
      </p>
    );
  }
  return (
    <div className="min-h-screen px-12 pt-20 dark:text-white dark:bg-black">
      <div className="flex items-center justify-between ">
        <h1 className="mb-10 font-serif text-6xl ">{categoria}</h1>

        <button
          className="px-1 py-2 text-2xl font-bodoni hover:underline"
          onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <div className="flex flex-wrap gap-6 justify-evenly ">
        {elementos.length > 0 ? (
          elementos.map((item) => (
            <Link
              to={`/${categoriaSinS.toLowerCase()}/${item.id}`}
              key={item.id}
              className={`rounded-sm max-w-[200px] ${
                item.cantUnidades == 0 &&
                "opacity-40  relative flex justify-center items-center flex-col"
              }`}>
              <span
                className={` ${
                  item.cantUnidades == 0
                    ? "absolute dark:text-black text-6xl rotate-45 font-roboto dark:bg-slate-400 opacity-70"
                    : "hidden"
                }`}>
                Agotado
              </span>
              <img
                src={item.photo}
                alt={`Foto de un ${categoriaSinS}`}
                className="rounded-t-sm aspect-square max-w-[200px] w-full "
              />
              <div className="flex items-center justify-between w-full p-2">
                <div>
                  <h2 className="text-3xl text-center font-abril">
                    {item.name}
                  </h2>
                  <h4 className="text-2xl font-bold text-center font-nanum">
                    <Precio key={item.id} precio={item.precio_unidad} />
                  </h4>
                </div>
                <button
                  disabled={item.cantUnidades == 0}
                  onClick={(e) => {
                    e.stopPropagation(); // Evita la navegación del enlace
                    e.preventDefault(); // Opcional: evita el comportamiento por defecto del botón
                    handleAddCart(item, categoriaSinS.toLowerCase());
                  }}>
                  <Cart className="w-8 h-8" />
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center dark:text-white">
            No hay productos disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default Lista;
