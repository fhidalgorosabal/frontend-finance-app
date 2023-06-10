import { FormControl, FormGroup, Validators } from "@angular/forms";


export class AccountFormModel extends FormGroup {
  constructor() {
    super({
        code: new FormControl('', [ Validators.required, Validators.maxLength(10) ]),
        description: new FormControl('', [ Validators.required ]),
        currency: new FormControl('', [ Validators.required ]),
        active: new FormControl(''),
    });
  }
}
