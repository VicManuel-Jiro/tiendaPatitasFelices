import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  public shippingCosts = this._carritoservicio.getShippingPrices();
  constructor(
    private _carritoservicio: CarritoService
    ) { }

  ngOnInit(): void {
  }

}
