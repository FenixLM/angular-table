import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  constructor() {}

  convertToFormData(formGroup: FormGroup): FormData {
    const formData = new FormData();

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      formData.append(key, control.value);
    });

    return formData;
  }
}
