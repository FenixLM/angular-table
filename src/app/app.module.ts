import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { AvisoModule } from './shared/components/aviso/aviso.module';
import { AlertaModule } from './shared/components/alerta/alerta.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SpinnerModule,
    AvisoModule,
    AlertaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
