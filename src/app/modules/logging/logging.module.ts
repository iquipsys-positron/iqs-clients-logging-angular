import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IqsSettingsService } from '@iquipsys/iqs-admin-shell';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

import { LoggingContainersModule } from './containers';
import { LoggingRoutingModule } from './logging-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,

    LoggingContainersModule,
    LoggingRoutingModule,
  ],
  declarations: [],
  providers: [
    IqsSettingsService
  ]
})
export class LoggingModule { }
