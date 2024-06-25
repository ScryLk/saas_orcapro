import React, { useState, useEffect } from 'react';
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
  const [controlPanel, setControlPanel] = useState(null);
  const [duplex, setDuplex] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [paperHeight, setPaperHeight] = useState(null);



  useEffect(() => {
    fetchEquipamentos();
  }, []);

  const fetchEquipamentos = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "web");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://192.168.0.155:3000/equipamentos/", requestOptions)
      .then(response => response.json())
      .then(result => {
        setEquipamentos(result.equipamentos);
      })
      .catch(error => console.error(error));
  }

  const sendData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "web");

    const formattedData = {
      modelo: model,
      velocidade_copia: copySpeed,
      resolucao: resolution,
      capacidade_de_memoria: memory,
      nfc: nfc?.value === 'sim',
      data_compra: purchaseDate ? purchaseDate.toISOString().split('T')[0] : '',
      paper_height: paperHeight?.value,
      control_panel: controlPanel?.value === 'sim',
      duplex: duplex?.value === 'sim',
    };

    const raw = JSON.stringify(formattedData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://192.168.0.155:3000/equipamentos/", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert("Equipamento cadastrado com sucesso!");
          setEquipamentos([...equipamentos, result.equipamento]);
          closeModal();
        } else {
          alert("Erro ao cadastrar equipamento.");
        }
      })
      .catch(error => console.error(error));
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const nfcOptions = [
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' },
  ];

  const paperHeights = [
    { value: 'a4', label: 'A4' },
    { value: 'a3', label: 'A3' },
  ];

  const controlPanelOptions = [
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' },
  ];

  const duplexOptions = [
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
              <th className="py-2">Resolução</th>
              <th className="py-2">Capacidade/Memória</th>
              <th className="py-2">NFC</th>
              <th className="py-2">Painel de Controle</th>
              <th className="py-2">Frente e Verso</th>
              <th className="py-2">Data de compra</th>
            </tr>
          </thead>
          <tbody>
            {equipamentos.map(equipamento => (
              <tr key={equipamento.id}>
                <td className="py-2 border-t">{equipamento.modelo}</td>
                <td className="py-2 border-t">{equipamento.velocidade_copia}</td>
                <td className="py-2 border-t">{equipamento.resolucao}</td>
                <td className="py-2 border-t">{equipamento.capacidade_de_memoria}</td>
                <td className="py-2 border-t">{equipamento.nfc ? 'Sim' : 'Não'}</td>
                <td className="py-2 border-t">{equipamento.control_panel ? 'Sim' : 'Não'}</td>
                <td className="py-2 border-t">{equipamento.duplex ? 'Sim' : 'Não'}</td>
                <td className="py-2 border-t">{new Date(equipamento.data_compra).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
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
            <label className="block mb-2 flex-1">
              Tipo de Papel:
              <Select
                options={paperHeights}
                value={paperHeight}
                onChange={setPaperHeight}
                className="mt-1"
              />
            </label>
          </div>
          <div className="flex space-x-4">
            <label className="block mb-2 flex-1">
              Painel de Controle:
              <Select
                options={controlPanelOptions}
                value={controlPanel}
                onChange={setControlPanel}
                className="mt-1"
              />
            </label>
            <label className="block mb-2 flex-1">
              Frente e Verso:
              <Select
                options={duplexOptions}
                value={duplex}
                onChange={setDuplex}
                className="mt-1"
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
