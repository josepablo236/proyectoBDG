export interface User {
  usuario: string;
  password: string;
  img?: string;
  estado?: string;
  rol: string;
  nombre: string;
  direccion: string;
  nacimiento: string;
  telefono: string;
}

export interface Cuenta {
  numeroCuenta: string;
  id?: string;
  usuario: string;
  saldo: number;
  estado: string;
  tipo: string;
}

export interface Favorito {
  id: string;
  numeroCuenta: string;
  usuario: string;
  usuarioCuenta: string;
  estado: string;
  tipo: string;
}

export interface Transferencia {
  id: string;
  remitente: string;
  destinatario: string;
  cantidad: number;
  fecha: string;
  cuentaRemi: string;
  cuentaDest: string;
  descripcion: string;
}
