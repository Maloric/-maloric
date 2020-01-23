import { MockPromiseWrapper, RANDOM_STRING } from 'testility';
import { Alert } from './alert';

describe('Alert', () => {
  let unit: Alert;
  let mockAlertController: any;
  let mockAlert: MockPromiseWrapper<any>;

  beforeEach(() => {
    mockAlert = new MockPromiseWrapper();
    mockAlert.result = jasmine.createSpyObj('alertSpy', ['present']);
    mockAlertController = {
      create: jasmine.createSpy().and.returnValue(mockAlert.promise)
    };
    unit = new Alert(mockAlertController);
  });

  describe('when show is called', () => {
    let mockData: any;
    beforeEach(() => {
      const token = RANDOM_STRING.getOne();
      mockData = {
        header: `HEADER_${token}`,
        message: `MESSAGE_${token}`
      };
      unit.show(mockData.header, mockData.message);
    });

    it('should create and present the new alert', async () => {
      expect(mockAlertController.create).toHaveBeenCalled();

      const config = mockAlertController.create.calls.mostRecent().args[0];

      expect(config.header).toEqual(mockData.header);
      expect(config.message).toEqual(mockData.message);
      expect(config.buttons[0].role).toEqual('cancel');
    });
  });
});
