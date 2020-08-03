import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyViewModule } from './components/empty-view/empty-view.module';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ComponentsModule } from './components/components.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BarRatingModule } from 'ngx-bar-rating';

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
    BarRatingModule,
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
    BarRatingModule,
  ]
})
export class SharedModule {}
