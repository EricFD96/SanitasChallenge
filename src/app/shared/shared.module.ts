import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCardSkeletonComponent } from './components/image-card-skeleton/image-card-skeleton.component';
import { ImageCardComponent } from './components/image-card/image-card.component';

@NgModule({
  declarations: [ImageCardSkeletonComponent, ImageCardComponent],
  imports: [CommonModule, IonicModule, BrowserModule, BrowserModule, IonicModule],
  exports: [ImageCardSkeletonComponent, ImageCardComponent],
})
export class SharedModule {}
