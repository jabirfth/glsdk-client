import { browser, element, by } from 'protractor';

export class WebappPage {

  navigateTo() {
    return browser.get('/');
  }

  clickOnLoginButton() {
    return element(by.css('.icon-button button[title=Login]')).click();
  }

  getFormTitle() {
    return element(by.css('app-login mat-card-title')).getText();
  }

  enterUsername(username: string) {
    return element(by.css('input[name=username]')).sendKeys(username);
  }

  enterPassword(password: string) {
    return element(by.css('input[name=password]')).sendKeys(password);
  }

  submitForm() {
    return element(by.css('button[type=submit]')).click();
  }

  getErrorMessage() {
    return element(by.css('div.error')).getText();
  }

}
