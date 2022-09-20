import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  template: ''
})

export class BaseFormComponent {
  form!: FormGroup<any>;

  handleErrors = (error: any) => {
    if (error instanceof HttpErrorResponse) {
      const errorMessages = error.error;
      if (error.status === 400) {
        const errorTitles = Object.keys(errorMessages.errors);

        for (let title in errorTitles) {
          const errorTitle = errorTitles[Number(title)];
          const formControl = this.form.controls[errorTitle.toLowerCase()];

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
