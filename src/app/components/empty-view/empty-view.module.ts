import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EmptyView } from './empty-view';

@NgModule({
  declarations: [
    EmptyView,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    EmptyView
  ]
})
export class EmptyViewModule {}
