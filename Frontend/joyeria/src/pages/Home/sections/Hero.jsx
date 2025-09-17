import { Text } from "../components/hero/Text";

export const Hero = () => {
  return (
    <div className="bg-HeroImg h-[80dvh] bg-cover bg-center relative z-0 flex justify-center items-center dark:text-white ">
      <div className="absolute inset-0 w-full h-full bg-white dark:bg-black -z-10 opacity-80"></div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent dark:to-black to-white to-90% -z-10 "></div>
      <Text />
    </div>
  );
};
