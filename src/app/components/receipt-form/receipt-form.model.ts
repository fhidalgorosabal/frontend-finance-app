import { FormControl, FormGroup, Validators } from "@angular/forms";


export class ReceiptFormModel extends FormGroup {
  constructor() {
    super({
      date: new FormControl('', [ Validators.required ]),

      concept: new FormControl('', [ Validators.required ]),

      amount: new FormControl('', [ Validators.required, Validators.min(1) ]),

      currency: new FormControl('', [ Validators.required ]),

      actual_amount: new FormControl(''),

      account: new FormControl('', [ Validators.required ]),

      description: new FormControl(''),
    });
  }
}
