import "dotenv/config";

import inquirer from "inquirer";
import chalk from "chalk";
import bcrypt from "bcrypt";

import { connectDB } from "../src/database/connection";
import Cliente from "../src/database/models/cliente";

async function createCliente() {
  try {
    // Conectar a MongoDB
    await connectDB();

    console.log(chalk.yellow("=== Crear Cliente ==="));

    // ===============================
    // Preguntas
    // ===============================

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "nombre",
        message: "Nombre:",
      },
      {
        type: "input",
        name: "apellido",
        message: "Apellido:",
      },
      {
        type: "input",
        name: "direccion",
        message: "Dirección:",
      },
      {
        type: "number",
        name: "celular",
        message: "Celular:",
      },
      {
        type: "password",
        name: "password",
        message: "Contraseña:",
        mask: "*",
      },
    ]);

    // ===============================
    // Verificar si ya existe
    // ===============================

    const existe = await Cliente.findOne({
      nombre: answers.nombre,
    });

    if (existe) {
      console.log(
        chalk.red("❌ Ya existe un cliente con ese nombre.")
      );
      process.exit(1);
    }

    // ===============================
    // Encriptar contraseña
    // ===============================

    const hashedPassword = await bcrypt.hash(
      answers.password,
      10
    );

    // ===============================
    // Crear cliente
    // ===============================

    const cliente = await Cliente.create({
      nombre: answers.nombre,
      apellido: answers.apellido,
      direccion: answers.direccion,
      celular: answers.celular,
      password: hashedPassword,
    });

    console.log(
      chalk.green(
        `✅ Cliente creado correctamente: ${cliente.nombre}`
      )
    );

    process.exit(0);
  } catch (error) {
    console.error(
      chalk.red("❌ Error al crear el cliente"),
      error
    );

    process.exit(1);
  }
}

createCliente();