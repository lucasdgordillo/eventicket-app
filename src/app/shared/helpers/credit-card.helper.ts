import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreditCardHelper {

  getCreditCardNumberFormat(number: string) {
    let result = "";
    const longitudCadena = number.length;
    for (let i = 0; i < longitudCadena; i += 4) {
      if (i + 4 < longitudCadena) { result += number.substring(i, i + 4) + '-'; } 
      else { result += number.substring(i, longitudCadena); }
    }
    return result;
  }
}