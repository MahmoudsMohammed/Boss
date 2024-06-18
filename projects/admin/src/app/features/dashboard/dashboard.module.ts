import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { coreModule } from '../../core/core.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, DashboardRoutingModule, RouterOutlet, coreModule],
})
export class DashboardModule {}
