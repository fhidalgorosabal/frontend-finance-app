import { FormControl, FormGroup, Validators } from "@angular/forms";


export class ConceptFormModel extends FormGroup {
  constructor() {
    super({
      id: new FormControl(''),
      description: new FormControl('', [ Validators.required ]),
      type: new FormControl(''),
    });
  }
}
