import { Schema, model } from "mongoose";

export const ESTADOS_CUOTA = [
  "PENDIENTE",
  "PAGADA",
] as const;

const CuotaMensualSchema = new Schema(
  {
    prestamo: {
      type: Schema.Types.ObjectId,
      ref: "Prestamo",
      required: true,
    },

    numero_cuota: {
      type: Number,
      required: true,
    },

    fecha_final: {
      type: Date,
      required: true,
    },

    monto_cuota: {
      type: Number,
      required: true,
    },

    estado: {
      type: String,
      enum: ESTADOS_CUOTA,
      default: "PENDIENTE",
    },
  },
  {
    timestamps: true,
  }
);

export default model("CuotaMensual", CuotaMensualSchema);