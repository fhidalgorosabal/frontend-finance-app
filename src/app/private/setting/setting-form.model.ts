import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";


export class SettingFormModel extends UntypedFormGroup {
  constructor() {
    super({
        companyCode: new UntypedFormControl('', [ Validators.required ]),
        companyName: new UntypedFormControl('', [ Validators.required ]),
        companyType: new UntypedFormControl('', [ Validators.required ]),
        defaultCurrency: new UntypedFormControl('', [ Validators.required ]),
        currentMonth: new UntypedFormControl('', [ Validators.required ]),
        currentYear: new UntypedFormControl('', [ Validators.required ]),
    });
  }
}
