import React, { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

export default function Impressoras() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nfc, setNfc] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [model, setModel] = useState('');
  const [copySpeed, setCopySpeed] = useState('');
  const [resolution, setResolution] = useState('');
  const [memory, setMemory] = useState('');

  function sendData() {
    const formattedData = {
      Modelo: model,
      'Velocidade de Copia': copySpeed,
      Resolução: resolution,
      'Capacidade de Memória': memory,
      NFC: nfc ? nfc.label : '',
      'Data de Compra': purchaseDate ? purchaseDate.toLocaleDateString('pt-BR') : '',
    };

    console.log(formattedData);
    // Adicione qualquer lógica adicional aqui, como enviar os dados para um servidor
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const nfcOptions = [
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl relative">
        <h2 className="text-2xl font-bold mb-4">Cadastro de Impressoras</h2>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded absolute top-4 right-4"
          onClick={openModal}
        >
          Adicionar Impressora
        </button>
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2">Modelo</th>
              <th className="py-2">Velocidade de Copia</th>
              <th className="py-2">Resolução</th>
              <th className="py-2">Capacidade/Memória</th>
              <th className="py-2">NFC</th>
              <th className="py-2">Data de compra</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border-t">John Doe</td>
              <td className="py-2 border-t">30 ppm</td>
              <td className="py-2 border-t">1200x1200 dpi</td>
              <td className="py-2 border-t">256 MB</td>
              <td className="py-2 border-t">Sim</td>
              <td className="py-2 border-t">01/01/2023</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Adicionar Impressora"
        className="bg-white p-8 rounded-lg shadow-md w-3/5 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Adicionar Impressora</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}>
          <label className="block mb-2">
            Modelo:
            <input
              type="text"
              className="border w-full p-2 mt-1 rounded"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
          <div className="flex space-x-4">
            <label className="block mb-2 flex-1">
              Velocidade de Copia:
              <input
                type="text"
                className="border w-full p-2 mt-1 rounded"
                value={copySpeed}
                onChange={(e) => setCopySpeed(e.target.value)}
              />
            </label>
            <label className="block mb-2 flex-1">
              Resolução:
              <input
                type="text"
                className="border w-full p-2 mt-1 rounded"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              />
            </label>
          </div>
          <div className="flex space-x-4">
            <label className="block mb-2 flex-1">
              Capacidade de Memória:
              <input
                type="text"
                className="border w-full p-2 mt-1 rounded"
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
              />
            </label>
            <label className="block mb-2 flex-1">
              NFC:
              <Select
                options={nfcOptions}
                value={nfc}
                onChange={setNfc}
                className="mt-1"
              />
            </label>
          </div>
          <div className="flex space-x-4">
            <label className="block mb-2 flex-1">
              Data de Compra:
              <DatePicker
                selected={purchaseDate}
                onChange={date => setPurchaseDate(date)}
                className="border w-full p-2 mt-1 rounded"
                dateFormat="dd/MM/yyyy"
              />
            </label>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
