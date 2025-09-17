import { useState, useEffect } from "react";

export default function useGetJoyas(joya) {
  const [elementos, setElementos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnillos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/app/${joya}/`
        ); // URL de tu API
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setElementos(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnillos();
  }, [joya]);

  return { elementos, error, loading };
}
