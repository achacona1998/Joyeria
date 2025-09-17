import Card from "./Card";
import { Items } from "./items";

const Texto = () => {
  return (
    <div className="flex flex-col items-start gap-12 justify-evenly">
      <h2 className="font-serif text-2xl Laptop:text-6xl Tablet:text-4xl">
        Nuestra Amplia Selección
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
