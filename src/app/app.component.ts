import { Component } from '@angular/core';
import { elements } from './models/element';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'axiomatika';
  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    /*setInterval(() => {
      this._snackBar.openFromComponent(NotificationComponent, {
        data: [elements[0].name, elements[1].name, elements[2].name],
        duration: this.durationInSeconds * 1000,
      });
    }, 10000);*/
    let t = 0;
    if (new Date().getSeconds() > 0)
      t = 1000 * (60 - (new Date().getSeconds() % 60));
    setTimeout(() => {
      this.checkElements();
      setInterval(() => {
        this.checkElements();
      }, 60000);
    }, t);
  }

  checkElements() {
    let currentDate = new Date();
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    let elementsNames: String[] = [];
    elements.forEach((element) => {
      if (element.dateOfCompletion.toISOString() == currentDate.toISOString())
        elementsNames.push(element.name);
    });
    if (elementsNames.length > 0)
      this._snackBar.openFromComponent(NotificationComponent, {
        data: elementsNames,
        duration: this.durationInSeconds * 1000,
      });
  }

  selectLanguage(language: any) {
    this.translate.use(language.target.value.toLowerCase());
  }
}
