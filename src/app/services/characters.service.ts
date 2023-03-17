import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, map} from 'rxjs';
import {Character, PagedCharactersRsp} from '../models/index';

@Injectable({providedIn: 'root'})
export class CharactersService {
    constructor(private http: HttpClient) {}

    getCharacters(page: number, pageSize: number): Observable<PagedCharactersRsp> {
        let charactersUrl = `https://api.disneyapi.dev/characters?page=${page}&pageSize=${pageSize}`;
        return this.http.get<PagedCharactersRsp>(charactersUrl);
    }
}
