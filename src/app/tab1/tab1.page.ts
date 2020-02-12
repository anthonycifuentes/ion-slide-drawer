import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private routerOutlet: IonRouterOutlet, private modalCtrl: ModalController) {}
  
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      // swipeToClose: false,
      // presentingElement: this.routerOutlet.nativeEl,
      mode: 'ios'
    });
    return await modal.present();
  }
}
