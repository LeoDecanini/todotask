import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { toast } from "sonner";

interface Task {
  title: string;
  description: string;
  date: string;
  status: string;
  userid: string;
}

interface VariablesType {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  taskId: string;
  setTaskId: Dispatch<SetStateAction<string>>;
  cambio: boolean;
  setCambio: Dispatch<SetStateAction<boolean>>;
}

const Variables = createContext<VariablesType | undefined>(undefined);

interface VariablesProviderProps {
  children: ReactNode;
}

export const VariablesProvider: FC<VariablesProviderProps> = ({ children }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const [cambio, setCambio] = useState<boolean>(true);


  return (
    <Variables.Provider
      value={{
        editing,
        setEditing,
        taskId,
        setTaskId,
        cambio,
        setCambio,
      }}
    >
      {children}
    </Variables.Provider>
  );
};

export const useVariables = () => {
  const context = useContext(Variables);
  if (!context) {
    throw new Error(
      "useVariables debe ser usado dentro de un VariablesProvider"
    );
  }
  return context;
};
