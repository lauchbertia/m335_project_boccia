import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FoodListComponent } from '../food-list/food-list.component';

import { Router, RouterModule } from '@angular/router';

import { Camera } from '@capacitor/camera';
import { CameraComponent } from '../camera/camera.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CameraComponent]
})
export class Tab4Page {

  constructor(
      private router : Router
  ) {}

  async create () {
    await this.router.navigate(['tabs/tab4/list'])
  }

}
