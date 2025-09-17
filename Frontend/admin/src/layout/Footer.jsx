export default function Footer() {
  return (
    <footer className="pt-5 dark:text-white dark:bg-black">
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
