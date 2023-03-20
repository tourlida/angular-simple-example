import {Component, Input, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Character} from 'src/app/models';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Character) {}

    ngOnInit() {
        console.log('[Dialog][ngOnInit]data->', this.data);
    }
}
