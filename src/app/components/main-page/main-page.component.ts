import {Component, OnInit} from '@angular/core';
import {Observable, map} from 'rxjs';
import {Character, PagedCharactersRsp} from 'src/app/models';
import {CharactersService} from 'src/app/services/characters.service';

import * as _ from 'lodash';
import {PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
    fetchedCharacters: Character[] | undefined;
    fetchedPagedCharactersFullInfo: Observable<PagedCharactersRsp> | undefined;
    tableRows: any;
    tableColumns: {[key: string]: string}[] = [
        {name: 'Id'},
        {name: 'Name'},
        {name: 'Tv shows'},
        {name: 'Video games'},
        {name: 'Allies'},
        {name: 'Enemies'},
    ];
    columnsKeys = ['_id', 'name', 'tvShows', 'videoGames', 'allies', 'enemies'];

    currentPage: number = 1;

    pageLimit: number = 50;
    pageLimitOptions = [10, 20, 50, 100, 200, 500];

    totalPages = 0;

    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;
    //---------------------------------------------------------------------------
    constructor(private charactersService: CharactersService) {}
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
                },
                (err) => {
                    console.log('There was an error: ' + err);
                }
            );
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
}
