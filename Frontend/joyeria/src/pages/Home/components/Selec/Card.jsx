// eslint-disable-next-line react/prop-types
const Card = ({ img, name, text }) => {
  return (
    <div className="flex flex-col items-start gap-4 Laptop:gap-8">
      <img src={img} alt={`Foto de ${name}`} className="rounded-sm"/>
      <h3 className="font-serif text-2xl Laptop:text-4xl Tablet:text-3xl">
        {name}
      </h3>
      <p className="text-lg Laptop:text-2xl Tablet:text-xl ">
        {text}
      </p>
    </div>
  );
};

export default Card;
