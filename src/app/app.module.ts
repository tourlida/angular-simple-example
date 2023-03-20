import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {TableComponent} from './components/main-page/table/table.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalComponent} from './components/main-page/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [AppComponent, MainPageComponent, TableComponent, ModalComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxDatatableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatListModule,
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
