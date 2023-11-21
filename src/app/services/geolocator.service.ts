import { Injectable } from '@angular/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { FormsModule } from '@angular/forms';


interface Geoposition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitudeAccuracy: number | null | undefined;
    altitude: number | null | undefined;
    speed: number | null | undefined;
    heading: number | null | undefined;
  };
  timestamp: number;
}


@Injectable({
  providedIn: 'root'
})
export class GeolocatorService {

  constructor() { }

    public async getCurrentPosition () {

    let attrs = {enableHighAccuracy: true}

    const coordinates = await Geolocation.getCurrentPosition(attrs);

    return coordinates;

  }

  async watchPosition(options: PositionOptions, callback: (position: Geoposition) => void): Promise<string> {
    const watchId = await Geolocation.watchPosition(options, (position, err) => {
      if (err) {
        console.error('Fehler beim Abrufen der Position:', err);
        return;
      }

      if (position) {
        callback(position);
      }
    });

    return watchId;
  }

  async clearWatch(watchId: string): Promise<void> {
    await Geolocation.clearWatch({ id: watchId });
  }

}
