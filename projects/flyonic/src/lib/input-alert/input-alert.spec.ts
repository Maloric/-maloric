import { MockPromiseWrapper, RANDOM_STRING } from '@maloric/testility';
import { InputAlert } from './input-alert';

describe('InputAlert', () => {
  let unit: InputAlert;
  let mockAlertController: any;
  let mockAlert: MockPromiseWrapper<any>;
  let mockValidationAlert: MockPromiseWrapper<any>;
  let value: string;

  beforeEach(() => {
    mockAlert = new MockPromiseWrapper();
    mockAlert.result = jasmine.createSpyObj('alertSpy', ['present']);

    mockValidationAlert = new MockPromiseWrapper();
    mockValidationAlert.result = jasmine.createSpyObj('validationAlertSpy', ['present']);

    mockAlertController = {
      create: jasmine.createSpy().and.returnValues(mockAlert.promise, mockValidationAlert.promise)
    };
    unit = new InputAlert(mockAlertController);
  });

  describe('when show is called', () => {
    let result: Promise<string>;
    let mockData: any;
    beforeEach(() => {
      const token = RANDOM_STRING.getOne();
      mockData = {
        header: `HEADER_${token}`,
        message: `MESSAGE_${token}`,
        defaultValue: `DEFAULT_VALUE_${token}`,
        type: 'text',
        required: true
      };
      result = unit.show(mockData.header, mockData.message, mockData.defaultValue, mockData.type, mockData.required);
    });

    it('should create and present the new alert', async () => {
      expect(mockAlertController.create).toHaveBeenCalled();

      const config = mockAlertController.create.calls.mostRecent().args[0];

      expect(config.header).toEqual(mockData.header);
      expect(config.message).toEqual(mockData.message);

      expect(config.inputs.length).toBe(1);
      expect(config.inputs[0].type).toBe('text');
      expect(config.inputs[0].name).toBe('value');
      expect(config.inputs[0].value).toBe(mockData.defaultValue);
      const btn = config.buttons.find((x: any) => !!x.handler);
      expect(btn).toBeTruthy();

      await mockAlert.resolve(mockAlert.result);
      expect(mockAlert.result.present).toHaveBeenCalled();

      value = RANDOM_STRING.getOne();
      btn.handler({ value });

      const actualValue = await result;
      expect(actualValue).toEqual(value);
    });

    it('should alert the user if they don\'t provide a required value', async (done) => {
      await mockAlert.resolve(mockAlert.result);
      expect(mockAlert.result.present).toHaveBeenCalled();

      const config = mockAlertController.create.calls.mostRecent().args[0];
      const btn = config.buttons.find((x: any) => !!x.handler);

      btn.handler({ value: '' });

      expect(mockAlertController.create).toHaveBeenCalledTimes(2);
      const validationConfig = mockAlertController.create.calls.mostRecent().args[0];
      expect(validationConfig.message).toEqual( "Value can't be blank.");
      
      await mockValidationAlert.resolve(mockValidationAlert.result);

      setTimeout(() => {
        expect(mockValidationAlert.result.present).toHaveBeenCalled();
        done();
      },0)

    });
  });
});
