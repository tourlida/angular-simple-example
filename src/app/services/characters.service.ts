import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Character, PagedCharactersRsp } from '../models/index';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  constructor(private http: HttpClient) {}

  private charactersUrl = 'https://api.disneyapi.dev/characters';

  getCharacters(): Observable<Character[]> {
    return this.http.get<PagedCharactersRsp>(this.charactersUrl).pipe(
      map((rsp: PagedCharactersRsp) => {
        return rsp.data;
      })
    );
  }
}
