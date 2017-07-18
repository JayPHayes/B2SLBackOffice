import { B2slBackOfficePage } from './app.po';

describe('b2sl-back-office App', () => {
  let page: B2slBackOfficePage;

  beforeEach(() => {
    page = new B2slBackOfficePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
