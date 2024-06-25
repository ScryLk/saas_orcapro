import React from "react";

function Home() {
  return (
    <div className="flex flex-col overflow-hidden items-center mt-20 min-h-screenp-4">
      <div className="flex flex-wrap justify-center w-full mb-8">
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <label>
              <h1 className="text-xl font-bold mb-2">Impressoras Cadastradas</h1>
            </label>
            <div className="border-2 h-40 rounded-lg flex justify-center items-center">
              <h1 className="text-3xl">Opa</h1>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <label>
              <h1 className="text-xl font-bold mb-2">Colaboradores Cadastrados</h1>
            </label>
            <div className="border-2 h-40 rounded-lg flex justify-center items-center">
              <h1 className="text-3xl">Opa</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
