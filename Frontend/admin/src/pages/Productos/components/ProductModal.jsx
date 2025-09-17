import { useState } from "react";
import ProductForm from "./ProductForm";
import AnilloForm from "./AnilloForm";
import AreteForm from "./AreteForm";
import BrazaleteForm from "./BrazaleteForm";
import CadenaForm from "./CadenaForm";
import DijeForm from "./DijeForm";
import PircingForm from "./PircingForm";
import TobilleraForm from "./TobilleraForm";

export default function ProductModal({
  isOpen,
  onClose,
  type = "create",
  initialData = {},
  productType = "anillos",
}) {
  if (!isOpen) return null;

  // Función para renderizar el formulario correcto según el tipo de producto
  const renderForm = () => {
    switch (productType) {
      case "anillos":
        return (
          <AnilloForm type={type} initialData={initialData} onClose={onClose} />
        );
      case "aretes":
        return (
          <AreteForm type={type} initialData={initialData} onClose={onClose} />
        );
      case "brazaletes":
        return (
          <BrazaleteForm
            type={type}
            initialData={initialData}
            onClose={onClose}
          />
        );
      case "cadenas":
        return (
          <CadenaForm type={type} initialData={initialData} onClose={onClose} />
        );
      case "dijes":
        return (
          <DijeForm type={type} initialData={initialData} onClose={onClose} />
        );
      case "pircings":
        return (
          <PircingForm
            type={type}
            initialData={initialData}
            onClose={onClose}
          />
        );
      case "tobilleras":
        return (
          <TobilleraForm
            type={type}
            initialData={initialData}
            onClose={onClose}
          />
        );
      default:
        return (
          <ProductForm
            type={type}
            initialData={initialData}
            onClose={onClose}
          />
        );
    }
  };

  return (
    <div className="overflow-y-auto fixed inset-0 z-50">
      <div className="flex justify-center items-center px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full dark:bg-gray-800">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  {type === "create"
                    ? "Crear Nuevo Producto"
                    : "Editar Producto"}
                </h3>
                <div className="mt-4">{renderForm()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
