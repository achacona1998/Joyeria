import axios from "axios";

// Crear una instancia de axios con la configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token de autenticación a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de autenticación
    if (error.response && error.response.status === 401) {
      // Redirigir al login o mostrar mensaje
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Funciones para operaciones CRUD
export const fetchProducts = async (productType) => {
  try {
    const response = await api.get(`/api/${productType}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (productType, productData) => {
  try {
    // Si hay archivos, usar FormData
    if (productData instanceof FormData) {
      const response = await api.post(`/api/${productType}/`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } else {
      const response = await api.post(`/api/${productType}/`, productData);
      return response.data;
    }
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (productType, productId, productData) => {
  try {
    // Si hay archivos, usar FormData
    if (productData instanceof FormData) {
      const response = await api.put(
        `/api/${productType}/${productId}/`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } else {
      const response = await api.put(
        `/api/${productType}/${productId}/`,
        productData
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productType, productId) => {
  try {
    const response = await api.delete(`/api/${productType}/${productId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export default api;
