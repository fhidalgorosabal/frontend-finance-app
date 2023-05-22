import { FormControl, FormGroup, Validators } from "@angular/forms";


export class ReceiptForm extends FormGroup {
  constructor() {
    super({
      date: new FormControl('', [ Validators.required ]),

      concept_id: new FormControl('', [ Validators.required ]),

      description: new FormControl(''),

      amount: new FormControl('', [ Validators.required, Validators.min(1) ]),

      currency_id: new FormControl('', [ Validators.required ]),

      actual_amount: new FormControl(''),
    });
  }
}
