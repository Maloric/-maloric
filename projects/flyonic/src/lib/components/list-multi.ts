import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ArmyBuilderConfig } from '../../global/config';

@Component({
  selector: 'abs-multi-list',
  template: `
    <ng-template #defaultMultiTemplate let-item="item">
      <div class="itemName">
        <span>{{ item.name }} x {{ item.quantity }}</span>
      </div>
      <div class="itemCost">{{ item[costField] }}{{ config.pointsSuffix }}</div>
      <div class="itemButtons">
        <ion-button (click)="minusClicked($event, item)" [disabled]="item.quantity <= 0">-</ion-button>
        <ion-button (click)="plusClicked($event, item)">+</ion-button>
      </div>
    </ng-template>
    <abs-list
      [template]="template || defaultMultiTemplate"
      [items]="items"
      [getRouterLink]="getRouterLink"
      [costField]="costField"
      [activeStyleField]="activeStyleField"
      [showDelete]="false"
      (itemSelect)="itemSelect.emit($event)"
    ></abs-list>
  `
})
export class MultiListComponent {
  @Input() template: TemplateRef<any>;
  @Input() items: { name: string; cost: number }[];
  @Input() getRouterLink: (item: any) => string[];
  @Input() costField = 'cost';
  @Input() activeStyleField = null;

  @Output() itemSelect = new EventEmitter();
  @Output() increment = new EventEmitter();
  @Output() decrement = new EventEmitter();

  constructor(public config: ArmyBuilderConfig) {}

  plusClicked(e: any, item: any) {
    this.increment.emit(item);
    e.stopPropagation();
  }

  minusClicked(e: any, item: any) {
    this.decrement.emit(item);
    e.stopPropagation();
  }
}
