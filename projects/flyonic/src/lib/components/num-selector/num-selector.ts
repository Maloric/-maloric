import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
    selector: 'fly-num-selector',
    template: `
        <ion-button class="minus" (click)="decrement()">{{ minusLabel }}</ion-button>
        <div class="value">{{ value$ | async }}</div>
        <ion-button class="plus" (click)="increment()">{{ plusLabel }}</ion-button>
    `,
    styles: [
        `
            :host {
                display: flex;
            }
            .value {
                flex: 1 0 auto;
                text-align: center;
                align-self: center;
            }
        `
    ]
})
export class NumSelectorComponent implements OnChanges {
    @Input()
    value: number;

    @Input()
    min?: number;

    @Input()
    max?: number;

    @Input()
    defaultValue: number;

    @Input()
    plusLabel: string = '+';

    @Input()
    minusLabel: string = '-';

    @Output()
    change = new EventEmitter<number>();

    value$ = new ReplaySubject<number>();

    ngOnChanges() {
        if (isNaN(this.value)) {
            this.value = this.defaultValue || 0;
        }
        this.value$.next(this.value);
    }

    increment() {
        if ((!isNaN(this.max) && this.value < this.max) || isNaN(this.max)) {
            this.value++;
            this.update();
        }
    }

    decrement() {
        if ((!isNaN(this.min) && this.value > this.min) || isNaN(this.min)) {
            this.value--;
            this.update();
        }
    }

    private update() {
        this.value$.next(this.value);
        this.change.emit(this.value);
    }
}
