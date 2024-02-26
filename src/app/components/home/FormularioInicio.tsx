import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormIniciarSesion from "./Form2";

const IniciarSesion = () => {
  return (
    <section className=" py-10 sm:py-0 sm:h-screen flex justify-center w-full px-2 sm:px-4 xs:px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-20">
      <div className=" h-full w-full flex flex-col lg:flex-row gap-10">
        <div className="h-full w-full npx shadcn-ui@latest add input flex flex-col justify-center">
          <h1 className="text-4xl sm:text-6xl text-gray-800 font-bold">
            Iniciar Sesión
          </h1>
          <p className="max-w-[90%] font-medium text-gray-700 text-lg pt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
            minima molestiae ipsa.
          </p>
          <div className="py-8 flex items-center gap-5">
            <h2 className="text-blue-700 font-bold text-2xl">
              Iniciar Sesión con
            </h2>
            <div className="border hidden sm:block border-blue-700 w-20"></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center">
            <Button
              className="w-full py-6 flex items-center gap-3"
              variant="outline"
              disabled
            >
              <img src="/google.png" alt="google" className="w-6" />
              Iniciar Sesión con Google
            </Button>
            <Button
              className="w-full py-6 flex items-center gap-3"
              variant="outline"
              disabled
            >
              <img src="/facebook.png" alt="google" className="w-6" />
              Iniciar Sesión con Facebook
            </Button>
          </div>

          <FormIniciarSesion />

          <div className="pt-5">
            <span className="text-gray-600">
              Si no tienes una cuenta -{" "}
              <Link href={"/registrarse"} className="text-blue-700 font-bold">
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
