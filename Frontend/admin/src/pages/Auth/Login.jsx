import { useState } from "react";
import { Card, TextInput } from "@tremor/react";
import { Button } from "@tremor/react";
import { Logo } from "./components/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// API base URL from environment variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Obtener el token JWT
      const tokenResponse = await axios.post(
        `${API_URL}/auth/jwt/create/`,
        {
          email: formData.email,
          password: formData.password,
        },
        config
      );
      const { access, refresh } = tokenResponse.data;

      // Guardar el token en localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Credenciales incorrectas. Por favor, verifica tus datos.");
      } else {
        setError("Error al iniciar sesión. Por favor, intenta nuevamente.");
      }
    }
  };

  return (
    <div className="flex relative justify-center items-center min-h-screen bg-center bg-cover bg-ImgLogin">
      <div className="absolute inset-0 w-full h-full bg-black/80" />
      <Card className="flex flex-col justify-center items-center p-6 w-full max-w-md bg-white rounded-2xl shadow-lg">
        <Logo className="w-60 h-60" />
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="w-full">
            <label className="block text-gray-700">Correo</label>
            <TextInput
              className="rounded-md"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su correo"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Contraseña</label>
            <TextInput
              className="rounded-md"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="mt-4 w-full font-bold rounded-md shadow-sm active:shadow-inner shadow-black active:shadow-black hover:shadow-inner hover:shadow-black">
            Iniciar Sesión
          </Button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">¿No tienes una cuenta?</p>
            <Button
              type="button"
              onClick={() => navigate("/register")}
              className="mt-2 w-full font-bold rounded-md shadow-sm active:shadow-inner shadow-black active:shadow-black hover:shadow-inner hover:shadow-black">
              Registrarse
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
