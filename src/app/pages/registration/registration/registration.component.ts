import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '@app/pages/registration/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  show = false;

  login = false;

  password: string;

  email: string;

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {}

  closeReg(): void {
    this.show = false;
  }

  goToSignIn(): void {
    this.login = !this.login;
  }

  addData(): void {
    this.registrationService.addData(this.password, this.email);
  }

  loginData(): void {
    this.registrationService.login(this.password, this.email);
  }
}
