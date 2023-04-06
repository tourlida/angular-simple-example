import {  Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Character, PagedCharactersRsp } from 'src/app/models';
import { CharactersService } from 'src/app/services/characters.service';

import * as _ from 'lodash';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
    fetchedCharacters: Character[] | undefined;
    fetchedPagedCharactersFullInfo: Observable<PagedCharactersRsp> | undefined;
    tableRows: any;
    tableColumns: any[] = [
        { name: 'Id', sortable: false },
        { name: 'Name', sortable: true },
        { name: 'Tv shows', sortable: false },
        { name: 'Video games', sortable: false },
        { name: 'Allies', sortable: false },
        { name: 'Enemies', sortable: false },
    ];
    columnsKeys = ['_id', 'name', 'tvShows', 'videoGames', 'allies', 'enemies', 'imageUrl', 'films'];

    currentPage: number = 1;

    pageLimit: number = 50;
    pageLimitOptions = [10, 20, 50, 100, 200, 500];

    totalPages = 0;

    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

    isModalOpen = false;

    selectedCharacter: Character | undefined;
    //---------------------------------------------------------------------------
    chartOptions: Highcharts.Options = {};
    highCharts: typeof Highcharts = Highcharts;

    //---------------------------------------------------------------------------
    constructor(private charactersService: CharactersService, private dialog: MatDialog) { }
    //---------------------------------------------------------------------------
    ngOnInit() {
        this.loadData();
    }
    //---------------------------------------------------------------------------

    public loadData() {
        this.fetchedPagedCharactersFullInfo = this.charactersService.getCharacters(
            this.currentPage,
            this.pageLimit
        );

        this.fetchedPagedCharactersFullInfo.pipe(
            map((rsp: PagedCharactersRsp) => {
                this.totalPages = rsp.totalPages;
                this.fetchedCharacters = rsp.data;
            })
        );

        this.fetchedPagedCharactersFullInfo
            .pipe(
                map((rsp) => {
                    return {
                        data: _.map(rsp.data, (character: Character) => {
                            let row: any = {};
                            _.forEach(this.columnsKeys, (key) => {
                                if (key == '_id') {
                                    row['id'] = _.get(character, key);
                                } else {
                                    row[_.toString(key)] = _.get(character, key);
                                }
                            });
                            return row;
                        }),
                        totalPages: rsp.totalPages,
                    };
                })
            )
            .subscribe(
                (data) => {
                    this.tableRows = [...data.data];
                    this.totalPages = data.totalPages;

                    //Configure Chart Options
                    this.chartOptions = this.configureChartOptions(data.data) as any;
        
                },
                (err) => {
                    console.log('There was an error: ' + err);
                }
            );
    }
    //--------------------------------------------------------------------------
    public configureChartOptions(initialData: any) {

        return {
            chart: {
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Table Page Characters Results',
                align: 'left'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [
                {
                    name: 'Brands',
                    colorByPoint: true,
                    type: 'pie',
                    data: _.map(initialData, item => {
                        return {
                            name: item.name,
                            y: item.films.length
                        }
                    }) as any
                },
            ]
        }
    }
    //---------------------------------------------------------------------------
    public onPageChange(event: any): void {
        this.currentPage = event.target.value;
    }

    handlePageEvent(e: PageEvent) {
        this.pageLimit = e.pageSize;
        this.currentPage = e.pageIndex;

        this.loadData();
    }

    handleRowClick(row: Character) {
        this.openDialog(row);
    }

    openDialog(row: any) {
        this.selectedCharacter = row;

        this.dialog
            .open(ModalComponent, {
                width: '600px',
                data: row,
            })
            .afterClosed()
            .pipe(tap(() => (this.selectedCharacter = undefined)));
    }
}
