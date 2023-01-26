import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  isPaymentSuccess = false;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  paynow()
  {
    this.isPaymentSuccess = true;
    this.cartService.clearCart();
  }
}
