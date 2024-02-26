"use client";
import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import FormTask from "@/components/Tasks/FormTask";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskCard from "@/components/home/TaskCard";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useVariables } from "@/context/Variables";
import { toast } from "sonner";

interface Task {
  title: string;
  description: string;
  date: string;
  status: string;
}

const ListadoTareas = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { cambio, setCambio } = useVariables();

  const { user } = useUser();

  const fetchTasks = async () => {
    try {
      if (user && user._id) {
        const TaskResponse = await axios.get(`/api/tasks/${user._id}`);

        console.log(TaskResponse.data);
        setTasks(TaskResponse.data);
        setCambio(false);
      }
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  const deleteTask = async (id: any) => {
    try {
      console.log(id)
      const TaskResponse = await axios.delete(`/api/tasks/${user._id}/${id}`);
      toast.success("Tarea eliminada correctamente.");
      setCambio(true);
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    }
  };

  const statusTask = async (id: any, newStatus: string) => {
    try {
      const TaskResponse = await axios.put(`/api/tasks/${user._id}/${id}`, {
        status: newStatus,
      });
      toast.success("Tarea actualizada correctamente.");
      setCambio(true);
    } catch (error) {
      console.error("Error al actualizar la tarea", error);
    }
  };

  useEffect(() => {
    if (cambio) fetchTasks();
  }, [cambio, fetchTasks]);

  return (
    <div className="p-2 pl-4 md:p-10">
      <div className="pb-10 w-full flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Task</h2>
          <div className="h-0.5 rounded-full bg-blue-700 w-16"></div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <CiCirclePlus className="text-blue-700 font-bold text-4xl" />
          </DialogTrigger>
          <DialogContent className="w-full max-w-xl">
            <DialogHeader>
              <DialogTitle>Crear una tarea nueva.</DialogTitle>
              <FormTask setOpen={setOpen} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        {tasks.map((task: any, index: any) => (
          <TaskCard statusTask={statusTask} deleteTask={deleteTask} key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ListadoTareas;
