export interface User {
    user: string;
    password: string;
    rol: string;
    nombre: string;
    direccion: string;
    nacimiento: Date;
    telefono: string;
}

export interface CuentaMonetaria {
    numeroCuenta: number;
    user: string;//User;
    saldo: number;
    estado: boolean;
}

export interface CuentaAhorro {
    numeroCuenta: number;
    user: string;//User;
    saldo: number;
    estado: boolean;
}

export interface Transferencia {
    idTransfer: number;
    destinatario: string;//User;
    remitente: string;//User;
    cantidad: number;
    fecha: Date;
}
