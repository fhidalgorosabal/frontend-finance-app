import { FormControl, FormGroup, Validators } from "@angular/forms";


export class BankFormModel extends FormGroup {
  constructor() {
    super({
        swift: new FormControl('', [ Validators.required, Validators.maxLength(25) ]),
        bank_name: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
        cis: new FormControl('', [ Validators.required, Validators.maxLength(10) ]),
        branch_name: new FormControl('', [ Validators.maxLength(100) ]),
        address: new FormControl('', [ Validators.maxLength(200) ]),
        phone_number: new FormControl('', [ Validators.maxLength(15) ]),
        email: new FormControl('', [ Validators.email, Validators.maxLength(100) ]),
        active: new FormControl(''),
    });
  }
}
