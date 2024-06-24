import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Employers() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    nome: "",
    email: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openEditModal(employee) {
    setCurrentEmployee(employee);
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, password });
    closeModal();
  }

  function sendData() {
    console.log(name, email, password);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl relative">
        <h2 className="text-2xl font-bold mb-4">Cadastro de Colaboradores</h2>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded absolute top-4 right-4"
          onClick={openModal}
        >
          Adicionar Colaborador
        </button>
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2">Nome</th>
              <th className="py-2">Email</th>
              <th className="py-2">Status</th>
              <th className="py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border-t">lucas</td>
              <td className="py-2 border-t">lucas@gmail.com</td>
              <td className="py-2 border-t">Ativo</td>
              <td className="py-2 border-t text-blue-500">
                <button
                  onClick={() =>
                    openEditModal({ nome: "lucas", email: "lucas@gmail.com" })
                  }
                >
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal de Adicionar */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Adicionar Colaborador"
        className="bg-white p-8 rounded-lg shadow-md w-3/5 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Adicionar Colaborador</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="block text-gray-700">Nome:</span>
            <input
              type="text"
              className="border w-full p-2 mt-1 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            <span className="block text-gray-700">Email:</span>
            <input
              type="email"
              className="border w-full p-2 mt-1 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            <span className="block text-gray-700">Senha:</span>
            <input
              type="password"
              className="border w-full p-2 mt-1 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              onSubmit={() => sendData()}
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de Editar */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Editar Colaborador"
        className="bg-white p-8 rounded-lg shadow-md w-3/5 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Colaborador</h2>
        <form>
          <label className="block mb-2">
            <span className="block text-gray-700">Nome:</span>
            <input
              type="text"
              className="border w-full p-2 mt-1 rounded"
              value={currentEmployee.nome}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, nome: e.target.value })
              }
            />
          </label>
          <label className="block mb-2">
            <span className="block text-gray-700">Email:</span>
            <input
              type="email"
              className="border w-full p-2 mt-1 rounded"
              value={currentEmployee.email}
              onChange={(e) =>
                setCurrentEmployee({
                  ...currentEmployee,
                  email: e.target.value,
                })
              }
            />
          </label>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Desativar
            </button>
            <div className="flex">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                onClick={closeEditModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
