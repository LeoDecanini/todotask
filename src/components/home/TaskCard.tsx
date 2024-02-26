"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { buttonVariants } from "../ui/button";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormTask from "../Tasks/FormTask";
import { useRouter } from "next/navigation";
import { useVariables } from "@/context/Variables";

const TaskCard = ({ task, deleteTask, statusTask }: any) => {
  const [open2, setOpen2] = useState(false);
  const { setEditing, setTaskId } = useVariables();
  const route = useRouter();

  const toggleStatus = () => {
    const newStatus = task.status === "Pendiente" ? "Completado" : "Pendiente";
    statusTask(task._id, newStatus);
  };

  return (
    <div
      className={`bg-white border-2 ${
        task.status === "Pendiente" ? "border-red-400" : "border-green-400"
      } group text-left hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between text-gray-800 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] max-h-[300px] rounded-xl p-5`}
    >
      <div>
        <h3 className="text-2xl font-bold break-all">{task.title}</h3>
        <div className="relative">
          <div className="absolute w-full h-full bg-gradient-to-t group-hover:from-slate-50 from-white via-transparent"></div>
          <p className="max-h-24 overflow-hidden">{task.description}</p>
        </div>
      </div>
      <div>
        <p className="pt-5 font-bold">{task.date}</p>
        <div className="pt-5 flex justify-between items-center">
          <Button
            className={` ${
              task.status === "Pendiente" ? "bg-red-400" : "bg-green-400"
            } !rounded-full text-white font-bold !px-10`}
            onClick={toggleStatus}
          >
            {task.status}
          </Button>
          <div className="flex gap-4 text-3xl">
            <Dialog
              open={open2}
              onOpenChange={(isOpen: any) => {
                setOpen2(isOpen);
                setEditing(true);
                setTaskId(task._id);
              }}
            >
              <DialogTrigger className="text-left">
                <TbEdit />
              </DialogTrigger>
              <DialogContent className="w-full max-w-xl text-left">
                <DialogHeader>
                  <FormTask task={task} setOpen2={setOpen2} />
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <MdDeleteOutline
              className="cursor-pointer"
              onClick={() => deleteTask(task._id)}  
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
