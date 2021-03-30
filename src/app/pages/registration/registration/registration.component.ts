import { Component, OnInit } from '@angular/core';
import RegistrationService from '@app/pages/registration/services/registration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IRegForm } from '../models/RegFormsModel';
import { IFileModel } from '../models/FileModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export default class RegistrationComponent implements OnInit {
  modalName = 'Registration';
  isLoginTemplate = false;
  isShow = false;
  registrationForm: IRegForm;
  imgURL: ArrayBuffer | string = '../../../assets/no-avatar.png';
  imagePath: string | any[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z].*$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });
  }

  preview(files: IFileModel[]): void {
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

  showReg(): void {
    this.isShow = true;
  }

  closeModal(): void {
    this.isShow = false;
  }

  changeModal(): void {
    this.modalName = this.modalName === 'Registration' ? 'Login' : 'Registration';
    this.isLoginTemplate = !this.isLoginTemplate;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registrationForm.controls[controlName];

    return control.invalid && control.touched;
  }

  addUserData(): void {
    const { controls } = this.registrationForm;

    if (this.registrationForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());

      return;
    }

    if (this.isLoginTemplate) {
      RegistrationService.signIn(
        this.registrationForm.value.name,
        this.registrationForm.value.password,
        this.registrationForm.value.email,
        this.imgURL
      );
    } else {
      RegistrationService.logIn(
        this.registrationForm.value.name,
        this.registrationForm.value.password,
        this.registrationForm.value.email,
        this.imgURL
      );
    }
  }
}
