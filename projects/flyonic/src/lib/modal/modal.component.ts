import { Component, HostListener, Input, TemplateRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'fly-modal-component',
    template: `
        <ng-template #defaultContentTemplate>
            <p>Missing contentTemplate property for Modal config.</p>
        </ng-template>
        <ng-template #defaultButtonsTemplate>
            <ion-button (click)="dismiss()">Close</ion-button>
        </ng-template>
        <ion-card class="modal" (click)="preventClose($event)">
            <ion-card-header>
                <ion-card-title>{{ title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ng-template [ngTemplateOutlet]="contentTemplate || defaultContentTemplate"></ng-template>
            </ion-card-content>
        </ion-card>
        <div class="buttons">
            <ng-template [ngTemplateOutlet]="buttonsTemplate || defaultButtonsTemplate"></ng-template>
        </div>
    `,
    styles: [
        `
            :host {
                background: none;
                padding-top: var(--ion-safe-area-top, 20px);
                padding-bottom: var(--ion-safe-area-bottom, 20px);
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .buttons {
                display: flex;
                flex-direction: column;
            }

            .buttons ion-button,
            .buttons button,
            .buttons a {
                margin: 0 var(--ion-safe-area-bottom, 20px) var(--ion-safe-area-bottom, 20px);
            }
        `
    ]
})
export class ModalComponent {
    @Input()
    title: string = '';

    @Input()
    contentTemplate: TemplateRef<any>;

    @Input()
    buttonsTemplate: TemplateRef<any>;

    @HostListener('click')
    onClick() {
        this.modalController.dismiss();
    }

    preventClose(e) {
        e.stopPropagation();
    }

    dismiss(...args: any[]) {
        this.modalController.dismiss(...args);
    }

    constructor(private modalController: ModalController) {}
}
