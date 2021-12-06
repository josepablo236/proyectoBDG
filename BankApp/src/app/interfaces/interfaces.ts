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
