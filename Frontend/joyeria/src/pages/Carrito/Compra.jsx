import { useContext, useState } from "react";
import { CartContext, MonedaContext } from "../../context/contexto";
import { AnimatePresence, motion } from "framer-motion";
import MultiStepForm from "./sections/form";
import { LogoCart } from "./components/Logo";
import { useNavigate } from "react-router-dom";
import { Precio } from "../../utils/precioUtils";
import { formatPrecioParaTextarea } from "../../utils/precio";

export default function Compra() {
  const [isOpen, setIsOpen] = useState(false);
  const { vaciar, removeFromCart, updateCartQuantity, cart, getCartLength } =
    useContext(CartContext);
  const navigate = useNavigate();
  const { moneda } = useContext(MonedaContext);

  const calcularTotal = () => {
    return cart.reduce(
      (total, producto) =>
        total + producto.precio_unidad * producto.cantidadCompra,
      0
    );
  };

  const aumentarCantidad = (item, cantidadActual) => {
    updateCartQuantity(item, cantidadActual + 1);
  };

  // Función para reducir la cantidad
  const reducirCantidad = (item, cantidadActual) => {
    if (cantidadActual > 1) {
      updateCartQuantity(item, cantidadActual - 1);
    } else {
      removeFromCart(item); // Si la cantidad llega a 0, elimina el producto
    }
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-8 dark:text-white dark:bg-black">
        <h1 className="mb-6 text-4xl font-bold">Carrito de Compras</h1>
        <button
          className="px-1 py-2 mb-8 text-2xl font-bodoni hover:underline"
          onClick={() => navigate(-1)}>
          Volver
        </button>

        {getCartLength() === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-5 mt-10">
            <p className="text-lg">Tu carrito está vacío.</p>
            <button
              className="px-2 py-1 transition-all duration-300 rounded-sm bg-slate-700 hover:text-slate-700 hover:bg-slate-400 active:translate-y-1 "
              onClick={() => navigate("/")}>
              Volver
            </button>
            <LogoCart className="w-80 h-80" />
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            {cart.map((producto) => (
              <div
                key={producto.id + producto.name}
                className="flex items-center justify-between p-4 mb-4 rounded-lg shadow-lg dark:bg-gray-800">
                <div className="flex items-center">
                  <img
                    src={producto.photo}
                    alt={producto.name}
                    className="object-cover w-20 h-20 mr-4 rounded-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{producto.name}</h2>
                    <p className="text-lg">
                      {" "}
                      <Precio
                        key={producto.id}
                        precio={producto.precio_unidad}
                      />
                    </p>
                    <p className="text-sm">
                      Unidades Restantes{" "}
                      {producto.cantUnidades - producto.cantidadCompra}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {/* Botón para reducir cantidad */}
                  <button
                    onClick={() =>
                      reducirCantidad(producto, producto.cantidadCompra)
                    }
                    disabled={producto.cantidadCompra === 1} // Desactiva el botón si la cantidad es 1
                    className={`px-3 py-1 mr-2 font-bold text-white bg-red-500 rounded ${
                      producto.cantidadCompra === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-700"
                    }`}>
                    -
                  </button>
                  <span className="mx-2 text-xl">
                    {producto.cantidadCompra}
                  </span>
                  {/* Botón para aumentar cantidad */}
                  <button
                    onClick={() =>
                      aumentarCantidad(producto, producto.cantidadCompra)
                    }
                    disabled={producto.cantidadCompra === producto.cantUnidades}
                    className={`px-3 py-1 ml-2 font-bold text-white bg-green-500 rounded  ${
                      producto.cantidadCompra === producto.cantUnidades
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-green-700"
                    }`}>
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(producto)}
                    className="px-4 py-2 ml-6 text-white bg-gray-700 rounded hover:bg-gray-600">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            {/* Mostrar el total del carrito */}
            <div className="mt-6 text-right">
              <h2 className="text-3xl font-bold">
                Total: {formatPrecioParaTextarea(calcularTotal(), moneda)}
              </h2>
              <div className="flex items-center justify-end gap-5">
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-6 py-3 mt-4 font-bold text-white bg-blue-600 rounded hover:bg-blue-800">
                  Finalizar Compra
                </button>
                <button
                  onClick={() => vaciar()}
                  className="px-6 py-3 mt-4 font-bold text-white bg-red-600 rounded hover:bg-red-800">
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 grid p-8 overflow-y-scroll cursor-pointer dark:bg-slate-900/20 backdrop-blur place-items-center">
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden bg-gray-400 rounded-lg shadow-xl cursor-default dark:text-white dark:bg-gray-800">
              <div className="relative z-10">
                <MultiStepForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
