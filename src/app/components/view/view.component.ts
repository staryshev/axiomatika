import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Element, elements } from 'src/app/models/element';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  @ViewChild(TableComponent) table: TableComponent | undefined;

  displayedColumns: string[] = ['name', 'dateOfCreation', 'dateOfCompletion'];
  dataSource = new MatTableDataSource(elements);

  readonly name = new FormControl(null, Validators.maxLength(13));
  public dateControlFrom = new FormControl(new Date());
  public dateControlTo = new FormControl(new Date());
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  constructor(private matDialog: MatDialog) {}

  openDialog(element: Element) {
    this.matDialog.open(DialogComponent, {
      data: {
        name: element.name,
        description: element.description,
        dateOfCompletion: element.dateOfCompletion,
        isView: true,
      },
      width: '400px',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filter() {
    if (this.name.valid) {
      if (this.table) {
        this.table?.filter(
          this.name.value ?? '',
          this.dateControlFrom.value,
          this.dateControlTo.value
        );
      }
    }
  }

  clearFilter() {
    this.name.setValue(null);
    this.dateControlFrom.setValue(null);
    this.dateControlTo.setValue(null);
    if (this.table) {
      this.table?.filter('', null, null);
    }
  }
}
