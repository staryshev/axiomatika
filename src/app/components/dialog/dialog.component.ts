import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  TUI_DATE_FORMAT,
  TUI_DATE_SEPARATOR,
  TuiDay,
  TuiTime,
} from '@taiga-ui/cdk';
import * as moment from 'moment';
import { Element, elements } from 'src/app/models/element';
import { ThemePalette } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export interface DialogData {
  name: string;
  description: string;
  dateOfCompletion: Date;
  index: number;
  isView: boolean;
  isEdit: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  title: string = '';
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly name = new FormControl(this.data.name, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(13),
  ]);
  readonly description = new FormControl(this.data.description, [
    Validators.maxLength(256),
  ]);
  public dateControl = new FormControl(this.data.dateOfCompletion, [
    Validators.required,
  ]);
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  form = new FormGroup({
    name: this.name,
    description: this.description,
    dateControl: this.dateControl,
  });

  constructor(
    private dialogRef: MatDialog,
    private translate: TranslateService
  ) {
    let key = 'DIALOG.TITLE-VIEW';
    if (this.data.isEdit && this.data.isView) key = 'DIALOG.TITLE-EDIT';
    else if (this.data.isEdit && !this.data.isView) key = 'DIALOG.TITLE-ADD';
    this.translate.stream(key).subscribe((val) => {
      this.title = val;
    });
    if (!this.data.isEdit) {
      this.form.disable();
    }
  }

  addElement() {
    this.name.markAsTouched();
    if (this.form.valid) {
      let name = this.name.value ?? '';
      let description = this.description.value ?? '';
      let date = this.dateControl.value ?? new Date(0, 0, 0, 0, 0, 0);
      let dateOfCompletion = moment(date).toDate();
      dateOfCompletion.setSeconds(0);
      dateOfCompletion.setMilliseconds(0);
      elements.push(
        new Element(
          name,
          description,
          new Date(),
          moment(dateOfCompletion).toDate()
        )
      );
      this.dialogRef.closeAll();
    }
  }

  saveElement() {
    this.name.markAsTouched();
    if (this.form.valid) {
      let name = this.name.value ?? '';
      let description = this.description.value ?? '';
      let date = this.dateControl.value ?? new Date(0, 0, 0, 0, 0, 0);
      let dateOfCompletion = moment(date).toDate();
      dateOfCompletion.setSeconds(0);
      dateOfCompletion.setMilliseconds(0);
      elements[this.data.index] = new Element(
        name,
        description,
        new Date(),
        moment(dateOfCompletion).toDate()
      );
      this.dialogRef.closeAll();
    }
  }
}
