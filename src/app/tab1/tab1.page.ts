import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GeolocatorComponent } from '../geolocator/geolocator.component';
import { FormsModule } from '@angular/forms';
import { BatteryStatusComponent } from '../battery-status/battery-status.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, GeolocatorComponent, BatteryStatusComponent, FormsModule],
})
export class Tab1Page {
  constructor() {}
}
