import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyViewModule } from './components/empty-view/empty-view.module';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ComponentsModule } from './components/components.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    EmptyViewModule,
    ImgFallbackModule,
    LazyLoadImageModule,
    ComponentsModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    EmptyViewModule,
    ImgFallbackModule,
    LazyLoadImageModule,
    ComponentsModule,
    NgxSkeletonLoaderModule,
  ]
})
export class SharedModule {}
