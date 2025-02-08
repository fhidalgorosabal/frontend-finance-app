import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";


export class ConceptFormModel extends UntypedFormGroup {
  constructor() {
    super({
      id: new UntypedFormControl(''),
      description: new UntypedFormControl('', [ Validators.required ]),
      type: new UntypedFormControl(''),
    });
  }
}
