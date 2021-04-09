import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import RegistrationService from '../services/registration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IRegForm } from '../models/RegFormsModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RegistrationComponent implements OnInit, OnChanges {
  @Output() clickAutnBtnEvent = new EventEmitter<string>();
  @Input() isShow;
  modalName = 'Registration';
  isLoginTemplate = false;
  registrationForm: IRegForm;
  imgURL: ArrayBuffer | string = '../../../../assets/img/no-avatar.png';
  imagePath: File;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes): void {
    let data = {...changes};
    if (data.previousValue !== undefined) {
      this.isShow = data.isShow.currentChanges;
    }
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

  preview(files: File): void {
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

  closeModal(): void {
    this.isShow = '';
    this.clickAutnBtnEvent.emit(this.isShow);
  }

  changeModal(): void {
    this.modalName = this.modalName === 'Registration' ? 'Login' : 'Registration';
    this.modalName === 'Registration' ? this.registrationForm.controls['name'].enable() : this.registrationForm.controls['name'].disable();
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

    if (!this.isLoginTemplate) {
      this.registrationService.singUp(
        this.registrationForm.value.name,
        this.registrationForm.value.password,
        this.registrationForm.value.email,
        this.imagePath
      );
    } else {
      this.registrationService.logIn(
        this.registrationForm.value.password,
        this.registrationForm.value.email
      );
    }
  }
}
