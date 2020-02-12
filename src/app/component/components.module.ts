import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideDrawerComponent } from './slide-drawer/slide-drawer.component';



@NgModule({
  declarations: [SlideDrawerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SlideDrawerComponent]
})
export class ComponentsModule { }
