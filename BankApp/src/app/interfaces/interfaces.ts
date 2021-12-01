export interface User {
    usuario: string;
    password: string;
    rol: string;
    nombre: string;
    direccion: string;
    nacimiento: Date;
    telefono: string;
}

export interface Cuenta {
    numeroCuenta: string;
    usuario: string;
    saldo: number;
    estado: string;
}

export interface Transferencia {
    id: string;
    remitente: string;
    destinatario: string;
    cantidad: number;
    fecha: Date;
}
