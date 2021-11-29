import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  bubbles = false; //variable para mostrar el spinnig bubbles
  constructor() {}
  onSearchChange(event){
    this.bubbles = true;
    const valor = event.detail.value;
    if(true){
    setTimeout(() => {
      }, 1000);
    }else{
      setTimeout(() => {
        this.bubbles = false;
        }, 500);
    }
    if(valor === ''){
      this.bubbles = false;
    }
  }
}
