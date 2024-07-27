import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  @ViewChild(TableComponent) table: TableComponent | undefined;

  constructor(private matDialog: MatDialog) {}

  openDialogAddElement() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: { isView: false, isEdit: true, dateOfCompletion: new Date() },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.table) {
        this.table?.updateTable();
      }
    });
  }
}
