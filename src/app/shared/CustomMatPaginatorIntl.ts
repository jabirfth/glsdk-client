import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';
import { LocaleUtils } from '../../locale/LocaleUtils';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations(): void {
    const currentLanguage = LocaleUtils.getCurrentLanguage();
    if (currentLanguage === 'fr') {
      this.itemsPerPageLabel = 'nb par page';
      this.nextPageLabel = 'page suivante';
      this.previousPageLabel = 'page précédente';
    }

  }
}
