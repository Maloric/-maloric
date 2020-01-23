import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'fly-multi-list',
    template: `
        <ng-template #defaultMultiTemplate let-item="item">
            <div class="itemName">
                <span>{{ item.name }} x {{ item.quantity }}</span>
            </div>
            <div class="itemButtons">
                <ion-button (click)="minusClicked($event, item)" [disabled]="item.quantity <= 0">-</ion-button>
                <ion-button (click)="plusClicked($event, item)">+</ion-button>
            </div>
        </ng-template>
        <fly-list
            [template]="template || defaultMultiTemplate"
            [items]="items"
            [getRouterLink]="getRouterLink"
            [activeStyleField]="activeStyleField"
            [showDelete]="false"
            (itemSelect)="itemSelect.emit($event)"
        ></fly-list>
    `
})
export class MultiListComponent {
    @Input() template: TemplateRef<any>;
    @Input() items: { name: string; cost: number }[];
    @Input() getRouterLink: (item: any) => string[];
    @Input() activeStyleField = null;

    @Output() itemSelect = new EventEmitter();
    @Output() increment = new EventEmitter();
    @Output() decrement = new EventEmitter();

    constructor() {}

    plusClicked(e: any, item: any) {
        this.increment.emit(item);
        e.stopPropagation();
    }

    minusClicked(e: any, item: any) {
        this.decrement.emit(item);
        e.stopPropagation();
    }
}
