import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";


export class BankFormModel extends UntypedFormGroup {
  constructor() {
    super({
        swift: new UntypedFormControl('', [ Validators.required, Validators.maxLength(25) ]),
        bankName: new UntypedFormControl('', [ Validators.required, Validators.maxLength(100) ]),
        cis: new UntypedFormControl('', [ Validators.required, Validators.maxLength(10) ]),
        branchName: new UntypedFormControl('', [ Validators.maxLength(100) ]),
        address: new UntypedFormControl('', [ Validators.maxLength(200) ]),
        phoneNumber: new UntypedFormControl('', [ Validators.maxLength(15) ]),
        email: new UntypedFormControl('', [ Validators.email, Validators.maxLength(100) ]),
        active: new UntypedFormControl(''),
    });
  }
}
