export interface User {
    user: string;
    password: string;
    rol: string;
    nombre: string;
    direccion: string;
    nacimiento: Date;
    telefono: string;
}

export interface Cuenta {
    numeroCuenta: string;
    user: string;
    saldo: number;
    estado: string;
}

export interface Transferencia {
    idTransfer: string;
    destinatario: string;
    remitente: string;
    cantidad: number;
    fecha: Date;
}
