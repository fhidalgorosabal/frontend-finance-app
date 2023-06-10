import { FormControl, FormGroup, Validators } from "@angular/forms";


export class CurrencyFormModel extends FormGroup {
  constructor() {
    super({
        initials: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(4) ]),
        description: new FormControl('', [ Validators.required ]),
        exchange_rate: new FormControl('', [ Validators.required, Validators.min(1) ]),
        is_default: new FormControl(''),
        active: new FormControl(''),
    });
  }
}
