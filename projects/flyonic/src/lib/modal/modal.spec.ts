import { Modal, ModalConfig } from './modal';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MockPromiseWrapper, RANDOM_OBJECT } from '@maloric/testility';

describe('ModalComponent', () => {
    let unit: Modal;
    let mockModalController: any;
    let mockConfig: ModalConfig;
    let mockCreatePromise = new MockPromiseWrapper();
    let mockCreatePromiseResult: any;

    @Component({
        selector: 'mock-modal-content',
        template: `<div>test</div>`
    })
    class MockModalContent extends ModalController {}

    beforeEach(() => {
        mockCreatePromiseResult = jasmine.createSpyObj('mockModal', ['present', 'dismiss']);
        mockConfig = {
            component: MockModalContent,
            beforeDismiss: jasmine.createSpy('beforeDismiss'),
            afterDismiss: jasmine.createSpy('afterDismiss')
        };
        mockModalController = {
            create: jasmine.createSpy('modalCreate').and.returnValue(mockCreatePromiseResult)
        };
        unit = new Modal(mockModalController);
    });

    describe('when show is called', () => {
        let config: any;
        let dismiss: any;
        beforeEach(() => {
            unit.show(mockConfig);
            expect(mockModalController.create).toHaveBeenCalled();

            config = mockModalController.create.calls.mostRecent().args[0];
            dismiss = config.componentProps.dismiss;
        });

        it('should create the modal with the right config', async () => {
            expect(config.component).toBe(mockConfig.component);
            expect(config.backdropDismiss).toBe(true);
            expect(config.showBackdrop).toBe(true);
        });

        describe('when the modal is presented to the user', () => {
            beforeEach(async () => {
                await mockCreatePromise.resolve(mockCreatePromiseResult);
                expect(mockCreatePromiseResult.present).toHaveBeenCalled();
            });

            it('should pass all dismiss arguments through', async () => {
                expect(mockConfig.beforeDismiss).not.toHaveBeenCalled();
                let args = RANDOM_OBJECT.getMany();
                dismiss(...args);
                expect(mockConfig.beforeDismiss).toHaveBeenCalledWith(...args);
            });

            describe('and beforeDismiss is not set', () => {
                beforeEach(() => {
                    delete mockConfig.beforeDismiss;
                });

                it('should dismiss the modal', () => {
                    dismiss();
                    expect(mockCreatePromiseResult.dismiss).toHaveBeenCalled();
                    expect(mockConfig.afterDismiss).toHaveBeenCalled();
                });
            });

            describe('and afterDismiss is not set', () => {
                beforeEach(() => {
                    delete mockConfig.afterDismiss;
                });

                it('should dismiss the modal', () => {
                    dismiss();
                    expect(mockCreatePromiseResult.dismiss).toHaveBeenCalled();
                });
            });

            describe('and beforeDismiss returns false', () => {
                beforeEach(() => {
                    mockConfig.beforeDismiss.and.returnValue(false);
                });

                it('should not dismiss the modal', () => {
                    dismiss();
                    expect(mockCreatePromiseResult.dismiss).not.toHaveBeenCalled();
                    expect(mockConfig.afterDismiss).not.toHaveBeenCalled();
                });
            });

            describe('and beforeDismiss returns true', () => {
                beforeEach(() => {
                    mockConfig.beforeDismiss.and.returnValue(true);
                });

                it('should dismiss the modal', () => {
                    dismiss();
                    expect(mockCreatePromiseResult.dismiss).toHaveBeenCalled();
                    expect(mockConfig.afterDismiss).toHaveBeenCalled();
                });
            });

            describe('and beforeDismiss returns nothing', () => {
                beforeEach(() => {
                    mockConfig.beforeDismiss.and.returnValue(undefined);
                });
                it('should dismiss the modal', () => {
                    dismiss();
                    expect(mockCreatePromiseResult.dismiss).toHaveBeenCalled();
                    expect(mockConfig.afterDismiss).toHaveBeenCalled();
                });
            });
        });
    });
});
