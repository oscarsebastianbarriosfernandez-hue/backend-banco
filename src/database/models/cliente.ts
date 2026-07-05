import { Schema, model } from "mongoose";

const ClienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export default model("Cliente", ClienteSchema);