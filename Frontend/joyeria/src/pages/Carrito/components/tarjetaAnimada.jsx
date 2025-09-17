// eslint-disable-next-line react/prop-types
export const TarjetaAnimada = ({ Color, Data, expe }) => {
  return (
    <div
      className={`relative w-full max-w-sm pb-6 pt-8 mb-4 rounded-lg shadow-lg text-black ${Color.container} transition-colors duration-300`}>
      <div className={`px-6 py-1 mb-4 text-lg font-semibold ${Color.numbers}`}>
        {Data.tarjeta
          ? Data.tarjeta
              .replace(/\D/g, "")
              .replace(/(.{4})/g, "$1-")
              .slice(0, -1)
          : "XXXX-XXXX-XXXX-XXXX"}
      </div>
      <div className="flex justify-between px-6 mt-8">
        <span className="text-sm">
          {Data.nombre + " " + Data.apellidos || "NOMBRE DEL TITULAR"}
        </span>

        <span className="text-sm">
          {expe
            ? expe
                .replace(/\D/g, "")
                .replace(/(.{2})/g, "$1/")
                .slice(0, -1)
            : "MM/YY"}
        </span>
      </div>
    </div>
  );
};
