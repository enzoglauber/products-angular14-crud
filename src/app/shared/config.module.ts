import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import LOCALE_PT from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(LOCALE_PT);

export const LocaleProvider = {
  provide: LOCALE_ID,
  useValue: 'pt-BR',
};

const modules = [BrowserModule, BrowserAnimationsModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  providers: [LocaleProvider],
  exports: [...modules],
})
export class ConfigModule {}
