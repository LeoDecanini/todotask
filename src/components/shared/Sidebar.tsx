"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

import { IoIosLink } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { BiTask, BiTaskX } from "react-icons/bi";
import { ImExit } from "react-icons/im";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

const data = [
  {
    name: "Inicio",
    items: [
      {
        title: "Todas las tareas",
        value: "all",
        icon: FaTasks,
      },
      {
        title: "Tareas completadas",
        value: "Completado",
        icon: BiTask,
      },
      {
        title: "Tareas por completar",
        value: "Pendiente",
        icon: BiTaskX,
      },
    ],
  },
];

const datafooter = [
  {
    name: "",
    items: [
      {
        title: "Cerrar Sesión",
        icon: ImExit,
      },
    ],
  },
];

export default function Sidebar() {
  const [active, setActive] = useState(false);
  const controls = useAnimation();
  const controlText = useAnimation();
  const controlTitleText = useAnimation();

  const showMore = () => {
    controls.start({
      width: "300px",
      transition: { duration: 0.001 },
    });
    controlText.start({
      opacity: 1,
      display: "block",
      transition: { delay: 0.3 },
    });
    controlTitleText.start({
      opacity: 1,
      transition: { delay: 0.3 },
    });

    setActive(true);
  };

  const showLess = () => {
    controls.start({
      width: "55px",
      transition: { duration: 0.001 },
    });

    controlText.start({
      opacity: 0,
      display: "none",
    });

    controlTitleText.start({
      opacity: 0,
    });

    setActive(false);
  };

  useEffect(() => {
    showMore();
  }, []);

  return (
    <div
      className={`sm:min-h-[100svh] ${
        active ? "w-full sm:max-w-[300px]" : "sm:pr-12"
      }`}
    >
      {!active && (
        <div className="p-5 flex justify-between border w-full sm:hidden">
          <BsFillArrowRightSquareFill
            onClick={showMore}
            className="text-2xl text-black bg-white cursor-pointer "
          />

          <h1 className="font-bold text-xl">Todo Task</h1>
        </div>
      )}

      {active && (
        <div className="p-5 flex justify-between border w-full sm:hidden">
          <BsFillArrowLeftSquareFill
            onClick={showLess}
            className="text-2xl text-black bg-white cursor-pointer "
          />

          <h1 className="font-bold text-xl">Todo Task</h1>
        </div>
      )}

      <div className={`fixed z-10 ${active ? "inset-0 sm:max-w-[300px]" : ""}`}>
        <motion.div
          animate={controls}
          className={`sm:max-w-[300px] bg-white ${
            active ? "px-4" : "!hidden sm:!block px-2"
          } animate duration-300 border-r border-gray-300 relative flex flex-col py-5 min-h-[100svh]`}
        >
          {active && (
            <BsFillArrowLeftSquareFill
              onClick={showLess}
              className="absolute text-2xl text-black bg-white cursor-pointer -right-4 top-5"
            />
          )}
          {!active && (
            <BsFillArrowRightSquareFill
              onClick={showMore}
              className="absolute text-2xl text-black bg-white cursor-pointer -right-4 top-5"
            />
          )}

          <div
            className={`${
              active &&
              "border-blue-700 border shadow-blue-700/35 shadow-lg rounded-lg px-4"
            }  h-[120px] flex justify-center flex-col mb-4`}
          >
            <motion.p animate={controlText} className="text-black text-md">
              ¿Tenés algún proyecto en mente?
            </motion.p>
            <Link
              target="_blank"
              href={"https://decaninileonardo.prismateweb.com"}
              className={`flex items-center justify-center w-full py-2 ${
                active && "pr-2"
              } my-2 font-bold text-white bg-blue-700 rounded-lg`}
            >
              <IoIosLink className="text-2xl mr-2" />
              <motion.p animate={controlText}>Trabajemos Juntos</motion.p>
            </Link>
          </div>

          <div className="grow">
            {data.map((group, index) => (
              <div key={index} className="py-2">
                <motion.p
                  animate={controlTitleText}
                  className="pb-2 pl-0 text-sm font-bold text-black"
                >
                  {group.name}
                </motion.p>

                {group.items.map((item, index2) => (
                  <div
                    key={index2}
                    className="flex px-2 py-1 cursor-pointer text-black hover:bg-blue-700 hover:!text-white rounded"
                  >
                    <item.icon className={`text-lg ${!active && "mx-auto"}`} />
                    <motion.p
                      animate={controlText}
                      className="ml-4 text-sm font-bold"
                    >
                      {" "}
                      {item.title}
                    </motion.p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div>
            {datafooter.map((group, index) => (
              <div key={index} className="my-2">
                <motion.p
                  animate={controlTitleText}
                  className="mb-2 ml-4 text-sm font-bold text-black"
                >
                  {group.name}
                </motion.p>

                {group.items.map((item, index2) => (
                  <div
                    key={index2}
                    className={`flex ${
                      !active && "justify-center"
                    } px-2 py-1 cursor-pointer hover:bg-red-700 text-red-600 hover:!text-white rounded`}
                    onClick={() => signOut()}
                  >
                    <item.icon className="text-lg" />
                    <motion.p
                      animate={controlText}
                      className="ml-4 text-sm font-bold"
                    >
                      {" "}
                      {item.title}
                    </motion.p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
