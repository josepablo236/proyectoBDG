import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DynamoDBService } from 'src/app/services/dynamo-db.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
})
export class UploadImgComponent implements OnInit {

  @Input() userName: string;

  FileName: string;
  imgPath: any;
  error: boolean;
  message: string;

  isImgUploaded: boolean;
  
  constructor(private db: DynamoDBService, private modalController: ModalController) { 
    this.isImgUploaded = false;
  }

  ngOnInit() {}

  async fileUpload(event: FileList) {
    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') { 
      this.error = true;
      this.message = "Tipo de archivo no soportado";
      return;
    }
    if(file.size > 400000){
      this.error = true;
      this.message = "La imagen debe ser menor a 200 kb";
      return;
    }
    this.error = false;
    this.FileName = file.name;
    let base64 = await this.convertBase64(file);
     this.isImgUploaded = true;
     this.imgPath = base64;
}

convertBase64(img) {
  return new Promise((resolve)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img);
    fileReader.onload = () =>{
      resolve(fileReader.result);
    }
  })
}

guardarFoto(){
  //Modificar foto de usuario
    this.db.modifyImg(this.userName,'img', this.imgPath).then(resp =>{
      //Validar si resp es true
      console.log(resp);
    });
    this.modalController.dismiss();
}

}
