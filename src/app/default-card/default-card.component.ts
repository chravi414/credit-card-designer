import { Component, Input, OnInit } from '@angular/core';
import { CardSelectService } from '../services/card-select.service';

@Component({
  selector: 'app-default-card',
  templateUrl: './default-card.component.html',
  styleUrls: ['./default-card.component.css'],
})
export class DefaultCardComponent implements OnInit {
  @Input() iSBack: boolean = false;
  public cardData: any;
  public bgColor = '#1841a1';
  public cardBgImage = '';
  public styleClass = {
    'background-color': '#1841a1',
    'background-image': '',
  };

  public backStyleClass = {
    'background-color': '#1841a1',
    'background-image': '',
  };

  constructor(private _cardSelectService: CardSelectService) {}

  ngOnInit() {
    this._cardSelectService.selectedCardImage.subscribe((data) => {
      console.log(data);
      if (data.type === 'IMAGE') {
        const bgImage = data['cardImage']['url'];
        const bgColor = data['cardImage']['backHexValue'];
        this.styleClass = {
          'background-image': `url(${bgImage})`,
          'background-color': '',
        };
        this.backStyleClass = {
          'background-color': `${bgColor}`,
          'background-image': '',
        };
      } else if (data.type === 'PATTERN') {
        const bgImage = data['cardImage']['url'];
        const bgColor = data['cardImage']['backHexValue'];
        this.styleClass = {
          'background-image': `url(${bgImage})`,
          'background-color': '#1841a1',
        };
        this.backStyleClass = {
          'background-color': `#1841a1`,
          'background-image': '',
        };
      } else if (data.type === 'USER_IMAGE') {
        const bgImage = data['cardImage']['url'];
        this.styleClass = {
          'background-image': `url(${bgImage})`,
          'background-color': '',
        };
        this.backStyleClass = {
          'background-color': ``,
          'background-image': `url(${bgImage})`,
        };
      } else {
        const bgColor = data['cardImage']['hexValue'];
        this.styleClass = {
          'background-image': '',
          'background-color': bgColor,
        };
        this.backStyleClass = {
          'background-color': `${bgColor}`,
          'background-image': '',
        };
      }
    });

    this._cardSelectService.enteredCardDetails.subscribe((cardDetails) => {
      this.cardData = {
        cardHolderName: cardDetails.cardHolderName,
        cardNumber: cardDetails.cardNumber,
        cardExpiry: `${cardDetails.cardExpiryMonth} / ${cardDetails.cardExpiryYear}`,
        cvv: cardDetails.cvv,
      };
    });
  }

  public formatCardNumber(cardNumber: string) {
    let formattedNumber = [];
    let cardNumberDigits = cardNumber.split('');
    for (let i = 0; i < cardNumberDigits.length; i++) {
      if (i !== 0 && i % 4 === 0) {
        formattedNumber.push(' ');
      }
      formattedNumber.push(cardNumberDigits[i]);
    }
    return formattedNumber.join('');
  }
}
