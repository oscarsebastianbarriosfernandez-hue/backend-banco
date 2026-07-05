import Cliente from "../database/models/cliente";
import bcrypt from "bcrypt";

export default class ClienteRepository {

  async getById(id: string) {
    return await Cliente.findById(id);
  }

  async getAuthByNombre(nombre: string) {
    return await Cliente.findOne({ nombre }).select("+password");
  }

  async comparePassword(plain: string, hash: string) {
    return await bcrypt.compare(plain, hash);
  }

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await Cliente.create({
      ...data,
      password: hashedPassword,
    });
  }
}