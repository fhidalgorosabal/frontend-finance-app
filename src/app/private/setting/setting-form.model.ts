import { FormControl, FormGroup, Validators } from "@angular/forms";


export class SettingFormModel extends FormGroup {
  constructor() {
    super({
        company_code: new FormControl('', [ Validators.required ]),
        company_name: new FormControl('', [ Validators.required ]),
        company_type: new FormControl('', [ Validators.required ]),
        default_currency: new FormControl('', [ Validators.required ]),
        current_month: new FormControl('', [ Validators.required ]),
        current_year: new FormControl('', [ Validators.required ]),
    });
  }
}
