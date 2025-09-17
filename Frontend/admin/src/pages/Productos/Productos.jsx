import { useState, useEffect } from "react";
import Footer from "../../layout/Footer";
import NavBar from "../../layout/NavBar";
import ProductModal from "./components/ProductModal";
import AnilloForm from "./components/AnilloForm";
import AreteForm from "./components/AreteForm";
import BrazaleteForm from "./components/BrazaleteForm";
import CadenaForm from "./components/CadenaForm";
import DijeForm from "./components/DijeForm";
import PircingForm from "./components/PircingForm";
import TobilleraForm from "./components/TobilleraForm";
import { fetchProducts, deleteProduct } from "../../utils/api";
import { Layout } from "../../layout/Layout";

export default function Productos() {
  const [activeTab, setActiveTab] = useState("anillos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: "anillo", label: "Anillos" },
    { id: "arete", label: "Aretes" },
    { id: "brazalete", label: "Brazaletes" },
    { id: "cadena", label: "Cadenas" },
    { id: "dije", label: "Dijes" },
    { id: "pircing", label: "Pircings" },
    { id: "tobillera", label: "Tobilleras" },
  ];

  // Fetch products when tab changes
  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/app/${activeTab}/`);
      if (!response.ok) {
        throw new Error(`Error fetching ${activeTab}`);
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(`Failed to load ${activeTab}. Please try again later.`);
      // Set empty array to avoid showing old products
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/app/${activeTab}/${productId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      // Remove product from state after successful deletion
      setProducts(products.filter((product) => product.id !== productId));
      alert("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar el producto: " + error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh products after modal closes (in case of create/edit)
    fetchProducts();
  };

  return (
    <Layout>
      <div className="p-6 pt-20 min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>
          <button
            onClick={() => {
              setModalType("create");
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Agregar Producto
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            {tabs.map((tab) => (
              <li key={tab.id} className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="py-10 text-center">
            <p>Cargando productos...</p>
          </div>
        )}

        {error && !loading && (
          <div className="py-10 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            {products.length === 0 ? (
              <div className="py-10 text-center">
                <p>No hay productos disponibles en esta categoría.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Pureza
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Tamaño
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Peso
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          ${product.precio_unidad}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {product.pureza}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {product.size}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {product.peso_neto}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {product.estado === "publico" ? "Público" : "Privado"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setModalType("edit");
                              setSelectedProduct(product);
                              setIsModalOpen(true);
                            }}
                            className="mr-3 text-indigo-600 hover:text-indigo-900">
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900">
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
        initialData={selectedProduct}
        productType={activeTab}
      />
    </Layout>
  );
}
