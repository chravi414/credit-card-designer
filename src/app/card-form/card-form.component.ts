import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CardSelectService } from '../services/card-select.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
  public IMAGES = [
    {
      id: 1,
      url: './../../assets/card1.jpeg',
      backHexValue: '#0C4226',
      value: 'card1',
    },
    {
      id: 2,
      url: './../../assets/card2.jpeg',
      backHexValue: '#A37663',
      value: 'card2',
    },
    {
      id: 3,
      url: './../../assets/card3.jpeg',
      value: 'card3',
      backHexValue: '#0C4226',
    },
  ];

  public COLORS = [
    {
      id: 1,
      hexValue: '#DA2A1B',
      value: 'red',
    },
    {
      id: 2,
      hexValue: '#2E7016',
      value: 'green',
    },
  ];

  public PATTERNS = [
    {
      id: 1,
      url: './../../assets/pattern1.png',
      value: 'pattern1',
    },
    {
      id: 2,
      url: './../../assets/pattern2.png',
      value: 'pattern2',
    },
  ];

  constructor(private _cardSelectService: CardSelectService) {}

  cardForm = new FormGroup({
    cardHolderName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(16),
    ]),
    cardExpiryMonth: new FormControl('', [Validators.required]),
    cardExpiryYear: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required, Validators.maxLength(3)]),
  });

  ngOnInit(): void {
    this.cardForm.valueChanges.subscribe((data) => {
      this._cardSelectService.setCardDetails(data);
    });
  }

  public handleCardDesignSelect(type: string, id: number) {
    let cardImageObj;

    if (type === 'IMAGE') {
      cardImageObj = this.IMAGES.find((image) => image.id === id);
    } else if (type === 'PATTERN') {
      cardImageObj = this.PATTERNS.find((pattern) => pattern.id === id);
    } else {
      cardImageObj = this.COLORS.find((color) => color.id === id);
    }
    this._cardSelectService.setSelectdCardImage(cardImageObj, type);
  }

  public onSubmit(value: any) {}

  handleFileSelect(event: any) {
    const selectedImage = event.target.files[0];
    const cardImageObj = {
      id: 1,
      url: URL.createObjectURL(selectedImage),
    };
    this._cardSelectService.setSelectdCardImage(cardImageObj, 'USER_IMAGE');
  }
}
