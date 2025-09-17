import Footer from "./Footer";
import NavBar from "./NavBar";
import { Sidebar } from "./SideBar";

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex">
        <Sidebar />
        <main className="w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};
