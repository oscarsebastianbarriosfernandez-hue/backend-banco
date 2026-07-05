export default class ClienteResource {
  private cliente: any;

  constructor(cliente: any) {
    this.cliente = cliente;
  }

  item() {
    return {
      id: this.cliente._id,

      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido,
      direccion: this.cliente.direccion,
      celular: this.cliente.celular,

      createdAt: this.cliente.createdAt,
      updatedAt: this.cliente.updatedAt,
    };
  }
}