import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobListComponent } from './pages/job-list/job-list.component';
import { JobCardsComponent } from './components/job-cards/job-cards.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const COMPONENTS = [JobCardsComponent];
const PAGES = [JobListComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    NgZorroAntdModule,
  ],
  declarations: [...COMPONENTS, ...PAGES],
  exports: [...COMPONENTS, ...PAGES],
})
export class JobsModule {}
