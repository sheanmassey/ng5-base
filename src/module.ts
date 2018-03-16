import {NgModule, Component} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule, RouterLink} from '@angular/router'
import {NgForm, ReactiveFormsModule} from '@angular/forms'
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {ModalModule} from 'ngx-bootstrap/modal';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {PopoverModule} from 'ngx-bootstrap/popover';

import { ToastrModule } from 'ngx-toastr';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {CalendarModule} from 'angular-calendar';


import {
    AppComponent,
    PanelComponent,
    UserPasswordComponent,
    NewlineToParagraphComponent,
    DateInputComponent,
    MutedIfNa,
    PreviewPasswordComponent,
} from './components'


import {
    UserService,
} from './services'


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/static/i18n/');
}


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpModule,
        // ModalModule.forRoot(),
        // TypeaheadModule.forRoot(),
        PopoverModule.forRoot(),
        // CalendarModule.forRoot(),
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        HttpClientModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient],
        //     }
        // }),
        RouterModule.forRoot([
            {
                path: '**',
                redirectTo: '/',
            },
        ], {
            useHash: true,
        }),
    ],
    declarations: [
        AppComponent,
        PanelComponent,
        DateInputComponent,
        NewlineToParagraphComponent,
        PreviewPasswordComponent,
        MutedIfNa,
        NgForm,
    ],
    providers: [
        UserService,
        {provide: XSRFStrategy, useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')},
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}
