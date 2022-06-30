import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'report-filter-component',
  templateUrl: 'report-filter.component.html',
  styleUrls: ['./report-filter.component.scss'],
})

export class ReportFilterComponent implements OnInit {
  @Input() yearEnabled: boolean = false;
  @Input() datesEnabled: boolean = false;
  @Input() events = [];
  @Output() filterEvent = new EventEmitter();

  public filterForm: FormGroup = new FormGroup({
    eventId: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.yearEnabled) {
      this.filterForm.addControl('year', this.formBuilder.control('2022'));
      this.filterForm.get('eventId').setValidators(Validators.required);
    }
    if (this.datesEnabled) {
      this.filterForm.addControl('dateFrom', this.formBuilder.control(''));
      this.filterForm.addControl('dateTo', this.formBuilder.control(''));
    }
  }

  setDateTimeValue(event, formName, format = '') {
    let value = event.value;
    if (format !== '') {
      value = moment(value).format(format);
    }
    this.filterForm.get(formName).setValue(value);
  }

  filterAction() {
    if (!this.filterForm.valid) {
      this.touchForms();
    } else {
      this.filterEvent.emit({ value: this.filterForm.value });
    }
  }

  touchForms() {
    Object.keys(this.filterForm.controls).forEach((field) => {
      const control = this.filterForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  resetFiltersAction() {
    this.filterForm.reset();
  }
}