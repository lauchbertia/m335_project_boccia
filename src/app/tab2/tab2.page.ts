import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import {  ItemDetail } from '../item-detail/item-detail.component';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ShoppingListComponent, ItemDetail, ItemListComponent]
})
export class Tab2Page {

  constructor() {}

}
