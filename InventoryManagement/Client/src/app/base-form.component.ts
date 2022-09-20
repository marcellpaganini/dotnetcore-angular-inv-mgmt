import { Component } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  template: ''
})

export class BaseFormComponent {
  form!: FormGroup;

  handleErrors = (error: any, form: FormGroup<any>) => {
    if (error instanceof HttpErrorResponse) {
      const errorMessages = error.error;
      if (error.status === 400) {
        const errorTitles = Object.keys(errorMessages.errors);

        for (let title in errorTitles) {
          const errorTitle = errorTitles[Number(title)];
          const formControl = form.controls[errorTitle.toLowerCase()];

          if (formControl) {
            formControl.setErrors({
              serverError: errorMessages.errors[errorTitle][0]
            })
          }
        }
      }
    }
  }
}
