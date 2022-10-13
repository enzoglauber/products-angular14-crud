import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuicklinkModule } from 'ngx-quicklink';

import { ComponentsModule } from './components/components.module';
import { ConfigModule } from './config.module';

const MATERIAL = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule
];

const modules = [
  ConfigModule,
  QuicklinkModule,
  ComponentsModule,

  ...MATERIAL
];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class SharedModule { }
