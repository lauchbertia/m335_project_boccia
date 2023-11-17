import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { SoundButtonDetailComponent } from '../sound-button-detail/sound-button-detail.component';
import { SoundButtonComponent } from '../sound-button/sound-button.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ConfiguratorComponent, SoundButtonComponent, SoundButtonDetailComponent],

})
export class Tab3Page {
  constructor() {}
}
