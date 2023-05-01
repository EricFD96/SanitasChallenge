import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/* Pages */
import { HomePage } from './pages/home/home.page';

/* Services */
import { PicSumService } from './services/api/pic-sum.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomePage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, PicSumService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
