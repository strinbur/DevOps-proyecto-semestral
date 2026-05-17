import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const despacho = async () => {
    // 🟢 CORRECCIÓN DEVOPS: Ruta relativa para operar nativamente bajo el Reverse Proxy de Nginx
    await axios
      .get("/api/v1/despachos", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        console.log(response.data);
        setDespachos(response.data);
      });
  };

  useEffect(() => {
    despacho();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="table-auto w-full"> {/* 🟢 CORRECCIÓN VISUAL: table-auto para prevenir desalineamientos */}
              <thead>
                <tr className="border-b bg-slate-50 text-slate-700">
                  <th className="p-3">Orden de despacho</th>
                  <th className="p-3">Orden de compra</th>
                  <th className="p-3">Dirección de entrega</th>
                  <th className="p-3">Fecha despacho</th>
                  <th className="p-3">Patente Camión</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Intentos</th>
                  <th className="p-3">Acciones</th> {/* 🟢 CORRECCIÓN SINTAXIS: Se añade la 8va cabecera faltante */}
                </tr>
              </thead>
              <tbody>
                {despachos
                  // 🟢 CORRECCIÓN LÓGICA: Filtramos para mostrar SÓLO los despachos pendientes (despachado === false)
                  // Cuando pases un pedido a True en el formulario, este desaparecerá automáticamente de la vista
                  .filter((item) => !item.despachado)
                  .map((despacho) => (
                    <tr key={despacho.idDespacho} className="border-b hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-teal-600">{despacho.idDespacho}</td>
                      <td className="p-3">{despacho.idCompra}</td>
                      <td className="p-3 text-sm max-w-xs truncate">{despacho.direccionCompra}</td>
                      <td className="p-3 text-sm">{despacho.fechaDespacho}</td>
                      <td className="p-3 font-mono">{despacho.patenteCamion}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                          Pendiente
                        </span>
                      </td>
                      <td className="p-3 font-semibold">{despacho.intento}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleAbrirModal(despacho)}
                          className="py-1 bg-orange-200 px-6 rounded-xl shadow-sm hover:bg-orange-300 transition-all duration-300 text-sm font-medium"
                        >
                          Cerrar despacho
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      >
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              despacho();
            }}
          />
        )}
      </Modal>
    </>
  );
};