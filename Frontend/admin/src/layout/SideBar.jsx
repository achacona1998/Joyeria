import { useState } from "react";
import {
  FiChevronsRight,
  FiHome,
  FiShoppingCart,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 p-2 bg-white border-r shrink-0 border-slate-300"
      style={{
        width: open ? "225px" : "fit-content",
      }}>
      <div className="pt-20 space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />

        <Option
          Icon={FiShoppingCart}
          title="Productos"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

// eslint-disable-next-line react/prop-types
const Option = ({ Icon, title, selected, setSelected, open }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      layout
      onClick={() => {
        setSelected(title);
        // eslint-disable-next-line react/prop-types
        navigate(`/${title.toLowerCase()}`);
      }}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}>
      <motion.div
        layout
        className="grid place-content-center w-10 h-full text-lg">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium">
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

// eslint-disable-next-line react/prop-types
const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="pt-10 transition-colors hover:bg-slate-100">
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid place-content-center text-lg size-10">
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium">
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
