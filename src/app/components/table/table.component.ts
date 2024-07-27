import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { Element, elements } from 'src/app/models/element';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  displayedColumns: string[] = [
    'name',
    'dateOfCreation',
    'dateOfCompletion',
    'actions',
  ];
  dataSource = new MatTableDataSource(elements);
  clickBtn = false;
  @Input() isEditor: boolean = false;

  constructor(private matDialog: MatDialog) {}

  openDialog(element: Element, index: number) {
    if (this.clickBtn) {
      this.clickBtn = false;
      return;
    }
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        name: element.name,
        description: element.description,
        dateOfCompletion: element.dateOfCompletion,
        dataSource: this.dataSource,
        index: index,
        isView: true,
        isEdit: this.isEditor,
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  deleteElement(index: number) {
    this.clickBtn = true;
    elements.splice(index, 1);
    this.dataSource = new MatTableDataSource(elements);
  }

  copyElement(index: number) {
    this.clickBtn = true;
    elements.splice(
      index,
      0,
      new Element(
        elements[index].name,
        elements[index].description,
        elements[index].dateOfCreation,
        elements[index].dateOfCompletion
      )
    );
    this.dataSource = new MatTableDataSource(elements);
  }

  menuClick() {
    this.clickBtn = true;
  }

  upElement(index: number) {
    if (index > 0) {
      this.clickBtn = true;
      elements.splice(
        index - 1,
        0,
        new Element(
          elements[index].name,
          elements[index].description,
          elements[index].dateOfCreation,
          elements[index].dateOfCompletion
        )
      );
      elements.splice(index + 1, 1);
      this.dataSource = new MatTableDataSource(elements);
    }
  }

  downElement(index: number) {
    if (index < elements.length - 1) this.clickBtn = true;
    elements.splice(
      index + 2,
      0,
      new Element(
        elements[index].name,
        elements[index].description,
        elements[index].dateOfCreation,
        elements[index].dateOfCompletion
      )
    );
    elements.splice(index, 1);
    this.dataSource = new MatTableDataSource(elements);
  }

  updateTable() {
    this.dataSource = new MatTableDataSource(elements);
  }

  filter(name: string, dateFrom: Date | null, dateTo: Date | null) {
    let elementsFiltered: Element[] = [];
    elements.forEach((element) => {
      if (
        this.checkName(element, name.trim()) &&
        this.checkDateFrom(element, dateFrom) &&
        this.checkDateTo(element, dateTo)
      )
        elementsFiltered.push(element);
    });
    this.dataSource = new MatTableDataSource(elementsFiltered);
  }

  private checkName(element: Element, name: string) {
    if (name) {
      if (element.name.includes(name)) return true;
      return false;
    }
    return true;
  }

  private checkDateFrom(element: Element, dateFrom: Date | null) {
    if (dateFrom) {
      dateFrom.setSeconds(0);
      dateFrom.setMilliseconds(0);
      if (
        dateFrom < element.dateOfCompletion ||
        element.dateOfCompletion.toISOString() == dateFrom.toISOString()
      )
        return true;
      return false;
    }
    return true;
  }

  private checkDateTo(element: Element, dateTo: Date | null) {
    if (dateTo) {
      dateTo.setSeconds(0);
      dateTo.setMilliseconds(0);
      console.log(dateTo);
      if (
        dateTo > element.dateOfCompletion ||
        element.dateOfCompletion.toISOString() == dateTo.toISOString()
      )
        return true;
      return false;
    }
    return true;
  }
}
