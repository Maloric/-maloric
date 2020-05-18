import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NumSelectorComponent } from './num-selector';
import { RANDOM_NUMBER } from '@maloric/testility';
import { IonicModule } from '@ionic/angular';

describe('NumSelector', () => {
    let fixture: ComponentFixture<NumSelectorComponent>;
    let component: NumSelectorComponent;
    let element: any;
    let value: number;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule],
            declarations: [NumSelectorComponent]
        });
        fixture = TestBed.createComponent(NumSelectorComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    const refresh = () => {
        component.ngOnChanges();
        fixture.detectChanges();
        value = parseInt(element.querySelector('.value').textContent, 10);
    };

    type NumSelectorProps = Partial<Omit<NumSelectorComponent, 'change'>>;
    const testIncrement = (props: NumSelectorProps, expected: number[]) => testChange(props, expected, '.plus');
    const testDecrement = (props: NumSelectorProps, expected: number[]) => testChange(props, expected, '.minus');

    const testChange = (props: NumSelectorProps, expected: number[], buttonSelector: '.plus' | '.minus') => {
        component.value = props.value;
        component.defaultValue = props.defaultValue;
        component.min = props.min;
        component.max = props.max;
        refresh();

        expected.forEach((x) => {
            element.querySelector(buttonSelector).click();
            refresh();
            expect(value).toBe(x);
        });
    };

    describe('when instantiated with no value and no default value', () => {
        beforeEach(() => {
            component.value = undefined;
            refresh();
        });

        it('should display 0', () => {
            expect(value).toBe(0);
        });
    });

    describe('when instantiated with a value and a default value', () => {
        let defaultValue: number;
        beforeEach(() => {
            defaultValue = RANDOM_NUMBER.getOne();
            component.value = undefined;
            component.defaultValue = defaultValue;
            refresh();
        });

        it('should display the default value', () => {
            expect(value).toBe(defaultValue);
        });
    });

    describe('when instantiated with a value', () => {
        let defaultValue: number;
        let actualValue: number;
        beforeEach(() => {
            defaultValue = RANDOM_NUMBER.getOne();
            actualValue = RANDOM_NUMBER.getOne();
            component.value = actualValue;
            component.defaultValue = defaultValue;
            refresh();
        });

        it('should display the actual value', () => {
            expect(value).toBe(actualValue);
        });
    });

    describe('when instantiated with a value of 0', () => {
        let defaultValue: number;
        let actualValue: number;
        beforeEach(() => {
            defaultValue = RANDOM_NUMBER.getOne();
            actualValue = 0;
            component.value = actualValue;
            component.defaultValue = defaultValue;
            refresh();
        });

        it('should display the actual value', () => {
            expect(value).toBe(actualValue);
        });
    });

    it('should handle plus', () => {
        testIncrement({}, [1, 2, 3]);
        testIncrement({ value: 1 }, [2, 3, 4]);
        testIncrement({ value: 3 }, [4, 5, 6]);
        testIncrement({ value: -2 }, [-1, 0, 1]);

        testIncrement({ defaultValue: 1 }, [2, 3, 4]);
        testIncrement({ defaultValue: 3 }, [4, 5, 6]);
        testIncrement({ defaultValue: -2 }, [-1, 0, 1]);

        testIncrement({ value: 1, max: 3 }, [2, 3, 3]);
        testIncrement({ value: -2, max: 0 }, [-1, 0, 0]);
    });

    it('should handle minus', () => {
        testDecrement({}, [-1, -2, -3]);
        testDecrement({ value: 10 }, [9, 8, 7]);
        testDecrement({ value: 3 }, [2, 1, 0]);
        testDecrement({ value: -2 }, [-3, -4, -5]);

        testDecrement({ defaultValue: 10 }, [9, 8, 7]);
        testDecrement({ defaultValue: 3 }, [2, 1, 0]);
        testDecrement({ defaultValue: -2 }, [-3, -4, -5]);

        testDecrement({ value: 5, min: 3 }, [4, 3, 3]);
        testDecrement({ value: 2, min: 0 }, [1, 0, 0]);
    });
});
