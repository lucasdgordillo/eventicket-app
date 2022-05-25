import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { relativeTimeThreshold } from "moment";

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
  @Input() customMessage: string = '';
  public message = '';

  private messageOpts = {
    default: 'Error',
    required: 'Es requerido',
    empty_cart: 'Debe seleccionar uno o mas tickets',
    empty_payment: 'Debe agregar un método de pago',
  };

  public ngOnChanges() {
    if (this.control) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName)) {
          this.message = this.messageOpts[propertyName] ? this.messageOpts[propertyName] : this.messageOpts.default; 
          return;
        }
      }
    } else {
      if (this.customMessage !== '') {
        this.message = this.messageOpts[this.customMessage];
        return;
      }
    }

    this.message = '';
  }
}