import { Strategy } from "passport-local";
import ClienteRepository from "../repositories/UsuarioRepository";
import ApiError from "../errors/ApiError";
import ClienteResource from "../resources/UsuarioResource";

const localStrategy = new Strategy(
  {
    usernameField: "nombre",
    passwordField: "password",
    session: false,
  },
  async (nombre: string, password: string, done) => {
    try {
      const repository = new ClienteRepository();

      const cliente = await repository.getAuthByNombre(nombre);

      if (!cliente || !cliente.password) {
        throw new ApiError({
          name: "UNAUTHORIZED_ERROR",
          message: "Credenciales incorrectas",
          code: "ERR_UNAUTH",
          status: 401,
        });
      }

      const match = await repository.comparePassword(
        password,
        cliente.password
      );

      if (!match) {
        throw new ApiError({
          name: "UNAUTHORIZED_ERROR",
          message: "Credenciales incorrectas",
          code: "ERR_UNAUTH",
          status: 401,
        });
      }

      const resource = new ClienteResource(cliente);

      return done(null, resource.item());
    } catch (error) {
      return done(error);
    }
  }
);

export default localStrategy;