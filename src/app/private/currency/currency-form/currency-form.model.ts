import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";


export class CurrencyFormModel extends UntypedFormGroup {
  constructor() {
    super({
        initials: new UntypedFormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(4) ]),
        description: new UntypedFormControl('', [ Validators.required ]),
        exchange_rate: new UntypedFormControl('', [ Validators.required, Validators.min(1) ]),
        is_default: new UntypedFormControl(''),
        active: new UntypedFormControl(''),
    });
  }
}
