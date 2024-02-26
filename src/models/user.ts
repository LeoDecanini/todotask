import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    minLength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxLength: [50, "El nombre debe tener como máximo 50 caracteres"],
  },
  email: {
    type: String,
    required: [true, "El email es requerido"],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor, introduce un email válido",
    ],
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
    minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
    select: false,
  },
});

const User = models.User || model("User", userSchema);
export default User;