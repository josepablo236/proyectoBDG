import { Injectable } from '@angular/core';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { User, Cuenta, Transferencia } from '../interfaces/interfaces';

const urlAPI = 'https://091gij42xe.execute-api.us-east-2.amazonaws.com/proyecto';

@Injectable({
  providedIn: 'root'
})

export class DynamoDBService {

  usuario: User;
  constructor() { }

  private getQuery<T>(query: string){
    query = urlAPI + query;
    return axios.get<T>(query);
  }

  private async updateQuery(query: string, body: any){
    query = urlAPI + query;
    let success: boolean;
    await axios.put(query, body).then(resp =>{
      if(resp.status === 200){
        success = true;
      }
      else{
        success = false;
      }
    });
    return success;
  }

  private async deleteQuery(query: string, body: any){
    query = urlAPI + query;
    let success: boolean;
    await axios.delete(query, body).then(resp =>{
      if(resp.status === 200){
        success = true;
      }
      else{
        success = false;
      }
    });
    return success;
  }

  //Login
  async getUser(user: string, password: string){
    const url = urlAPI + `/user?usuario=${user}`;
    let res = await axios.get(url);
    console.log(res.data);
    if(res.data){
      this.usuario = res.data;
      console.log(this.usuario);
      let pass = String(this.usuario.password);
      // Decrypt
      var bytes  = CryptoJS.AES.decrypt(pass, 'secret key 123');
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      console.log(password);
      console.log(originalText);
      if(password === originalText)
      {
          if(this.usuario.rol === "admin"){
            return "admin"
          }
          else{
            return 'user';
          }
      }
      else{
          return "Contraseña incorrecta";
      }
    }
    else{
      return "Usuario no encontrado";
    }
  }

  //Función para crear usuarios
  async createUser(usuario: User){
    const url = urlAPI + '/user';
    await axios.post(url, usuario);
    return true;
  }

  //Funcion para traer todos los usuarios
  getUsers(){
    return this.getQuery<User[]>('/users');
  }

  //Función para eliminar usuario
  async deleteUser(usuario: string){
    const request = {
      usuario: usuario
    };
    const url = urlAPI + '/user';
    return this.deleteQuery(url, request);
  }

  //Funcion para crear cuenta monetaria
  async createMonetary(cuenta: Cuenta){
    const url = urlAPI + '/monetary-account';
    await axios.post(url, cuenta);
    return true;
  }

  //Funcion para traer todas las cuentas monetarias (admin)
  getMonetaryAcounts(){
    return this.getQuery<Cuenta[]>('/monetary-accounts');
  }

  //Función para traer cuenta monetaria con nombre de usuario
  async getMonetary(usuario: string){
    const query = `/monetary-account?usuario=${usuario}`;
    return this.getQuery<Cuenta>(query);
  }

  //Función para traer cuenta monetaria con numero de cuenta
  async getNumMonetary(numCuenta: string){
    const query = `/num-account?numeroCuenta=${numCuenta}`;
    return this.getQuery(query);
  }

  //Función para modificar saldo de la cuenta monetaria
  modifyMonetary(usuario: string, updateKey: string, updateValue: string){
    const request = {
      usuario: usuario,
      updateKey: updateKey,
      updateValue: updateValue
    };
    const url = '/monetary-account';
    return this.updateQuery(url, request);
  }

  //Función para eliminar cuenta monetaria
  async deleteMonetary(usuario: string){
    const request = {
      usuario: usuario
    };
    const url = urlAPI + '/monetary-account';
    return this.deleteQuery(url, request);
  }

  //Funcion para crear cuenta ahorros
  async createAccount(cuenta: Cuenta){
    const url = urlAPI + '/savings-account';
    await axios.post(url, cuenta);
    return true;
  }

  //Funcion para traer todas las cuentas ahorros (admin)
  getAcounts(){
    return this.getQuery<Cuenta[]>('/savings-accounts');
  }

  //Función para traer cuentas ahorros por usuario
  async getUserAccounts(usuario: string){
    const query = `/user-accounts?usuario=${usuario}`;
    return this.getQuery<Cuenta[]>(query);
  }

  //Función para traer cuenta ahorro con numero de cuenta
  async getAccount(numCuenta: string){
    const query = `/savings-account?numeroCuenta=${numCuenta}`;
    return this.getQuery<Cuenta>(query);
  }

  //Función para modificar saldo de la cuenta ahorro
  modifyAccount(cuenta: string, updateKey: string, updateValue: string){
    const request = {
      numeroCuenta: cuenta,
      updateKey: updateKey,
      updateValue: updateValue
    };
    const url = '/savings-account';
    return this.updateQuery(url, request);
  }

  //Función para eliminar cuenta ahorro
  async deleteAccount(cuenta: string){
    const request = {
      numeroCuenta: cuenta
    };
    const url = urlAPI + '/savings-account';
    return this.deleteQuery(url, request);
  }


  //Funcion para crear transferencia
  async createTrans(trans: Transferencia){
    const url = urlAPI + '/transferencia';
    await axios.post(url, trans);
    return true;
  }

  //Funcion para traer todas las transferencias (admin)
  getTransfers(){
    return this.getQuery<Transferencia[]>('/transferencias');
  }

  //Función para traer transferencias por usuario
  async getUserTrans(emisor: string){
    const query = `/utransferencias?emisor=${emisor}`;
    return this.getQuery<Transferencia[]>(query);
  }

  //Función para traer transferencia con id
  async getTrans(id: string){
    const query = `/transferencia?id=${id}`;
    return this.getQuery<Transferencia>(query);
  }

}
