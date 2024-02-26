import { NextResponse, NextRequest } from "next/server";
import Task from "@/models/task";
import { connectDB } from "@/lib/mongoose";

export async function GET(request: NextRequest, { params }: any) {
  connectDB();
  try {
    const userid = params.userid;
    const tasks = await Task.find({ userid });
    console.log(tasks);

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al obtener las tareas" });
  }
}

export async function POST(request: NextRequest, { params }: any) {
  try {
    const { title, description } = await request.json();

    const userid = params.userid;

    console.log({ userid, title, description });

    const taskSaved = await Task.create({
      title,
      description,
      date: new Date(),
      status: "Pendiente",
      userid,
    });

    return NextResponse.json(taskSaved);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al obtener las tareas" });
  }
}
