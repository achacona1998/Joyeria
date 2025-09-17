import { useState, useEffect } from "react";

export default function useCounts(joya) {
  const [count, setcount] = useState([]);

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
        setcount(data.count);
      } catch {
        console.log("Error");
      }
    };

    fetchAnillos();
  }, [joya]);

  return { count };
}
