import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';


import {
    ChartistComponent
} from 'angular2-chartist';

import {AppComponent}  from './app.component';
import {routing, appRoutingProviders} from './app.routing';

import {helpers} from 'utils';

// Modules

// Services
import {
    StateService,
    MEMStorageService,
    ClientStorageService,
    DeactivateConditionService,
    FirebaseService,
    AuthService,
    DatabaseService,
    FormsService,
    ChartFormatService
} from 'services';

// Other imports
import * as pipes from 'pipes';
import * as directives from 'directives';
import * as components from 'components';


@NgModule({
    imports      : [
        // Angular modules
        BrowserModule,
        routing,
        FormsModule,
        ReactiveFormsModule,

        // Modules
    ],
    providers    : [
        // Angular providers
        HTTP_PROVIDERS,
        appRoutingProviders,
        {provide : LocationStrategy, useClass : HashLocationStrategy},

        // Services
        StateService,
        MEMStorageService,
        ClientStorageService,
        DeactivateConditionService,
        FirebaseService,
        AuthService,
        DatabaseService,
        FormsService,
        ChartFormatService
    ],
    declarations : [AppComponent, ChartistComponent]
    // Directives
        .concat(helpers.parseList(directives))
        // Components
        .concat(helpers.parseList(components))
        // Pipes
        .concat(helpers.parseList(pipes)),
    bootstrap    : [AppComponent]
})
export class AppModule {
}
