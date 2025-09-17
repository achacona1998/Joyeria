import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, TextInput } from "@tremor/react";
import { Button } from "@tremor/react";
import { Logo } from "./components/icons";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== re_password) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("http://localhost:8000/auth/users/", {
        username,
        role,
        email,
        password,
        re_password,
      });
      setMessage("Registro exitoso. Revisa el correo para activar la cuenta.");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Error al registrar el usuario.");
    }
  };

  return (
    <div className="flex relative justify-center items-center min-h-screen bg-center bg-cover bg-ImgLogin">
      <div className="absolute inset-0 w-full h-full bg-black/80" />
      <Card className="flex flex-col justify-center items-center p-6 w-full max-w-md bg-white rounded-2xl shadow-lg">
        <Logo className="w-60 h-60" />
        {message && <p className="mb-4 text-center text-red-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="w-full">
            <label className="block text-gray-700">Usuario</label>
            <TextInput
              className="rounded-md"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su nombre de usuario"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Correo</label>
            <TextInput
              className="rounded-md"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Confirmar Contraseña</label>
            <TextInput
              className="rounded-md"
              type="password"
              name="re_password"
              value={re_password}
              onChange={(e) => setRe_password(e.target.value)}
              placeholder="Confirme su contraseña"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Rol</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="admin">Administrador</option>
              <option value="vendedor">Vendedor</option>
              <option value="inventario">Inventario</option>
            </select>
          </div>
          <Button
            type="submit"
            className="mt-4 w-full font-bold rounded-md shadow-sm active:shadow-inner shadow-black active:shadow-black hover:shadow-inner hover:shadow-black">
            Registrarse
          </Button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">¿Ya tienes una cuenta?</p>
            <Button
              type="button"
              onClick={() => navigate("/")}
              className="mt-2 w-full font-bold rounded-md shadow-sm active:shadow-inner shadow-black active:shadow-black hover:shadow-inner hover:shadow-black">
              Iniciar Sesión
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
