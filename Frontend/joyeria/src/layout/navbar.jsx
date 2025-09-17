import { useNavigate } from "react-router-dom";
import { Cart, Logo } from "./components/RedesSociales";
import { CartContext } from "../context/contexto";
import { useContext, useState } from "react";
import { DragCloseDrawer } from "./components/DragCloseDrawer";
import ThemeSwitcher from "./components/switch";
import Moneda from "./components/moneda";
import { Precio } from "../utils/precioUtils";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { getCartLength, removeFromCart, updateCartQuantity, cart } =
    useContext(CartContext);

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
    <nav className="absolute z-50 flex items-center justify-between w-full h-16 px-10 text-black bg-transparent dark:text-white">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <Logo className="w-20 h-20" />
      </div>
      <div className="flex items-center justify-center gap-3 ">
        <Moneda />

        <ThemeSwitcher />
        <button className="relative inline-block" onClick={() => setOpen(true)}>
          <Cart className="w-8 h-8" />
          <div className="absolute right-0 flex items-center justify-center w-5 h-5 transform translate-x-1/2 -translate-y-1/2 rounded-full top-1 bg-sky-100">
            <span className="text-xs font-bold text-black uppercase font-nanum">
              {getCartLength()}
            </span>
          </div>
        </button>
      </div>

      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="flex flex-col items-center max-w-2xl p-8 pb-0 mx-auto space-y-4 dark:text-neutral-400">
          <h1 className="mb-6 text-4xl font-bold">Carrito de Compras</h1>
          {getCartLength() === 0 ? (
            <p className="text-lg">Tu carrito está vacío.</p>
          ) : (
            <div className="w-full max-w-4xl">
              {cart.map((producto) => (
                <div
                  key={producto.id + producto.name}
                  className="relative flex items-center justify-between p-4 mb-4 bg-gray-300 rounded-lg shadow-lg dark:bg-gray-800">
                  <div className="flex items-center w-full pb-2">
                    <img
                      src={producto.photo}
                      alt={producto.name}
                      className="object-cover w-20 h-20 mr-4 rounded-lg"
                    />
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {producto.name}
                      </h2>
                      <p className="text-lg">
                        {" "}
                        <Precio
                          key={producto.id}
                          precio={producto.precio_unidad}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center ">
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
                    <span className="text-xl ">{producto.cantidadCompra}</span>
                    {/* Botón para aumentar cantidad */}
                    <button
                      onClick={() =>
                        aumentarCantidad(producto, producto.cantidadCompra)
                      }
                      disabled={
                        producto.cantidadCompra === producto.cantUnidades
                      }
                      className={`px-3 py-1 ml-2 font-bold text-white bg-green-500 rounded  ${
                        producto.cantidadCompra === producto.cantUnidades
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-700"
                      }`}>
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(producto)}
                      className="absolute top-0 right-0 px-3 py-1 ml-6 rounded dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-400">
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {getCartLength() !== 0 && (
            <div className="sticky bottom-0 flex items-center justify-center w-full py-4 border-t backdrop-blur-sm">
              <button
                className="px-3 py-1 text-black bg-orange-400 rounded-md "
                onClick={() => navigate("/Compra")}>
                Ir al Carrito
              </button>
            </div>
          )}
        </div>
      </DragCloseDrawer>
    </nav>
  );
}
