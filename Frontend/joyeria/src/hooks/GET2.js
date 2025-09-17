import { useState, useEffect } from "react";

export default function useGetJoya(joya, id) {
  const [elemento, setElemento] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnillos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/app/${joya}/${id}/`
        ); // URL de tu API
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setElemento(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnillos();
  }, [joya, id]);

  return { elemento, error, loading };
}
