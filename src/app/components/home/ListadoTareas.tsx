import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import FormTask from "../Tasks/FormTask";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskCard from "./TaskCard";
import { useVariables } from "@/context/Variables";

interface Task {
  title: string;
  description: string;
  date: string;
  status: string;
}

interface ListadoTareasProps {
  tasks: Task[];
}

const ListadoTareas: React.FC<ListadoTareasProps> = ({ tasks }) => {
  const [open, setOpen] = useState(false);
  const { filter } = useVariables();

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completado") {
      return task.status === "Completado";
    } else if (filter === "Pendiente") {
      return task.status === "Pendiente";
    }
    return true;
  });

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
        {filteredTasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ListadoTareas;
