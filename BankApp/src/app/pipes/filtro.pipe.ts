import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(arr: any[], texto: string, columna: string): any[] {
    if (!arr) {
      return null;
    }

    if (texto === '') {
      return arr;
    }
    if (columna === '') {
      return arr;
    } else {
      texto = texto.toLocaleLowerCase();
      console.log(typeof arr[0][columna]);
      console.log(arr[0][columna]);
      return arr.filter((item) =>
        item[columna].toString().toLowerCase().includes(texto)
      );
    }
  }
}
