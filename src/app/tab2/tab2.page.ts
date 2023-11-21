import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GeolocatorComponent } from '../geolocator/geolocator.component';
import { BatteryStatusComponent } from '../battery-status/battery-status.component';
import { FormsModule } from '@angular/forms';
import { FoodListComponent } from '../food-list/food-list.component';
import { FoodDetailComponent } from '../food-detail/food-detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FoodListComponent, FoodDetailComponent]
})
export class Tab2Page {

  constructor() {}

}
