import { productData } from "../components/const";
import { DataTable } from "../components/DataTable";

export function TablaDeDatos() {
  return (
    <div className="p-6 bg-white rounded-lg shadow dark:bg-slate-500">
      <h2 className="mb-4 text-xl font-semibold">Data Selling Categories</h2>
      <DataTable data={productData} />
    </div>
  );
}
