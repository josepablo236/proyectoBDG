import { Injectable } from '@angular/core';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { User, Cuenta, Transferencia, Favorito } from '../interfaces/interfaces';

const urlAPI = 'https://091gij42xe.execute-api.us-east-2.amazonaws.com/proyecto';

@Injectable({
  providedIn: 'root'
})

export class DynamoDBService {

  usuario: User;
  isAdmin: boolean;
  currentUser: string;
  constructor() {
  }

  //Login
  async getUser(user: string, password: string){
    const url = urlAPI + `/user?usuario=${user}`;
    const res = await axios.get(url);
    if(res.data){
      this.usuario = res.data;
      const pass = String(this.usuario.password);
      // Decrypt
      const bytes  = CryptoJS.AES.decrypt(pass, 'secret key 123');
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if(password === originalText)
      {
        this.isAdmin = false;
        this.currentUser = user;
          if(this.usuario.rol === 'admin'){
            this.isAdmin = true;
            return 'admin';
          }
          else{
            if (this.usuario.estado === 'activa') {
              return 'user';
            }else{
              return 'Cuenta bloqueada';
            }
          }
      }
      else{
          return 'Contraseña incorrecta';
      }
    }
    else{
      return 'Usuario no encontrado';
    }
  }

  //Traer datos de un usuario
  async getUserData(usuario: string){
    const query = `/user?usuario=${usuario}`;
    return this.getQuery<User>(query);
  }

  //Función para crear usuarios
  async createUser(usuario: User){
    const url = urlAPI + '/user';
    await axios.post(url, usuario);
    return true;
  }

  //Función para modificar contraseña
  modifyPass(user: string, _updateKey: string, _updateValue: string){
    const request = {
      usuario: user,
      updateKey: _updateKey,
      updateValue: _updateValue
    };
    const url = '/user';
    return this.updateQuery(url, request);
  }

  //Función para modificar foto
  modifyImg(user: string, _updateKey: string, _updateValue: any){
    const request = {
      usuario: user,
      updateKey: _updateKey,
      updateValue: _updateValue
    };
    const url = '/user';
    return this.updateQuery(url, request);
  }

  //Funcion para traer todos los usuarios
  getUsers(){
    return this.getQuery<User[]>('/users');
  }

  //Función para eliminar usuario
  async deleteUser(_usuario: string){
    const query = `/user?usuario=${_usuario}`;
    return this.deleteQuery(query);
  }

  //Funcion para crear cuenta monetaria
  async createMonetary(cuenta: Cuenta){
    console.log(cuenta);
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
  modifyMonetary(_usuario: string, _updateKey: string, _updateValue: string){
    const request = {
      usuario: _usuario,
      updateKey: _updateKey,
      updateValue: _updateValue
    };
    const url = '/monetary-account';
    return this.updateQuery(url, request);
  }

  //Función para eliminar cuenta monetaria
  async deleteMonetary(_usuario: string){
    const query = `/monetary-account?usuario=${_usuario}`;
    return this.deleteQuery(query);
  }

  //Funcion para crear cuenta ahorros
  async createAccount(cuenta: Cuenta){
    console.log(cuenta);
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
  modifyAccount(cuenta: string, _updateKey: string, _updateValue: string){
    const request = {
      numeroCuenta: cuenta,
      updateKey: _updateKey,
      updateValue: _updateValue
    };
    const url = '/savings-account';
    return this.updateQuery(url, request);
  }

  //Función para eliminar cuenta ahorro
  async deleteAccount(cuenta: string){    
    const query = `/savings-account?numeroCuenta=${cuenta}`;
    return this.deleteQuery(query);
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

  //Función para traer transferencias por usuario (como remitente y destinatario)
  async getUserTrans(usuario: string){
    const query = `/utransferencias?usuario=${usuario}`;
    return this.getQuery<Transferencia[]>(query);
  }

  //Función para traer transferencia con id
  async getTrans(id: string){
    const query = `/transferencia?id=${id}`;
    return this.getQuery<Transferencia>(query);
  }

  //Funcion para crear cuenta ahorros
  async createFavorite(cuenta: Favorito){
    const url = urlAPI + '/favorite';
    await axios.post(url, cuenta);
    return true;
  }

  //Función para traer cuentas ahorros por usuario
  async getUserFavorites(usuario: string){
    const query = `/user-favorites?usuario=${usuario}`;
    return this.getQuery<Cuenta[]>(query);
  }

  //Función para traer cuenta ahorro con numero de cuenta
  async getFavorite(numCuenta: string){
    const query = `/favorite?numeroCuenta=${numCuenta}`;
    return this.getQuery<Cuenta>(query);
  }

  //Función para eliminar de favoritos
  async deleteFavorite(cuenta: string){
    const request = {
      numeroCuenta: cuenta
    };
    const url = urlAPI + '/favorite';
    return this.deleteQuery(url);
  }

  //Metodo para get
  private async getQuery<T>(query: string){
    query = urlAPI + query;
    return await axios.get<T>(query);
  }

  //Metodo para update
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

  //Metodo para delete
  private async deleteQuery(query: string){
    let success: boolean;
    const url = urlAPI + query;
    await axios.delete(url).then(resp =>{
      if(resp.status === 200){
        success = true;
      }
      else{
        success = false;
      }
    });
    return success;
  }
}
