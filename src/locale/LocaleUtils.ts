export class LocaleUtils {

  static getCurrentLanguage(): string {
    return (window.localStorage.language || window.navigator.language).split('-')[0];
  }

  static switchLanguage(): void {
    const currentLanguage = LocaleUtils.getCurrentLanguage();
    if (currentLanguage === 'en') {
      window.localStorage.language = 'fr';
    } else {
      window.localStorage.language = 'en';
    }
    window.location.reload();
  }

}
