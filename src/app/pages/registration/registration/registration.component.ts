import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { IRegForm } from '../models/RegFormsModel';
import { IFileModel } from '../models/FileModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegistrationComponent implements OnInit {
  @ViewChild('avatar') avatar;
  @Output() clickAutnBtnEvent = new EventEmitter<string>();
  @Input() isShow;
  modalName = 'Registration';
  isLoginTemplate = false;
  registrationForm: IRegForm;
  imgURL: ArrayBuffer | string = '../../../../assets/img/no-avatar.png';
  imagePath: IFileModel[];

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {}

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
      email: [
        '',
        [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });
  }

  preview(files: IFileModel[]): void {
    const mimeType: string = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
      this.avatar.nativeElement.src = this.imgURL;
    };
  }

  closeModal(): void {
    this.isShow = '';
    this.clickAutnBtnEvent.emit(this.isShow);
  }

  changeModal(): void {
    this.modalName = this.modalName === 'Registration' ? 'Login' : 'Registration';
    this.isLoginTemplate = !this.isLoginTemplate;
    if (this.isLoginTemplate) {
      this.registrationForm.controls.name.disable();
    } else {
      this.registrationForm.controls.name.enable();
    }
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
