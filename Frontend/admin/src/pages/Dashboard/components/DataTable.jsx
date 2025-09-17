// eslint-disable-next-line react/prop-types
export function DataTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase bg-gray-50 dark:bg-slate-700">
              Categoría
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase bg-gray-50 dark:bg-slate-700">
              Productos
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-500">
          {/* eslint-disable-next-line react/prop-types */}
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.products}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
