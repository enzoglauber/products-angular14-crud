import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';

const MATERIAL = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ...MATERIAL
  ],
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ]
})
export class ComponentsModule { }
