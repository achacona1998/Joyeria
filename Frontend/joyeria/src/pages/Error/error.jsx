import { useLocation, useNavigate } from "react-router-dom";

export const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const irAtras = () => {
    navigate(from);
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center w-full h-auto ">
        <div className="p-10 text-center ">
          <p className="text-5xl font-black ">404</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight uppercase Tablet:text-7xl Desktop:text-9xl Laptop:text-9xl ">
            Page not found
          </h1>
          <p className="text-lg leading-7 Laptop:text-3xl Tablet:text-2xl Desktop:text-4xl">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <button
            className="inline-flex items-center justify-center px-4 py-2 mt-10 font-sans font-semibold tracking-wide text-white bg-gray-500 rounded-lg "
            onClick={() => irAtras()}>
            Atras
          </button>
        </div>
      </div>
    </div>
  );
};
