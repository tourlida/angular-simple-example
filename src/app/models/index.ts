export interface Character {
    films: string[];
    shortFilms: string[];
    tvShows: string[];
    videoGames: string[];
    parkAttractions: string[];
    allies: string[];
    enemies: string[];
    _id: number;
    name: string;
    imageUrl: string;
    url: string;
}

export interface PagedCharactersRsp {
    data: Character[];
    count: number;
    previousPage: string;
    nextPage: string;
}

export interface Pagination {
    page: number;
    pageSize: number;
}

export interface Sorting {
    column: string;
    direction: 'asc' | 'desc';
}
