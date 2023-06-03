import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ILabel } from 'src/app/interfaces/label.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @Input() title: string = '';

  @Input() records: any[] = [];

  @Output() details = new EventEmitter<ACTION_TYPE>();

  @Output() delete = new EventEmitter<number>();
  
  @Input() columnData: ILabel[] = [];

  @Input() arrayRows = [5,10,25,100];

  filter = false;

  @Input() rows = 5;

  fields: string[] = [];

  first = 0;

  pageReport = 'Mostrando {first} a {last} de {totalRecords} elementos';

  constructor( private tableService: TableService) {
    this.fields = this.columnData.map( col => this.string(col.value) );  
   }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.records ? this.first === (this.records.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.records ? this.first === 0 : true;
  }

  showDetails(id?: number) {
    if (id) {
      this.tableService.setDetailId(id);
    }
    const action = id ? ACTION_TYPE.DETAIL : ACTION_TYPE.CREATE;
    this.details.emit(action);
  }  

  confirmDelete(id?: number) {
    this.delete.emit(id);
  }

  showFilter() {
    this.filter = !this.filter;
  }

  string(field: string | number): string {
    return String(field);
  }

}
