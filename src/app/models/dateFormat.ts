import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';

export const MY_NGX_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'DD.MM.yyyy HH:mm',
  },
  display: {
    dateInput: 'DD.MM.yyyy HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
