import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { RANDOM_NUMBER, RANDOM_STRING, TestDataFactory } from '@maloric/testility';
import { ListComponent } from './list';
import { IonicModule } from '@ionic/angular';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
    let element: any;
    let items: any[];
    let groups: any[];

    let testData: {
        name: string;
        cost: number;
    }[];

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ListComponent],
            imports: [IonicModule],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        testData = TEST_DATA_FACTORY.getMany(10);
    }));

    const TEST_DATA_FACTORY = new TestDataFactory<{
        name: string;
        cost: number;
    }>(() => ({
        name: RANDOM_STRING.getOne(),
        cost: RANDOM_NUMBER.getOne()
    }));

    function refresh() {
        component.ngOnChanges();
        fixture.detectChanges();
        items = fixture.nativeElement.querySelectorAll('ion-item');
        groups = fixture.nativeElement.querySelectorAll('ion-item-group');
    }

    describe('when items are provided', () => {
        beforeEach(() => {
            component.items = testData;
            refresh();
        });

        it('should display one row for each item provided', () => {
            expect(items.length).toEqual(testData.length);
            for (let i = 0; i < testData.length; i++) {
                expect(items[i].textContent).toContain(testData[i].name);
            }
        });

        it('should add an alt class to every other row', () => {
            let altRows = [...fixture.nativeElement.querySelectorAll('ion-item.alt')].map(x => x.textContent);
            let expected = [...items].filter((item, i) => i % 2 === 0).map(x => x.textContent);
            expect(altRows).toEqual(expected);
        });

        it('should not display a divider', () => {
            expect(groups.length).toEqual(1);
            expect(groups[0].querySelector('ion-item-divider')).toBeFalsy();
        });
    });

    describe('when grouped items are provided', () => {
        let groupedTestData: any[];
        beforeEach(() => {
            groupedTestData = testData as any[];
            groupedTestData[0].group = 'a';
            groupedTestData[1].group = 'a';
            groupedTestData[2].group = 'a';
            groupedTestData[3].group = 'b';
            groupedTestData[4].group = 'b';
            groupedTestData[5].group = 'b';
            groupedTestData[6].group = 'c';
            groupedTestData[7].group = 'c';
            groupedTestData[8].group = 'a';
            groupedTestData[9].group = 'a';
            component.groupBy = 'group';
            component.items = groupedTestData;

            refresh();
        });

        it('should display one row for each item provided', () => {
            expect(items.length).toEqual(testData.length);
        });

        it('should display one group section per unique group', () => {
            expect(groups.length).toEqual(3);
            expect(groups[0].querySelector('ion-item-divider').textContent).toEqual('a');
            expect(groups[1].querySelector('ion-item-divider').textContent).toEqual('b');
            expect(groups[2].querySelector('ion-item-divider').textContent).toEqual('c');

            function checkItems(groupIndex: number, indexes: number[]) {
                for (let i = 0; i < indexes.length; i++) {
                    let text = groups[groupIndex].querySelectorAll('ion-item')[i].textContent;
                    let rowData = groupedTestData[indexes[i]];
                    expect(text).toContain(rowData.name);
                }
            }

            checkItems(0, [0, 1, 2, 8, 9]);
            checkItems(1, [3, 4, 5]);
            checkItems(2, [6, 7]);
        });
    });

    describe('when grouped items are provided with a different group name field', () => {
        let groupedTestData: any[];
        beforeEach(() => {
            groupedTestData = testData as any[];
            groupedTestData[0].groupKey = 'a';
            groupedTestData[0].groupName = 'a1';
            groupedTestData[1].groupKey = 'a';
            groupedTestData[1].groupName = 'a1';
            groupedTestData[2].groupKey = 'a';
            groupedTestData[2].groupName = 'a1';
            groupedTestData[3].groupKey = 'b';
            groupedTestData[3].groupName = 'b1';
            groupedTestData[4].groupKey = 'b';
            groupedTestData[4].groupName = 'b1';
            groupedTestData[5].groupKey = 'b';
            groupedTestData[5].groupName = 'b1';
            groupedTestData[6].groupKey = 'c';
            groupedTestData[6].groupName = 'c1';
            groupedTestData[7].groupKey = 'c';
            groupedTestData[7].groupName = 'c1';
            groupedTestData[8].groupKey = 'a';
            groupedTestData[8].groupName = 'a1';
            groupedTestData[9].groupKey = 'a';
            groupedTestData[9].groupName = 'a1';
            component.groupBy = 'groupKey';
            component.groupNameField = 'groupName';
            component.items = groupedTestData;

            refresh();
        });

        it('should display one row for each item provided', () => {
            expect(items.length).toEqual(testData.length);
        });

        it('should display one group section per unique group', () => {
            expect(groups.length).toEqual(3);
            expect(groups[0].querySelector('ion-item-divider').textContent).toEqual('a1');
            expect(groups[1].querySelector('ion-item-divider').textContent).toEqual('b1');
            expect(groups[2].querySelector('ion-item-divider').textContent).toEqual('c1');

            function checkItems(groupIndex: number, indexes: number[]) {
                for (let i = 0; i < indexes.length; i++) {
                    let text = groups[groupIndex].querySelectorAll('ion-item')[i].textContent;
                    let rowData = groupedTestData[indexes[i]];
                    expect(text).toContain(rowData.name);
                }
            }

            checkItems(0, [0, 1, 2, 8, 9]);
            checkItems(1, [3, 4, 5]);
            checkItems(2, [6, 7]);
        });
    });
});
