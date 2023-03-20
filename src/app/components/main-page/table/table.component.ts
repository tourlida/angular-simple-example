import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
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
    @Output() onRowClick: EventEmitter<any> = new EventEmitter();

    ngOnInit() {}

    rowClick(event: {
        type: 'keydown' | 'click' | 'dblclick';
        event: any;
        row: any;
        column: any;
        value: any;
        cellElement: any;
        rowElement: any;
    }) {
        if (event.type === 'click') {
            this.onRowClick.emit(event.row);
        }
    }
}
