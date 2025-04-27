import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";


export class ReceiptFormModel extends UntypedFormGroup {
  constructor() {
    super({
      date: new UntypedFormControl('', [ Validators.required ]),

      concept: new UntypedFormControl('', [ Validators.required ]),

      amount: new UntypedFormControl('', [ Validators.required, Validators.min(1) ]),

      currency: new UntypedFormControl('', [ Validators.required ]),

      actualAmount: new UntypedFormControl(''),

      account: new UntypedFormControl('', [ Validators.required ]),

      description: new UntypedFormControl(''),
    });
  }
}
