(self.webpackChunkBankApp=self.webpackChunkBankApp||[]).push([[623],{1150:(t,e,n)=>{"use strict";var i;n.d(e,{Z:()=>d});var r=new Uint8Array(16);function a(){if(!i&&!(i="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return i(r)}const s=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,o=function(t){return"string"==typeof t&&s.test(t)};for(var u=[],c=0;c<256;++c)u.push((c+256).toString(16).substr(1));const d=function(t,e,n){var i=(t=t||{}).random||(t.rng||a)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e){n=n||0;for(var r=0;r<16;++r)e[n+r]=i[r];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(u[t[e+0]]+u[t[e+1]]+u[t[e+2]]+u[t[e+3]]+"-"+u[t[e+4]]+u[t[e+5]]+"-"+u[t[e+6]]+u[t[e+7]]+"-"+u[t[e+8]]+u[t[e+9]]+"-"+u[t[e+10]]+u[t[e+11]]+u[t[e+12]]+u[t[e+13]]+u[t[e+14]]+u[t[e+15]]).toLowerCase();if(!o(n))throw TypeError("Stringified UUID is invalid");return n}(i)}},6603:(t,e,n)=>{"use strict";n.d(e,{w:()=>o});var i=n(3606),r=n(6274);function a(t,e){if(1&t&&(i.TgZ(0,"p",2),i._uU(1),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Oqu(t.message)}}function s(t,e){if(1&t&&(i.TgZ(0,"p",3),i._uU(1),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Oqu(t.message)}}let o=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-alert"]],inputs:{message:"message",error:"error"},decls:2,vars:2,consts:[["class","alert alert-danger",4,"ngIf"],["class","alert alert-success",4,"ngIf"],[1,"alert","alert-danger"],[1,"alert","alert-success"]],template:function(t,e){1&t&&(i.YNc(0,a,2,1,"p",0),i.YNc(1,s,2,1,"p",1)),2&t&&(i.Q6J("ngIf",e.error),i.xp6(1),i.Q6J("ngIf",!e.error))},directives:[r.O5],styles:[""]}),t})()},9258:(t,e,n)=>{"use strict";n.d(e,{K:()=>o});var i=n(6274),r=n(5401),a=n(4988),s=n(3606);let o=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[i.ez,r.Pc,a.u5]]}),t})()},3059:(t,e,n)=>{"use strict";n.d(e,{f:()=>l});var i=n(1855),r=n(3606),a=n(5401),s=n(5264),o=n(6274);function u(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"ion-header"),r.TgZ(1,"ion-toolbar"),r.TgZ(2,"ion-buttons",1),r.TgZ(3,"ion-button",2),r.NdJ("click",function(){return r.CHM(t),r.oxw().regresar()}),r._UZ(4,"ion-icon",3),r.TgZ(5,"ion-label"),r._uU(6,"Regresar"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()}}function c(t,e){if(1&t&&(r.TgZ(0,"ion-list",5),r.TgZ(1,"ion-card"),r.TgZ(2,"ion-card-header"),r.TgZ(3,"ion-card-subtitle"),r._uU(4),r.qZA(),r.TgZ(5,"ion-card-title"),r._uU(6),r.qZA(),r.qZA(),r.TgZ(7,"ion-card-content"),r.TgZ(8,"p"),r._uU(9),r.qZA(),r.TgZ(10,"p"),r._uU(11),r.qZA(),r.TgZ(12,"p"),r._uU(13),r.qZA(),r.TgZ(14,"ion-item"),r.TgZ(15,"ion-label"),r._uU(16,"Cantidad: "),r.qZA(),r.TgZ(17,"span",6),r._uU(18),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&t){const t=e.$implicit;r.xp6(4),r.Oqu(t.fecha),r.xp6(2),r.Oqu(t.id),r.xp6(3),r.Oqu(t.descripcion),r.xp6(2),r.AsE("Remitente: ",t.remitente," ",t.cuentaRemi," "),r.xp6(2),r.AsE("Destinatario: ",t.destinatario," ",t.cuentaDest,""),r.xp6(5),r.hij("Q ",t.cantidad,"")}}function d(t,e){if(1&t&&(r.TgZ(0,"div"),r.YNc(1,c,19,8,"ion-list",4),r.qZA()),2&t){const t=r.oxw();r.xp6(1),r.Q6J("ngForOf",t.transferencias)}}let l=(()=>{class t{constructor(t,e){this.modalController=t,this.storage=e,this.currentUser={usuario:void 0,isAdmin:!1},this.init()}init(){return(0,i.mG)(this,void 0,void 0,function*(){this.currentUser=yield this.storage.getCurrentUser()})}ionViewWillEnter(){return(0,i.mG)(this,void 0,void 0,function*(){yield this.init()})}regresar(){this.modalController.dismiss()}}return t.\u0275fac=function(e){return new(e||t)(r.Y36(a.IN),r.Y36(s.q))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-historial-transacciones"]],inputs:{transferencias:"transferencias",numeroCuenta:"numeroCuenta",isAdmin:"isAdmin",menu:"menu"},decls:3,vars:2,consts:[[4,"ngIf"],["slot","start"],["slot","start","color","primary",3,"click"],["slot","start","name","arrow-back-circle-outline"],["lines","none",4,"ngFor","ngForOf"],["lines","none"],["slot","end"]],template:function(t,e){1&t&&(r.YNc(0,u,7,0,"ion-header",0),r.TgZ(1,"ion-content"),r.YNc(2,d,2,1,"div",0),r.qZA()),2&t&&(r.Q6J("ngIf",e.menu),r.xp6(2),r.Q6J("ngIf",void 0!==e.transferencias&&void 0!==e.currentUser.usuario))},directives:[o.O5,a.W2,a.Gu,a.sr,a.Sm,a.YG,a.gu,a.Q$,o.sg,a.q_,a.PM,a.Zi,a.tO,a.gZ,a.FN,a.Ie],styles:[".text[_ngcontent-%COMP%]{height:100%;text-align:center}.center-div[_ngcontent-%COMP%]{display:flex;height:100%;width:100%;align-items:center;justify-content:center}"]}),t})()},4419:(t,e,n)=>{"use strict";n.d(e,{t:()=>A});var i=n(1855),r=n(1150),a=n(6274),s=n(3606),o=n(7104),u=n(5401),c=n(4988),d=n(6603);function l(t,e){if(1&t&&s._UZ(0,"app-alert",19),2&t){const t=s.oxw(2);s.Q6J("message",t.message)("error",t.error)}}function g(t,e){if(1&t&&(s.TgZ(0,"ion-list"),s.TgZ(1,"ion-select-option",20),s._uU(2),s.qZA(),s.qZA()),2&t){const t=e.$implicit;s.xp6(1),s.Q6J("value",t.numeroCuenta),s.xp6(1),s.hij("",t.numeroCuenta," ")}}function m(t,e){if(1&t){const t=s.EpF();s.TgZ(0,"ion-item"),s.TgZ(1,"ion-label"),s._uU(2,"Cuenta a creditar"),s.qZA(),s.TgZ(3,"ion-input",21),s.NdJ("ionChange",function(e){return s.CHM(t),s.oxw(2).getuser(e,"destinatario")}),s.qZA(),s.TgZ(4,"ion-button",22),s.NdJ("click",function(){return s.CHM(t),s.oxw(2).editCuentaDest=!0}),s._UZ(5,"ion-icon",23),s.qZA(),s.qZA()}if(2&t){const t=s.oxw(2);s.xp6(3),s.Q6J("clearInput",!0)("value",t.transferencia.cuentaDest)}}function h(t,e){if(1&t&&(s.TgZ(0,"ion-list"),s.TgZ(1,"ion-select-option",20),s._uU(2),s.qZA(),s.qZA()),2&t){const t=e.$implicit;s.xp6(1),s.Q6J("value",t.numeroCuenta),s.xp6(1),s.Oqu(t.numeroCuenta)}}function f(t,e){if(1&t){const t=s.EpF();s.TgZ(0,"ion-item"),s.TgZ(1,"ion-label"),s._uU(2,"Cuenta a acreditar"),s.qZA(),s.TgZ(3,"ion-select",24),s.NdJ("ionChange",function(e){return s.CHM(t),s.oxw(2).getuser(e,"destinatario")}),s.YNc(4,h,3,2,"ion-list",10),s.qZA(),s.TgZ(5,"ion-button",22),s.NdJ("click",function(){return s.CHM(t),s.oxw(2).editCuentaDest=!1}),s._UZ(6,"ion-icon",23),s.qZA(),s.qZA()}if(2&t){const t=s.oxw(2);s.xp6(4),s.Q6J("ngForOf",t.cuentasFav)}}function p(t,e){if(1&t){const t=s.EpF();s.TgZ(0,"div",4),s.TgZ(1,"h1",5),s._uU(2,"Transferir"),s.qZA(),s._UZ(3,"img",6),s.TgZ(4,"form",7),s.NdJ("ngSubmit",function(){return s.CHM(t),s.oxw().onSubmit()}),s.TgZ(5,"ion-item-group"),s.YNc(6,l,1,2,"app-alert",8),s.TgZ(7,"ion-item"),s.TgZ(8,"ion-label"),s._uU(9,"Cuenta a debitar"),s.qZA(),s.TgZ(10,"ion-select",9),s.NdJ("ionChange",function(e){return s.CHM(t),s.oxw().getuser(e,"remitente")}),s.YNc(11,g,3,2,"ion-list",10),s.qZA(),s.qZA(),s.YNc(12,m,6,2,"ion-item",11),s.YNc(13,f,7,1,"ion-item",11),s.TgZ(14,"ion-item"),s.TgZ(15,"ion-label"),s._uU(16,"Usuario"),s.qZA(),s._UZ(17,"ion-input",12),s.qZA(),s.TgZ(18,"ion-item"),s.TgZ(19,"ion-label",13),s._uU(20,"Descripcion"),s.qZA(),s.TgZ(21,"ion-input",14),s.NdJ("ionChange",function(e){return s.CHM(t),s.oxw().setDescription(e)}),s.qZA(),s.qZA(),s.TgZ(22,"ion-item"),s.TgZ(23,"ion-label"),s._uU(24,"Cantidad"),s.qZA(),s.TgZ(25,"ion-input",15),s.NdJ("ionChange",function(e){return s.CHM(t),s.oxw().setCantidad(e)}),s.qZA(),s.qZA(),s.qZA(),s.TgZ(26,"ion-button",16),s._uU(27," Transferir "),s.qZA(),s.TgZ(28,"ion-button",17),s.NdJ("click",function(){return s.CHM(t),s.oxw().agregar=!0}),s._UZ(29,"ion-icon",18),s._uU(30," Agregar cuenta a favoritos "),s.qZA(),s.qZA(),s.qZA()}if(2&t){const t=s.oxw();s.xp6(6),s.Q6J("ngIf",t.alert),s.xp6(5),s.Q6J("ngForOf",t.cuentasUsuario),s.xp6(1),s.Q6J("ngIf",""!==t.numeroCuentaDest&&!t.editCuentaDest),s.xp6(1),s.Q6J("ngIf",""===t.numeroCuentaDest||t.editCuentaDest),s.xp6(4),s.Q6J("value",t.transferencia.destinatario)}}function Z(t,e){if(1&t&&s._UZ(0,"app-alert",19),2&t){const t=s.oxw(2);s.Q6J("message",t.message)("error",t.error)}}function v(t,e){if(1&t){const t=s.EpF();s.TgZ(0,"div",4),s.TgZ(1,"form",7),s.NdJ("ngSubmit",function(){return s.CHM(t),s.oxw().onSubmitNewFav()}),s.TgZ(2,"ion-item-group"),s.YNc(3,Z,1,2,"app-alert",8),s.TgZ(4,"ion-item"),s.TgZ(5,"ion-label",13),s._uU(6,"Numero de cuenta"),s.qZA(),s.TgZ(7,"ion-input",21),s.NdJ("ionChange",function(e){return s.CHM(t),s.oxw().getuser(e,"destinatario")}),s.qZA(),s.qZA(),s.TgZ(8,"ion-item"),s.TgZ(9,"ion-label"),s._uU(10,"Usuario"),s.qZA(),s._UZ(11,"ion-input",12),s.qZA(),s.qZA(),s.TgZ(12,"ion-buttons",25),s.TgZ(13,"ion-button",26),s.NdJ("click",function(){return s.CHM(t),s.oxw().cancelar()}),s._uU(14," Cancelar "),s.qZA(),s.TgZ(15,"ion-button",27),s._uU(16," Agregar "),s.qZA(),s.qZA(),s.qZA(),s.qZA()}if(2&t){const t=s.oxw();s.xp6(3),s.Q6J("ngIf",t.alert),s.xp6(4),s.Q6J("clearInput",!0)("value",t.transferencia.cuentaDest),s.xp6(4),s.Q6J("value",t.transferencia.destinatario)}}let A=(()=>{class t{constructor(t,e,n){this.db=t,this.toastController=e,this.modalController=n,this.alert=!1,this.error=!1,this.agregar=!1,this.editCuentaDest=!1,this.transferencia={id:(0,r.Z)().substring(0,8),remitente:"",destinatario:"",cuentaRemi:"",cuentaDest:"",descripcion:"",cantidad:0,fecha:null}}ngOnInit(){}regresar(){this.modalController.dismiss()}onSubmit(){return(0,i.mG)(this,void 0,void 0,function*(){return this.alert=!1,this.error=!1,""===this.transferencia.cuentaRemi||0===this.transferencia.cantidad||""===this.transferencia.descripcion?(this.alert=!0,this.error=!0,void(this.message="Llena todos los campos")):void 0===this.cuentaDestino.usuario?(this.alert=!0,this.error=!0,void(this.message="La cuenta destino no existe")):"inactiva"===this.cuentaDestino.estado?(this.alert=!0,this.error=!0,void(this.message="La cuenta destino est\xe1 bloqueada")):"inactiva"===this.cuentaEmisora.estado?(this.alert=!0,this.error=!0,void(this.message="La cuenta emisora est\xe1 bloqueada")):this.cuentaEmisora.numeroCuenta===this.transferencia.cuentaDest?(this.alert=!0,this.error=!0,void(this.message="La cuenta destino no puede ser la misma que la remitente")):Number(this.cuentaEmisora.saldo)<Number(this.transferencia.cantidad)?(this.alert=!0,this.error=!0,void(this.message="Saldo insuficiente para transferir")):void(this.error||(this.transferir(),setTimeout(()=>{this.regresar()},2e3)))})}onSubmitNewFav(){return(0,i.mG)(this,void 0,void 0,function*(){this.agregar=!1,this.alert=!1,this.error=!1,void 0===this.cuenta.usuario&&(this.alert=!0,this.error=!0,this.message="La cuenta ingresada no existe"),this.db.createFavorite({numeroCuenta:this.cuenta.numeroCuenta,usuario:this.user,usuarioCuenta:this.cuenta.usuario,estado:this.cuenta.estado,tipo:this.cuenta.tipo}).then(t=>{t?(this.alert=!0,this.error=!1,this.message="Cuenta agregada a favoritos"):(this.alert=!0,this.error=!0,this.message="Error al agregar a favoritos")})})}agregarfav(){this.agregar=!1}cancelar(){this.agregar=!1}getuser(t,e){return(0,i.mG)(this,void 0,void 0,function*(){""!==t.detail.value?yield this.getpersonalAccounts(t.detail.value,e):this.agregar&&(this.transferencia.destinatario="")})}setCantidad(t){this.transferencia.cantidad=t.detail.value}setDescription(t){this.transferencia.descripcion=t.detail.value}ionViewWillEnter(){return(0,i.mG)(this,void 0,void 0,function*(){""!==this.numeroCuentaDest&&(yield this.getpersonalAccounts(this.numeroCuentaDest,"destinatario"))})}getpersonalAccounts(t,e){return(0,i.mG)(this,void 0,void 0,function*(){yield this.db.getNumMonetary(t).then(t=>{this.cuenta=t.data.cuentas[0]}),void 0===this.cuenta&&(yield this.db.getAccount(t).then(t=>{this.cuenta=t.data})),"destinatario"===e?(this.cuentaDestino=this.cuenta,this.transferencia.cuentaDest=this.cuentaDestino.numeroCuenta,this.transferencia.destinatario=this.cuentaDestino.usuario):"remitente"===e&&(this.cuentaEmisora=this.cuenta,this.transferencia.cuentaRemi=this.cuentaEmisora.numeroCuenta,this.transferencia.remitente=this.cuentaEmisora.usuario),this.transferencia.fecha=(0,a.p6)(new Date,"yyyy-MM-dd HH:mm:ss","en-US")})}transferir(){return(0,i.mG)(this,void 0,void 0,function*(){yield this.db.createTrans(this.transferencia).then(t=>(0,i.mG)(this,void 0,void 0,function*(){if(!t)return this.alert=!0,this.error=!0,void(this.message="Error en la transferencia");if("monetaria"===this.cuentaDestino.tipo){const t=Number(this.cuentaDestino.saldo)+Number(this.transferencia.cantidad);yield this.db.modifyMonetary(this.cuentaDestino.usuario,"saldo",t.toFixed(2).toString())}if("ahorro"===this.cuentaDestino.tipo){const t=Number(this.cuentaDestino.saldo)+Number(this.transferencia.cantidad);yield this.db.modifyAccount(this.cuentaDestino.numeroCuenta,"saldo",t.toFixed(2).toString())}if("monetaria"===this.cuentaEmisora.tipo){const t=Number(this.cuentaEmisora.saldo)-Number(this.transferencia.cantidad);yield this.db.modifyMonetary(this.cuentaEmisora.usuario,"saldo",t.toFixed(2).toString())}if("ahorro"===this.cuentaEmisora.tipo){const t=Number(this.cuentaEmisora.saldo)-Number(this.transferencia.cantidad);yield this.db.modifyAccount(this.cuentaEmisora.numeroCuenta,"saldo",t.toFixed(2).toString())}this.alert=!0,this.error=!1,this.message="Transferencia exitosa"}))})}}return t.\u0275fac=function(e){return new(e||t)(s.Y36(o.t),s.Y36(u.yF),s.Y36(u.IN))},t.\u0275cmp=s.Xpm({type:t,selectors:[["app-transferencia"]],inputs:{user:"user",cuentasUsuario:"cuentasUsuario",cuentasFav:"cuentasFav",numeroCuentaDest:"numeroCuentaDest"},decls:10,vars:2,consts:[["slot","start"],["slot","start","color","primary",3,"click"],["slot","start","name","arrow-back-circle-outline"],["class","div-center",4,"ngIf"],[1,"div-center"],[1,"center"],["src","../../../assets/images/transferir.svg","width","300px"],[3,"ngSubmit"],[3,"message","error",4,"ngIf"],["interface","popover","name","rol","placeholder","Select One","required","",3,"ionChange"],[4,"ngFor","ngForOf"],[4,"ngIf"],["readonly","","type","text",1,"ion-text-right",3,"value"],["position","floating"],["maxlength","150","type","text",3,"ionChange"],["inputmode","decimal","type","decimal","required","",3,"ionChange"],["expand","block","color","primary","type","submit",1,"ion-margin"],["expand","block","fill","clear","shape","round",3,"click"],["slot","start","name","add"],[3,"message","error"],[3,"value"],["name","cuenta","pattern","^[a-zA-Z0-9\\-\\.]+$","type","text","required","",3,"clearInput","value","ionChange"],["slot","end",3,"click"],["slot","icon-only","name","pencil-outline"],["interface","popover","name","cuenta","placeholder","Select One","required","",3,"ionChange"],["slot","start",1,"ion-margin"],["color","danger",3,"click"],["color","primary","type","submit"]],template:function(t,e){1&t&&(s.TgZ(0,"ion-header"),s.TgZ(1,"ion-toolbar"),s.TgZ(2,"ion-buttons",0),s.TgZ(3,"ion-button",1),s.NdJ("click",function(){return e.regresar()}),s._UZ(4,"ion-icon",2),s.TgZ(5,"ion-label"),s._uU(6,"Regresar"),s.qZA(),s.qZA(),s.qZA(),s.qZA(),s.qZA(),s.TgZ(7,"ion-content"),s.YNc(8,p,31,5,"div",3),s.YNc(9,v,17,4,"div",3),s.qZA()),2&t&&(s.xp6(8),s.Q6J("ngIf",!e.agregar),s.xp6(1),s.Q6J("ngIf",e.agregar))},directives:[u.Gu,u.sr,u.Sm,u.YG,u.gu,u.Q$,u.W2,a.O5,c._Y,c.JL,c.F,u.Ub,u.Ie,u.t9,u.QI,a.sg,u.pK,u.j9,d.w,u.q_,u.n0],styles:[""]}),t})()},4315:(t,e,n)=>{"use strict";n.d(e,{e:()=>o});var i=n(6274),r=n(4988),a=n(5401),s=n(3606);let o=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[i.ez,r.u5,a.Pc]]}),t})()}}]);