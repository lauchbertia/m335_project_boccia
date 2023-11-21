import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GeolocatorService } from '../services/geolocator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-geolocator',
  templateUrl: './geolocator.component.html',
  styleUrls: ['./geolocator.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})



export class GeolocatorComponent  implements OnInit {

  latitude : number = 0
  longitude : number = 0
  altitude : number | null = 0

  homeLatitude: number | null = null;
  homeLongitude: number | null = null;

  constructor( public geolocationService : GeolocatorService) {  }

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition()

    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
    this.altitude = position.coords.altitude

    const home = { latitude: 52.5200, longitude: 13.4050 }; // Beispielkoordinaten
    const distance = this.calculateDistance({ latitude: this.latitude, longitude: this.longitude }, home);
    console.log(`Die Entfernung zum Zielort beträgt ${distance} Meter.`);
  }

  getHomeLocation(): { latitude: number | null, longitude: number | null } {
    let longitude = 47.558598;
    let latitude = 7.574011;
  
    return { latitude: latitude, longitude: longitude };
  }

  

  setHomeLocation(latitude: number, longitude: number) {
    this.homeLatitude = latitude;
    this.homeLongitude = longitude;
    console.log(`"Mein Zuhause" wurde festgelegt auf: Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  updateHomeLocation() {
    if (this.homeLatitude !== null && this.homeLongitude !== null) {



      
      // Hier könnten Sie die Werte in einem Service speichern
      // oder eine andere Logik ausführen, um "Zuhause" zu aktualisieren
      console.log(`Neue "Zuhause" Koordinaten: Latitude ${this.homeLatitude}, Longitude ${this.homeLongitude}`);
    }
  }

  resetPosition () {
    this.latitude = 0
    this.longitude = 0
    this.altitude = 0
  }

  calculateDistance(point1: { latitude: number, longitude: number }, point2: { latitude: number, longitude: number }): number {
    const toRadian = (angle: number): number => angle * Math.PI / 180;

    const earthRadius = 6371e3; // Erdradius in Metern
    const deltaLatitude = toRadian(point2.latitude - point1.latitude);
    const deltaLongitude = toRadian(point2.longitude - point1.longitude);

    const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
        Math.cos(toRadian(point1.latitude)) * Math.cos(toRadian(point2.latitude)) *
        Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Distanz in Metern
  }

  

  ngOnInit() {
    this.getCurrentPosition();
    const homeCoords = this.getHomeLocation();
    this.homeLatitude = homeCoords.latitude;
    this.homeLongitude = homeCoords.longitude;
  }

}
