import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";


export class AccountFormModel extends UntypedFormGroup {
  constructor() {
    super({
        code: new UntypedFormControl('', [ Validators.required, Validators.maxLength(20) ]),
        description: new UntypedFormControl('', [ Validators.required ]),
        currency: new UntypedFormControl('', [ Validators.required ]),
        bank: new UntypedFormControl(''),
        active: new UntypedFormControl(''),
    });
  }
}
