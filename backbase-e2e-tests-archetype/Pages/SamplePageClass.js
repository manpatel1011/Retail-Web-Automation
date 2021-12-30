/* global browser, $, $$ */
/**
 * This is an example of a simple Page Object.
 * In this approach, the web elements are defined as part
 * of the constructor of the class SamplePageClass
 */

class SamplePageClass {
  constructor() {
    this.header = $$('h1').first();
    this.infoLink = $$('a').first();
    this.ianaLogo = $('img[alt="Homepage"]');
  }

  // Actions
  async get() {
    await browser.get(browser.baseUrl);
  }

  async clickMoreInfoLink() {
    await this.infoLink.click();
  }

  async getHeaderText() {
    const text = await this.infoLink.getText();
    // any action with text can be here
    return text;
  }
}

module.exports = SamplePageClass;
