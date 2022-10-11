import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuicklinkModule } from 'ngx-quicklink';

import { ComponentsModule } from './components/components.module';
import { ConfigModule } from './config.module';
import { MaterialModule } from './material.module';

const modules = [
  ConfigModule,
  QuicklinkModule,
  MaterialModule,
  ComponentsModule
];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class SharedModule { }
