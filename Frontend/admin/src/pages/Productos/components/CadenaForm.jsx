import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function CadenaForm({ type = "create", initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    precio_unidad: initialData.precio_unidad || "",
    pureza: initialData.pureza || "",
    size: initialData.size || "",
    peso_neto: initialData.peso_neto || "",
    genero_usuario: initialData.genero_usuario || "unisex",
    estado: initialData.estado || "privado",
    photo: null,
    photo2: null,
    photo3: null,
    ...initialData,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar lógica de envío al backend
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Precio
          </label>
          <input
            type="number"
            name="precio_unidad"
            value={formData.precio_unidad}
            onChange={handleChange}
            className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Pureza */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Pureza
          </label>
          <input
            type="text"
            name="pureza"
            value={formData.pureza}
            onChange={handleChange}
            className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Tamaño */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Tamaño
          </label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Peso */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Peso
          </label>
          <input
            type="text"
            name="peso_neto"
            value={formData.peso_neto}
            onChange={handleChange}
            className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Género */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Género
          </label>
          <select
            name="genero_usuario"
            value={formData.genero_usuario}
            onChange={handleChange}
            className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600">
            <option value="unisex">Unisex</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Estado
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600">
            <option value="privado">Privado</option>
            <option value="publico">Público</option>
          </select>
        </div>
      </div>

      {/* Imágenes */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Imágenes del Producto
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((num) => (
            <div key={num} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Imagen {num}
              </label>
              <input
                type="file"
                name={`photo${num === 1 ? "" : num}`}
                onChange={handleChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {type === "create" ? "Crear Cadena" : "Actualizar Cadena"}
        </button>
      </div>
    </form>
  );
}
