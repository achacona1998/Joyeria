// eslint-disable-next-line react/prop-types
export function EngagementTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase bg-gray-50 dark:bg-slate-700">
              Canal
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase bg-gray-50 dark:bg-slate-700">
              Compromiso
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-500">
          {/* eslint-disable-next-line react/prop-types */}
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.channel}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.engagement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
