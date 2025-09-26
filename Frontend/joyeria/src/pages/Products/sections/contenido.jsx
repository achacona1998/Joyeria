import { Link } from "react-router-dom";
import { Items } from "../components/items";
import useCounts from "../../../hooks/count";

export const Contenido = () => {
  // Llamar hooks en el nivel superior
  const anilloCount = useCounts("anillo").count;
  const areteCount = useCounts("arete").count;
  const cadenaCount = useCounts("cadena").count;
  const brazaleteCount = useCounts("brazalete").count;
  const tobilleraCount = useCounts("tobillera").count;
  const pircingCount = useCounts("pircing").count;
  const dijeCount = useCounts("dije").count;

  // Mapear los conteos a los elementos
  const countsMap = {
    "anillo": anilloCount,
    "arete": areteCount,
    "cadena": cadenaCount,
    "brazalete": brazaleteCount,
    "tobillera": tobilleraCount,
    "pircing": pircingCount,
    "dije": dijeCount
  };

  // Preparar una lista para almacenar los datos de conteo
  const itemsConCount = Items.map((item) => {
    const joyaSinS = item.name.slice(0, -1).toLowerCase();
    return {
      ...item,
      count: countsMap[joyaSinS] || 0,
    };
  });

  return (
    <div className="px-12 pt-20 dark:text-white dark:bg-black ">
      <h1 className="text-6xl">Catálogos</h1>

      <div className="flex flex-wrap gap-5 pt-10 justify-evenly">
        {itemsConCount.map((item) => (
          <Link
            key={item.id}
            to={`/${item.name}`}
            className="text-black bg-white Laptop:max-w-[300px] w-full rounded-sm text-center max-w-[150px] Tablet:max-w-[200px]">
            <img
              src={item.img}
              alt={`Imagen de ${item.name}`}
              className="w-full Laptop:h-[300px] aspect-square rounded-t-sm h-[150px] Tablet:h-[200px]"
            />
            <div className="py-2">
              <h3 className="text-3xl">{item.name}</h3>
              <p className="text-sm ">{item.count} artículos</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
