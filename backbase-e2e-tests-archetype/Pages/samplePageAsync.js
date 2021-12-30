/* global browser, $, $$, utils */
/**
 * This is an example of a simple Page Object.
 * In this approach, web elements are defined as part
 * of constructor property of prototype object samplePage.
 */

module.exports = (function () {
  const samplePage = function () {
    /* Desktop */
    this.header = $$('h1').first();
    this.infoLink = $$('a').first();
    this.ianaLogo = $('img[alt="Homepage"]');
    /* Mobile */
  };

  samplePage.prototype = {
    async get() {
      await browser.driver.get('http://www.example.com/');
    },

    async clickMoreInfoLink() {
      await this.infoLink.click();
      await utils.waitUntilVisible(this.ianaLogo);
    },

    async getHeaderText() {
      const text = await this.infoLink.getText();
      // any action with text can be here
      return text;
    },

  };

  return samplePage;
}());
