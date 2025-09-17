import { Items } from "./components/items";

export default function Footer() {
  return (
    <footer className="pt-20 dark:text-white dark:bg-black">
      <div className="flex items-center justify-center gap-8 py-2 text-sm border-t dark:border-white">
        {Items.map((item) => (
          <a key={item.id} href={item.link}>
            <item.icon className="inline-block w-6 h-6 hover:scale-125 hover:opacity-70" />
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center text-sm text-center border-t dark:border-white">
        <p>
          &copy; {new Date().getFullYear()} All rights reserved | Designed and
          implemented by :&nbsp;{" "}
          <span className="font-semibold">Ariel Chacon Artola</span>
        </p>
      </div>
    </footer>
  );
}
