import { Schema, model } from "mongoose";

export const ESTADOS_PRESTAMO = [
  "PENDIENTE",
  "ACTIVO",
  "FINALIZADO",
] as const;

const PrestamoSchema = new Schema(
  {
    cliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },

    monto_prestado: {
      type: Number,
      required: true,
    },

    plazo: {
      type: String,
      required: true,
    },

    estado: {
      type: String,
      enum: ESTADOS_PRESTAMO,
      default: "ACTIVO",
    },

    tasa_interes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Prestamo", PrestamoSchema);