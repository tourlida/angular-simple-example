import {Component, OnInit} from '@angular/core';
import {Observable, map} from 'rxjs';
import {Character} from 'src/app/models';
import {CharactersService} from 'src/app/services/characters.service';
import * as _ from 'lodash';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
    fetchedCharacters: Observable<Character[]> | undefined;
    tableRows: any;
    tableColumns: {[key: string]: string}[] = [
        {prop: 'name'},
        {name: 'id'},
        {name: 'tvShows'},
        {name: 'videoGames'},
        {name: 'allies'},
        {name: 'enemies'},
    ];

    columnsKeys = ['_id', 'name', 'tvShows', 'videoGames', 'allies', 'enemies'];

    constructor(private charactersService: CharactersService) {}

    ngOnInit() {
        this.fetchedCharacters = this.charactersService.getCharacters();

        this.fetchedCharacters
            .pipe(
                map((data) => {
                    return _.map(data, (character: Character) => {
                        let row: any = {};
                        _.forEach(this.columnsKeys, (key) => {
                            row[_.toString(key)] = _.get(character, key);
                        });
                        return row;
                    });
                })
            )
            .subscribe((data) => {
                this.tableRows = data;
            });
    }
}
