import { FormGroup } from '@angular/forms';

interface ValueObj {
  email: string;
  password: string;
}

export interface RegFormModel extends FormGroup {
  value: ValueObj;
}
