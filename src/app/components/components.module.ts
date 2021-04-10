import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UploadBoxComponent } from './upload-box/upload-box.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
	declarations: [
		UploadBoxComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		RouterModule,
		TranslateModule,
		LazyLoadImageModule
	],
	exports: [
		UploadBoxComponent
	]
})
export class ComponentsModule {}
