"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useVariables } from "@/context/Variables";
import { useUser } from "@/context/UserContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "El Titulo debe tener como minimo 2 caracteres",
    })
    .max(50, {
      message: "El Titulo debe tener como maximo 50 caracteres",
    }),
  description: z.string().max(200, {
    message: "La descripcion debe tener como maximo 200 caracteres",
  }),
});

type InputFieldType = {
  title: string;
  description: string;
};

const FormTask = ({ setOpen, task, setOpen2 }: any) => {
  const { editing, taskId, setCambio, setEditing, setTaskId } = useVariables();
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFieldType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(editing, taskId);
    try {
      if (editing) {
        const TaskResponse = await axios.put(
          `/api/tasks/${user._id}/${taskId}`,
          {
            title: values.title,
            description: values.description,
            userid: user._id,
          }
        );
        setOpen2(false);
        setCambio(true);
        setEditing(false);
        setTaskId("");
        console.log(TaskResponse);
        toast.success("Tarea editada correctamente.");
        console.log("editando");
      } else {
        const TaskResponse = await axios.post(`/api/tasks/${user._id}`, {
          title: values.title,
          description: values.description,
        });
        setOpen(false);
        setCambio(true);
        console.log(TaskResponse);
        toast.success("Tarea creada correctamente.");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error);
        toast.error("Error desconosido al crear tarea.");
      }
    }
  }

  const fields = [
    { name: "title", label: "Titulo", colSpan: "col-span-2", type: "text" },
    {
      name: "description",
      label: "Description",
      colSpan: "col-span-2",
      type: "textarea",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" bg-white rounded w-full max-w-xl"
      >
        <div className="max-w-3xl grid gap-y-2 gap-x-4 grid-cols-2 py-4">
          {fields.map((fieldInfo: any) => (
            <div key={fieldInfo.name} className={`${fieldInfo.colSpan}`}>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name={fieldInfo.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-lg font-bold"
                        htmlFor={fieldInfo.name}
                      >
                        {fieldInfo.label}
                      </FormLabel>
                      <FormControl>
                        {fieldInfo.type === "textarea" ? (
                          <textarea
                            className=" p-1 h-40 border rounded resize-none w-full bg-gray-50 focus-visible:outline-blue-700 focus-visible:ring-0 ring-offset-blue-700"
                            id={fieldInfo.name}
                            {...field}
                          />
                        ) : (
                          <Input
                            className="py-6 bg-gray-50 focus-visible:outline-blue-700 focus-visible:ring-0 ring-offset-blue-700"
                            id={fieldInfo.name}
                            type={fieldInfo.type}
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex sm:justify-start justify-center">
          <Button type="submit" className="py-6 px-10 bg-blue-700">
            Crear tarea
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormTask;
