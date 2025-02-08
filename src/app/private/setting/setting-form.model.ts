import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";


export class SettingFormModel extends UntypedFormGroup {
  constructor() {
    super({
        company_code: new UntypedFormControl('', [ Validators.required ]),
        company_name: new UntypedFormControl('', [ Validators.required ]),
        company_type: new UntypedFormControl('', [ Validators.required ]),
        default_currency: new UntypedFormControl('', [ Validators.required ]),
        current_month: new UntypedFormControl('', [ Validators.required ]),
        current_year: new UntypedFormControl('', [ Validators.required ]),
    });
  }
}
