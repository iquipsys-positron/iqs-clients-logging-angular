import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatInputModule, MatListModule, MatProgressBarModule,MatButtonModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';
import { PipMediaModule, PipScrollableModule, PipSidenavModule, PipDocumentLayoutModule, PipMenuLayoutModule } from 'pip-webui2-layouts';
// import { PipTimeRangeEditModule } from 'pip-webui2-dates';
import { PipEmptyStateModule, PipSearchInputModule } from 'pip-webui2-controls';
import { PipSelectedModule, PipInfiniteScrollModule } from 'pip-webui2-behaviors';

import { LoggingContainerComponent } from './logging-container.component';
import { LogsDataService } from '../services/logs.data.service';



const COMPONENTS = [
  LoggingContainerComponent
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,

    // PipMediaModule,
    PipScrollableModule,
    PipSidenavModule,
    PipDocumentLayoutModule,
    PipMenuLayoutModule,

    // PipTimeRangeEditModule,

    PipEmptyStateModule,
    PipSearchInputModule,

    PipSelectedModule,
    PipInfiniteScrollModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    LogsDataService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoggingContainersModule { }

export { LoggingContainerComponent } from './logging-container.component';
