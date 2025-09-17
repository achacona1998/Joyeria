import Card from "./Card";
import { Items } from "./items";

const Texto = () => {
  return (
    <div className="flex flex-col items-start gap-12 justify-evenly">
      <h2 className="font-serif text-2xl Laptop:text-6xl Tablet:text-4xl">
        Brazaletes y Tobilleras
      </h2>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 ">
        {Items.map((item) => (
          <Card
            key={item.id}
            img={item.img}
            name={item.name}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Texto;
