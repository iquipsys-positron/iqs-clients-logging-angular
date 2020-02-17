import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IqsShellModule, IqsShellContainerComponent/*, CustomRouterStateSerializer*/ } from 'iqs-libs-clientshell2-angular';
// import {
//   StoreRouterConnectingModule,
//   RouterStateSerializer,
// } from '@ngrx/router-store';
import { TranslateModule } from '@ngx-translate/core';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppRoutingModule } from './app-routing.module';
// import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),

    // StoreModule.forRoot(reducers, { metaReducers }),
    // EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    // StoreRouterConnectingModule.forRoot({
    //   stateKey: 'router',
    // }),
    LocalStorageModule.withConfig({
      prefix: 'iqs-admin',
      storageType: 'localStorage'
    }),
    IqsShellModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    // {
    //   provide: RouterStateSerializer,
    //   useClass: CustomRouterStateSerializer
    // }
  ],
  bootstrap: [IqsShellContainerComponent]
})
export class AppModule { }
