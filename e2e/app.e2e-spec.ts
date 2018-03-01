import { WebappPage } from './app.po';

describe('Webapp App', () => {

  let page: WebappPage;

  beforeEach(() => {
    page = new WebappPage();
  });

  it('should go to login form and submit it', (done) => {
    page.navigateTo().then(() => {
      return page.clickOnLoginButton();
    }).then(() => {
      expect<any>(page.getFormTitle()).toEqual('Which provider do you want to use?');
      return page.enterUsername('admin');
    }).then(() => {
      return page.enterPassword('admin');
    }).then(() => {
      return page.submitForm();
    }).then(() => {
      expect(page.getErrorMessage()).toContain('Unexpected error');
      done();
    });
  });

});
