import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Modal {
    constructor(private modalController: ModalController) {}

    async show(config: ModalConfig) {
        let modal = await this.modalController.create({
            ...config,
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
                }
            }
        });

        modal.present();
    }
}

export type ModalConfig = Pick<ModalOptions, 'component'> & {
    beforeDismiss?: any;
    afterDismiss?: any;
};
