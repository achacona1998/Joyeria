import { useContext } from "react";
import { MonedaContext } from "../../context/contexto";

export default function Moneda() {
  const { moneda, setMoneda } = useContext(MonedaContext);

  const handleChange = (event) => {
    setMoneda(event.target.value);
  };

  return (
    <select
      name="moneda"
      id="MONEDA"
      className="bg-transparent"
      value={moneda}
      onChange={handleChange}>
      <option value="cup" className="dark:text-black dark:hover:bg-gray-600">
        CUP
      </option>
      <option value="usd" className="dark:text-black dark:hover:bg-gray-600">
        USD
      </option>
      <option value="mlc" className="dark:text-black dark:hover:bg-gray-600">
        MLC
      </option>
    </select>
  );
}
