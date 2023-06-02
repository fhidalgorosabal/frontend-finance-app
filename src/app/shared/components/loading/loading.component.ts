import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="flex justify-content-center flex-wrap my-8">
      <div class="flex align-items-center justify-content-center">
        <i class="pi pi-spin pi-spinner text-6xl"></i>
      </div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent { }
