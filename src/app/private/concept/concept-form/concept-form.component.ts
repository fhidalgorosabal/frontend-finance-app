import { 
  Component, 
  ChangeDetectionStrategy, 
  OnDestroy, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConceptFormModel } from './concept-form.model';
import { ILabel } from 'src/app/interfaces/label.interface';
import { IConcept } from 'src/app/interfaces/concept.interface';

@Component({
  selector: 'app-concept-form',
  templateUrl: './concept-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConceptFormComponent implements OnInit, OnDestroy {

  @Input() conceptForm = new ConceptFormModel();

  @Input() concept?: IConcept;

  @Output() formState = new EventEmitter<ConceptFormModel>();

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.conceptForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => this.formState.emit(this.conceptForm)
    );
    this.getDetailData();
  }

  getDetailData(): void {
    if (this.concept) {
      this.conceptForm.setValue({
        id: this.concept.id,
        description: this.concept.description,
        type: this.concept.type
      });
    }
  }

  isValidField(field: string): boolean {
    return this.conceptForm.controls[field].touched && this.conceptForm.controls[field].invalid;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
