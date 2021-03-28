import { FormGroup } from '@angular/forms';

interface ValueObj {
  email: string;
  password: string;
}

export interface IRegForm extends FormGroup {
  value: ValueObj;
}
