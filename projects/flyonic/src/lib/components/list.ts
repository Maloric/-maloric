import { Component, EventEmitter, Input, Output, TemplateRef, OnChanges } from '@angular/core';

interface ItemGroups {
    [key: string]: {
        displayName: string;
        items: CostableItem[];
    };
}

@Component({
    selector: 'fly-list',
    template: `
        <ng-template #defaultTemplate let-item="item">
            <div class="itemName">
                <span>{{ item.name }}</span>
            </div>
        </ng-template>
        <ion-list>
            <ion-item-group *ngFor="let groupKey of groupKeys">
                <ion-item-divider *ngIf="groupKey !== 'NONE'">
                    <ion-label>{{ groups[groupKey].displayName }}</ion-label>
                </ion-item-divider>
                <ion-item-sliding *ngFor="let item of groups[groupKey].items; let i = index" lines="full" #itemSliding>
                    <ion-item
                        *ngIf="getRouterLink"
                        [routerLink]="getRouterLink(item)"
                        lines="full"
                        [class.alt]="i % 2 === 0"
                        [class.active]="!!activeStyleField && !!item[activeStyleField]"
                    >
                        <ng-template
                            [ngTemplateOutlet]="template || defaultTemplate"
                            [ngTemplateOutletContext]="{ item: item }"
                        ></ng-template>
                    </ion-item>
                    <ion-item
                        *ngIf="!getRouterLink"
                        lines="full"
                        [class.alt]="i % 2 === 0"
                        [class.active]="!!activeStyleField && !!item[activeStyleField]"
                        (click)="itemSelect.emit(item)"
                    >
                        <ng-template
                            [ngTemplateOutlet]="template || defaultTemplate"
                            [ngTemplateOutletContext]="{ item: item }"
                        ></ng-template>
                    </ion-item>
                    <ion-item-options side="end" *ngIf="showDelete">
                        <ion-item-option class="delete" (click)="deleteItem.emit(item)"
                            ><ion-icon name="trash"></ion-icon
                        ></ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-item-group>
        </ion-list>
    `
})
export class ListComponent implements OnChanges {
    constructor() {}
    @Input() template: TemplateRef<any>;
    @Input() items: CostableItem[] = [];
    @Input() getRouterLink: (item: any) => string[];
    @Input() groupBy: string = null;
    @Input() showDelete = true;
    @Input() activeStyleField: string = null;
    @Input() groupNameField: string = null;

    @Output() itemSelect = new EventEmitter();
    @Output() deleteItem = new EventEmitter();

    groups: ItemGroups = {
        NONE: { displayName: '', items: [] }
    };

    groupKeys: string[] = [];

    ngOnChanges(): void {
        this.groupKeys = [];
        this.groups = this.items.reduce((groups: ItemGroups, item: CostableItem) => {
            const groupKey = item[this.groupBy] || 'NONE';
            const groupName = item[this.groupNameField || this.groupBy];
            if (!groups[groupKey]) {
                groups[groupKey] = {
                    displayName: groupName,
                    items: []
                };
                this.groupKeys.push(groupKey);
            }
            groups[groupKey].items.push(item);
            return groups;
        }, {});
    }
}

export interface CostableItem {
    name: string;
    cost: number;
}
