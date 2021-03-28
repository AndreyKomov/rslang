import { Component, OnInit } from '@angular/core';
import RegistrationService from '@app/pages/registration/services/registration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RegFormModel } from '../models/RegFormsModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export default class RegistrationComponent implements OnInit {
  modalName = 'Registration';

  isLoginTemp = false;

  isShow = false;

  reactiveForm: RegFormModel;

  submitName = 'Registration';

  constructor(private registrationService: RegistrationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.reactiveForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });
  }

  showReg(): void {
    this.isShow = true;
  }

  closeModal(): void {
    this.isShow = false;
  }

  changeModal(): void {
    this.modalName = this.modalName === 'Registration' ? 'Login' : 'Registration';
    this.submitName = this.submitName === 'Registration' ? 'Login' : 'Registration';
    this.isLoginTemp = !this.isLoginTemp;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  addUserData(): void {
    const { controls } = this.reactiveForm;

    if (this.reactiveForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());

      return;
    }

    if (this.isLoginTemp) {
      this.registrationService.addRegData(
        this.reactiveForm.value.password,
        this.reactiveForm.value.email
      );
    } else {
      this.registrationService.addLoginData(
        this.reactiveForm.value.password,
        this.reactiveForm.value.email
      );
    }
  }
}
