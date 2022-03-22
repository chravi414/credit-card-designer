import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardSelectService {
  public selectedCardImage: Subject<any> = new Subject();
  public enteredCardDetails: Subject<any> = new Subject();

  constructor() {}

  setSelectdCardImage(cardImage: any, type: any) {
    this.selectedCardImage.next({
      cardImage: cardImage,
      type: type,
    });
  }

  setCardDetails(cardDetails: any) {
    this.enteredCardDetails.next({
      cardHolderName: cardDetails.cardHolderName,
      cardNumber: cardDetails.cardNumber,
      cardExpiryMonth: cardDetails.cardExpiryMonth,
      cardExpiryYear: cardDetails.cardExpiryYear,
      cvv: cardDetails.cvv,
    });
  }
}
