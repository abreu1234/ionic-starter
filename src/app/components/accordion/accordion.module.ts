import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AccordionComponent } from './accordion.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AccordionComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports: [
    AccordionComponent,
  ]
})
export class AccordionComponentModule {}
