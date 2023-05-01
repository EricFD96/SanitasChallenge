
import { browser } from 'protractor';

describe('My application', () => {
  beforeAll(() => {
    browser.get('');
  });

  it('should have the correct title', async () => {
    expect(await browser.getTitle()).toEqual('Images');
  });
});