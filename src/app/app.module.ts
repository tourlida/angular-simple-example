import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TableComponent } from './components/main-page/table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/main-page/modal/modal.component';
import { Material } from './material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartComponent } from './components/main-page/chart/chart.component';


@NgModule({
    declarations: [AppComponent, MainPageComponent, TableComponent, ModalComponent, ChartComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxDatatableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        Material,
        HighchartsChartModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
