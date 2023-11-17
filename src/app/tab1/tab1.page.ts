import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { SoundButtonComponent } from '../sound-button/sound-button.component';
import { SoundButtonDetailComponent } from '../sound-button-detail/sound-button-detail.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ConfiguratorComponent, SoundButtonComponent, SoundButtonDetailComponent],
})
export class Tab1Page {
  constructor() {}
}
