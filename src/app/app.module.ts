import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TableComponent } from './components/main-page/table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [AppComponent, MainPageComponent, TableComponent],
  imports: [BrowserModule, HttpClientModule, NgxDatatableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
