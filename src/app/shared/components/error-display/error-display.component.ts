import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDisplayComponent implements OnChanges {
  @Input() fieldLabel: string;
  @Input() control: FormControl;
  @Input() isShown: boolean;
  public message = '';

  private messageOpts = {
    default: 'Error',
    required: 'Es requerido'
  };

  public ngOnChanges() {
    if (this.control) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName)) {
          this.message = this.messageOpts[propertyName] ? this.messageOpts[propertyName] : this.messageOpts.default; 
          return;
        }
      }
    }

    this.message = '';
  }
}