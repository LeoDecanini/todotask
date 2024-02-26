import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Task from "@/models/task";

export async function GET(request: NextRequest, { params }: Params) {
  connectDB();

  try {
    const taskFound = await Task.findById(params.id);
    console.log(taskFound);

    if (!taskFound) {
      return NextResponse.json(new Error(`Tarea ${params.id} no encontrada`), {
        status: 404,
      });
    }

    return NextResponse.json(taskFound);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al obtener la tarea" });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  connectDB();

  try {
    const { title, description, date, status } = await request.json();

    const updatedTask = await Task.findByIdAndUpdate(params.id, {
      title,
      description,
      date,
      status,
    }, { new: true });

    if (!updatedTask) {
      return NextResponse.json(new Error(`Tarea ${params.id} no encontrada`), {
        status: 404,
      });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al actualizar la tarea" });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  connectDB();

  try {
    const deletedTask = await Task.findByIdAndDelete(params.id);

    if (!deletedTask) {
      return NextResponse.json(new Error(`Tarea ${params.id} no encontrada`), {
        status: 404,
      });
    }

    return NextResponse.json({ message: `Tarea ${params.id} eliminada` });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al eliminar la tarea" });
  }
}
