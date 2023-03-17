import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
    @Input() rows: any;
    @Input() columns: {[key: string]: string}[] = [];

    ngOnInit() {}
}
