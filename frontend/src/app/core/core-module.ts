import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme/theme.service.ts';
import { AuthService } from './auth/auth.service.js';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [ThemeService, AuthService],
})
export class CoreModule {}
