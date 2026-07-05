import { Schema, model } from "mongoose";

const ClienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },

    apellido: {
      type: String,
      required: true,
    },

    direccion: {
      type: String,
      required: true,
    },

    celular: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Cliente", ClienteSchema);