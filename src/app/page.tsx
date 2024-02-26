import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import Link from "next/link";
import FormSignIp from "@/components/FormSignIp";

const IniciarSesion = () => {
  return (
    <section className="py-3 sm:block sm:py-0 h-screen flex justify-center w-full px-4 sm:px-4 xs:px-10 md:px-10 lg:px-14 xl:px-18 2xl:px-20">
      <div className=" h-full w-full flex flex-col lg:flex-row gap-10">
        <div className="h-full w-full npx shadcn-ui@latest add input flex flex-col justify-center">
          <h1 className="text-4xl pb-8 sm:pb-0 sm:text-6xl text-gray-800 font-bold">
            Iniciar Sesión
          </h1>
          <p className="sm:block hidden text-md sm:max-w-[90%] font-medium text-gray-700 sm:text-lg pt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
            minima molestiae ipsa.
          </p>
          <div className="hidden sm:flex py-8  items-center gap-5">
            <h2 className="text-blue-700 font-bold text-2xl">
              Iniciar Sesión con
            </h2>
            <div className="border hidden sm:block border-blue-700 w-20"></div>
          </div>
          <div className="flex items-center gap-5 justify-center">
            <Button
              className="w-full py-6 flex items-center gap-3 "
              variant="outline"
              disabled
            >
              <FcGoogle className="text-xl" />
              <span className="hidden sm:block">Iniciar Sesión con Google</span>
            </Button>
            <Button
              className="w-full py-6 flex items-center gap-3 "
              variant="outline"
              disabled
            >
              <FaFacebookF className="text-xl text-blue-800" />
              <span className="hidden sm:block">Iniciar Sesión con Facebook</span>
            </Button>
          </div>

          <FormSignIp />

          <div className="pt-5 text-center sm:text-left">
            <span className="text-gray-600 text-xs sm:text-base">
              Si no tienes una cuenta -{" "}
              <Link href={"/signup"} className="text-blue-700 font-bold">
                Crea una gratis
              </Link>
            </span>
          </div>
        </div>
        <div className="h-full w-full hidden lg:flex justify-center items-center">
          <img src="/iniciosesion.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default IniciarSesion;
