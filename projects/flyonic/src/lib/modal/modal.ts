import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { Injectable, TemplateRef } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
    providedIn: 'root'
})
export class Modal {
    constructor(private modalController: ModalController) {}

    async show(config: ModalConfig) {
        let modal = await this.modalController.create({
            component: config.component || ModalComponent,
            backdropDismiss: true,
            showBackdrop: true,
            componentProps: {
                dismiss: (...args: any[]) => {
                    if (config.beforeDismiss) {
                        let shouldDismiss = config.beforeDismiss(...args);
                        if (shouldDismiss === false) {
                            return;
                        }
                    }
                    modal.dismiss();
                    if (config.afterDismiss) {
                        config.afterDismiss();
                    }
                },
                ...config.props
            }
        });

        modal.present();
    }
}

export type ModalConfig = Partial<Pick<ModalOptions, 'component'>> & {
    beforeDismiss?: any;
    afterDismiss?: any;
    props: {
        contentTempate?: TemplateRef<any>;
        buttonsTemplate?: TemplateRef<any>;
        title?: string;
    };
};
