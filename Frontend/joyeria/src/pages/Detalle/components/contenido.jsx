import { useNavigate, useParams } from "react-router-dom";
import useGetJoya from "../../../hooks/GET2";
import { useContext } from "react";
import { CartContext } from "../../../context/contexto";
import { Precio } from "../../../utils/precioUtils";

export const Contenido = () => {
  const { handleAddCart } = useContext(CartContext);
  const { categoria, id } = useParams();
  const { elemento, loading, error } = useGetJoya(categoria, id);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-12 pt-20 dark:text-white dark:bg-black">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-orange-700 rounded-full animate-bounce [animation-delay:.7s]"></div>
          <div className="w-16 h-16 bg-orange-700 rounded-full animate-bounce [animation-delay:.3s]"></div>
          <div className="w-16 h-16 bg-orange-700 rounded-full animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center dark:text-red-500 dark:bg-black">
        <p className="text-2xl">
          Error al cargar los productos. Inténtalo de nuevo más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-20 dark:text-white dark:bg-black ">
      <h1 className="mb-3 text-4xl font-bold">Detalles del Producto</h1>
      <button
        className="px-1 py-2 mb-8 text-2xl font-bodoni hover:underline"
        onClick={() => navigate(-1)}>
        Volver
      </button>

      <div
        className={`w-full max-w-3xl p-6 dark:bg-gray-800 rounded-lg shadow-lg ${
          elemento.cantUnidades == 0 &&
          "opacity-30 relative flex justify-center items-center flex-col"
        }`}>
        <span
          className={` ${
            elemento.cantUnidades == 0
              ? "absolute dark:text-black text-9xl rotate-45 font-roboto dark:bg-slate-400 opacity-80"
              : "hidden"
          }`}>
          Agotado
        </span>
        <h2 className="mb-4 text-3xl font-semibold">{elemento.name}</h2>
        <p className="mb-2 text-lg">
          <strong>Precio:</strong>{" "}
          <Precio key={elemento.id} precio={elemento.precio_unidad} />
        </p>
        <p className="mb-2 text-lg">
          <strong>Pureza:</strong> {elemento.pureza}
        </p>
        <p className="mb-2 text-lg">
          <strong>Tamaño:</strong> {elemento.size}
        </p>
        <p className="mb-2 text-lg">
          <strong>Peso Neto:</strong> {elemento.peso_neto} g
        </p>
        <p className="mb-2 text-lg">
          <strong>Género:</strong> {elemento.genero_usuario}
        </p>

        {/* Información condicional */}
        {categoria === "anillo" && (
          <>
            <p className="mb-2 text-lg">
              <strong>Lugar de uso:</strong> {elemento.lugar_de_uso}
            </p>
            <p className="mb-2 text-lg">
              <strong>Cantidad:</strong> {elemento.cantidad}
            </p>
            <p className="mb-2 text-lg">
              <strong>Tipo:</strong> {elemento.tipo_anillo}
            </p>
          </>
        )}
        {categoria === "arete" && (
          <p className="mb-2 text-lg">
            <strong>Unidades:</strong> {elemento.unidades}
          </p>
        )}
        {categoria === "dije" && (
          <p className="mb-2 text-lg">
            <strong>Tipo de Dije:</strong> {elemento.tipo_dije}
          </p>
        )}
        {categoria === "pircing" && (
          <p className="mb-2 text-lg">
            <strong>Lugar de uso:</strong> {elemento.lugar_de_uso}
          </p>
        )}

        {/* Imágenes */}
        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
          {elemento.photo && (
            <img
              src={elemento.photo}
              alt="Producto"
              className="object-cover w-full h-48 rounded-lg shadow-md"
            />
          )}
          {elemento.photo2 && (
            <img
              src={elemento.photo2}
              alt="Producto"
              className="object-cover w-full h-48 rounded-lg shadow-md"
            />
          )}
          {elemento.photo3 && (
            <img
              src={elemento.photo3}
              alt="Producto"
              className="object-cover w-full h-48 rounded-lg shadow-md"
            />
          )}
        </div>
      </div>
      <button
        className={`px-6 py-3 mt-4 font-bold text-white bg-blue-600 rounded  ${
          elemento.cantUnidades == 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-800"
        }`}
        disabled={elemento.cantUnidades == 0}
        onClick={(e) => {
          e.stopPropagation(); // Evita la navegación del enlace
          e.preventDefault(); // Opcional: evita el comportamiento por defecto del botón
          handleAddCart(elemento, categoria);
        }}>
        Agregar al carrito
      </button>
    </div>
  );
};
