import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatDialogModule, MatListModule, MatIconModule, MatToolbarModule, MatButtonModule],
    exports: [MatDialogModule, MatListModule, MatIconModule, MatToolbarModule, MatButtonModule]
})

export class Material{}