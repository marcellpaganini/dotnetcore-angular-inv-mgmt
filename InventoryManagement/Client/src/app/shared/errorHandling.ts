import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";

export const handleErrors = (error: any, form: FormGroup<any>) => {
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
