import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme/theme.service.ts';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports : [],
  providers : [ThemeService]
})
export class CoreModule { }
