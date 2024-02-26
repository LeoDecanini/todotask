import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import { IoSearchOutline } from "react-icons/io5";
import ListadoTareas from "@/components/home/ListadoTareas";

const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <Sidebar />
      <div className="w-full">
        <div className="border-b border-b-gray-300 px-10 py-3 hidden sm:flex justify-between items-center gap-5">
          <div className="w-full max-w-lg">
            <div className="px-5 w-full mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full border-2 focus:border-blue-700 border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-primary"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoSearchOutline />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-2xl text-blue-700">Todo Task</h1>
            <div className="h-0.5 rounded-full bg-blue-700 w-20"></div>
          </div>
        </div>
        <ListadoTareas />
      </div>
    </div>
  );
};

export default Home;
