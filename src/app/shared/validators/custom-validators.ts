import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static notOnlyBlankSpace(c: FormControl): ValidationErrors | null {
    return c.value.replace(/\s/g, '').length ? null : { valid: false };
  }

  static number(c: FormControl) {
    const NUM_REGEXP = /^[0-9]*$/;
    return NUM_REGEXP.test(c.value) ? null : { number: { valid: false } };
  }

  static text(c: FormControl) {
    const TEXT_REGEXP = /^[A-Za-z0-9 .]*$/;
    return TEXT_REGEXP.test(c.value) ? null : { textAndNumbers: { valid: false } };
  }
}
