import { Component } from '@angular/core';
import RegistrationService from '@app/pages/registration/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export default class RegistrationComponent {
  isShow = false;

  isReg = true;

  password: string;

  email: string;

  constructor(private registrationService: RegistrationService) {}

  showReg(): void {
    this.isShow = true;
  }

  closeReg(): void {
    this.isShow = false;
  }

  goToSignIn(): void {
    this.isReg = !this.isReg;
  }

  addRegData(): void {
    this.registrationService.addRegData(this.password, this.email);
  }

  loginData(): void {
    this.registrationService.login(this.password, this.email);
  }
}
