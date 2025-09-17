import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@tremor/react";
import { Logo } from "./components/icons";
import axios from "axios";

const ActivarCuenta = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate(); // Para redirigir al login
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const activarUsuario = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(
          "http://localhost:8000/auth/users/activation/",
          {
            uid,
            token,
          }
        );

        // Si la activación es exitosa, mostramos un mensaje y redirigimos
        setMensaje("Cuenta activada con éxito. Redirigiendo al login...");
        setTimeout(() => {
          navigate("/"); // Redirige a la página de login
        }, 2000); // Espera 2 segundos antes de redirigir
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setMensaje("Hubo un error al activar la cuenta.");
      }
    };

    if (uid && token) {
      activarUsuario();
    }
  }, [uid, token, navigate]);

  return (
    <div className="flex relative justify-center items-center min-h-screen bg-center bg-cover bg-ImgLogin">
      <div className="absolute inset-0 w-full h-full bg-black/80" />
      <Card className="flex flex-col justify-center items-center p-6 w-full max-w-md bg-white rounded-2xl shadow-lg">
        <Logo className="w-60 h-60" />
        <h2 className="mb-4 text-2xl font-semibold text-center">
          Activar Cuenta
        </h2>
        <p className="text-lg text-center">{mensaje}</p>
      </Card>
    </div>
  );
};

export default ActivarCuenta;
