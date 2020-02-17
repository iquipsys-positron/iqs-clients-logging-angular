import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IqsShellModule, IqsShellContainerComponent, CustomRouterStateSerializer } from '@iquipsys/iqs-admin-shell';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import {
  PipEntryConfig,
  PipEntryConfigService
} from '@iquipsys/pip-suite2-entry';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppRoutingModule } from './app-routing.module';
import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';

const entryConfig: PipEntryConfig = <PipEntryConfig>{
  autorizeState: '/',
  unautorizeState: '/signin',
  url: 'http://api.positron.stage.iquipsys.net:30018'
};

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    LocalStorageModule.withConfig({
      prefix: 'iqs-admin',
      storageType: 'localStorage'
    }),
    IqsShellModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    },
    {
      provide: PipEntryConfigService,
      useFactory: () => new PipEntryConfigService(entryConfig)
    }
  ],
  bootstrap: [IqsShellContainerComponent]
})
export class AppModule { }