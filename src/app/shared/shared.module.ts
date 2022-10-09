import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, ComponentsModule, MaterialModule
  ],
  exports: [ComponentsModule, MaterialModule]
})
export class SharedModule { }
