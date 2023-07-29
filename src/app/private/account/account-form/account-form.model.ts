import { FormControl, FormGroup, Validators } from "@angular/forms";


export class AccountFormModel extends FormGroup {
  constructor() {
    super({
        code: new FormControl('', [ Validators.required, Validators.maxLength(20) ]),
        description: new FormControl('', [ Validators.required ]),
        currency: new FormControl('', [ Validators.required ]),
        bank: new FormControl('', [ Validators.required ]),
        active: new FormControl(''),
    });
  }
}
