import { Schema, model } from "mongoose";

const PagoSchema = new Schema(
  {
    cuota: {
      type: Schema.Types.ObjectId,
      ref: "CuotaMensual",
      required: true,
    },

    fecha_pago: {
      type: Date,
      required: true,
    },

    fecha_pagado: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Pago", PagoSchema);