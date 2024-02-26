import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "El título es requerido"]
  },
  description: {
    type: String,
    required: [true, "La descripción es requerida"]
  },
  date: {
    type: Date,
    required: [true, "La fecha es requerida"]
  },
  status: {
    type: String,
    required: [true, "El estado es requerido"]
  }
  ,
  userid: {
    type: String,
    required: [true, "El userid es requerido"]
  }
});

const Task = models.Task || model("Task", taskSchema);
export default Task;
