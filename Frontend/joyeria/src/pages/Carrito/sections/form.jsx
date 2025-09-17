import { useContext, useEffect, useState } from "react";
import { CartContext, MonedaContext } from "../../../context/contexto";
import axios from "axios";
import { getCardColor } from "../../../utils/formUtils";
import { Checkbox } from "../components/checkbox";
import { InputField } from "../components/inputField";
import { TarjetaAnimada } from "../components/tarjetaAnimada";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formatPrecioParaTextarea } from "../../../utils/precio";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const { cart, vaciar } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [exp, setExp] = useState("");
  const [domicilio, setDomicilio] = useState(false);
  const [tienda, setTienda] = useState(false);
  const [error, setError] = useState("");
  const [direccion, setDireccion] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    tarjeta: "",
    items: [], // Inicialmente vacío
  });
  const cardColor = getCardColor(formData.tarjeta);
  const { moneda } = useContext(MonedaContext);

  // Sincroniza los datos del carrito con formData.items
  useEffect(() => {
    const updatedItems = cart.map((item) => ({
      producto_id: item.id || "",
      nombre_articulo: item.name || "",
      tipo_producto: item.tipo_producto || "",
      cantidad: item.cantidadCompra || "",
      precio_unitario: item.precio_unidad || 0,
    }));
    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  }, [cart]);

  console.log(formData);
  const nextStep = () => {
    if (step === 1) {
      if (!formData.nombre || !formData.apellidos) {
        setError("Por favor, completa todos los campos.");
        return;
      }
      if (!domicilio && !tienda) {
        setError("Debes seleccionar un método de entrega.");
        return;
      }
      if (domicilio && !direccion.trim()) {
        setError("Debes ingresar una dirección para la entrega a domicilio.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.tarjeta || !exp) {
        setError("Por favor, completa los datos de la tarjeta.");
        return;
      }
    }

    setError(""); // Limpia errores si todo está bien
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si la tarjeta es válida antes de enviar el formulario
    const cleanCardNumber = formData.tarjeta.replace(/\s/g, "");
    if (cleanCardNumber.length === 16 && !validarTarjeta(cleanCardNumber)) {
      toast.error("El número de tarjeta no es válido.");
      return; // Detener el envío del formulario si la tarjeta no es válida
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "http://127.0.0.1:8000/compra/orden/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      vaciar();
      toast.success("¡Orden creada exitosamente!");
      navigate("/");
    } catch (error) {
      toast.error(
        "Hubo un problema al procesar la orden. Por favor, inténtalo nuevamente."
      );
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
    }
  };

  function validarTarjeta(numero) {
    // Convertir el número a una cadena y luego a un array de dígitos
    const digitos = numero.split("").map(Number);

    // Verificar que tenga 16 dígitos
    if (digitos.length !== 16) {
      return false;
    }

    // Aplicar el algoritmo de Luhn
    let suma = 0;
    let invertir = false;

    // Recorrer los dígitos de derecha a izquierda
    for (let i = digitos.length - 1; i >= 0; i--) {
      let d = digitos[i];
      if (invertir) {
        d *= 2;
        if (d > 9) {
          d -= 9;
        }
      }
      suma += d;
      invertir = !invertir;
    }

    // Verificar si la suma es divisible por 10
    return suma % 10 === 0;
  }

  const handleChangeCardNumber = (value) => {
    // Eliminar caracteres no numéricos y agregar espacio cada 4 dígitos
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    // Actualiza el estado de la tarjeta
    setFormData({ ...formData, tarjeta: formattedValue });

    // Eliminar los espacios y verificar si tiene exactamente 16 dígitos
    const cleanCardNumber = formattedValue.replace(/\s/g, "");

    if (cleanCardNumber.length === 16) {
      // Validar tarjeta solo cuando tenga exactamente 16 dígitos
      if (!validarTarjeta(cleanCardNumber)) {
        setError("El número de tarjeta no es válido.");
      } else {
        setError(""); // Limpia el error si la tarjeta es válida
      }
    } else {
      // No validar si no tiene exactamente 16 dígitos
      setError("");
    }
  };

  const handleCheckboxChange = (tipo) => {
    if (tipo === "domicilio") {
      setDomicilio(true);
      setTienda(false);
    } else {
      setTienda(true);
      setDomicilio(false);
    }
    setError(""); // Limpiar error al seleccionar una opción
  };

  const textareaValue = formData.items
    .map(
      (item) =>
        `${item.nombre_articulo} - ${formatPrecioParaTextarea(
          item.precio_unitario,
          moneda
        )} - x${item.cantidad}`
    )
    .join("\n");

  return (
    <div className="max-w-md p-6 mx-auto mt-10 rounded-lg ">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h2 className="mb-4 text-xl font-bold">Datos</h2>
            <InputField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={setFormData}
              placeholder="Pepe"
            />
            <InputField
              label="Apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={setFormData}
              placeholder="Perez Perez"
            />
            <span className="text-xs font-bold">
              ¿Cómo recibirás tus productos?
            </span>
            <Checkbox
              label="Entrega a domicilio"
              checked={domicilio}
              onChange={() => handleCheckboxChange("domicilio")}
            />
            <Checkbox
              label="Recogida en tienda"
              checked={tienda}
              onChange={() => handleCheckboxChange("tienda")}
            />

            {domicilio && (
              <div className="mt-2">
                <span className="text-xs">Entrega a domicilio</span>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full p-2 mt-1 text-black border rounded-md"
                  placeholder="Calle, #, Municipio"
                />
              </div>
            )}
            {tienda && (
              <div className="mt-2">
                <span className="text-xs">Recogida en tienda</span>
                <p className="font-bold">
                  Ave Palmar 719 Apt39 entre Ave Norte y Ave Ceiba. Casino
                  Deportivo, Cerro, La Habana.
                </p>
              </div>
            )}

            <div className="mb-4">
              <textarea
                className="block w-full p-4 bg-transparent rounded-lg outline-none min-h-32 "
                type="text"
                id="items"
                name="items"
                value={textareaValue}
                readOnly
              />
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full py-2 text-white bg-blue-500 rounded-md">
              Siguiente
            </button>
            {error && (
              <p className="mt-2 text-xs text-center text-red-500">{error}</p>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-4 text-xl font-bold">Información de Pago</h2>
            <TarjetaAnimada Color={cardColor} Data={formData} expe={exp} />

            {/* Inputs de datos */}
            <div className="mb-4">
              <label className="block text-gray-300">Número de Tarjeta</label>
              <input
                type="text"
                name="tarjeta"
                value={formData.tarjeta}
                onChange={(e) => handleChangeCardNumber(e.target.value)}
                maxLength="19"
                className="w-full p-2 mt-1 text-black border rounded-md"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300">Fecha de Expiración</label>
              <input
                type="text"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                maxLength="4"
                className="w-full p-2 mt-1 text-black border rounded-md"
                placeholder="MM/YY"
                required
              />
            </div>

            {/* Navegación */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-black bg-gray-500 rounded-md">
                Atrás
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-500 rounded-md">
                Enviar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
