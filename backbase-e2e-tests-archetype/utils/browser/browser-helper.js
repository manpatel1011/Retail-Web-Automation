module.exports = class BrowserHelper {

	/**
	 * @async
	 * @param {ElementFinder} elem
	 * @param {Number} timeout
	 * @returns {Promise<ElementFinder>}
	 */
	async waitUntilClickable(elem, timeout = 5000) {
		await browser.wait(EC.elementToBeClickable(elem), timeout).catch(err => err);
		return elem;
	}

	/**
	 *
	 * @async
	 * @param {ElementFinder} elem
	 * @param {Number} timeout
	 * @returns {promise.Promise<ElementFinder> | Promise<T | never>}
	 */
	async waitUntilVisible(elem, timeout = 10000) {
		await browser.wait(EC.presenceOf(elem), timeout);
		await browser.wait(EC.visibilityOf(elem), timeout);
		return elem;
	}

	/**
	 * @async
	 * @param {ElementFinder} elem
	 * @param {Number} timeout
	 * @returns {promise.Promise<ElementFinder> | Promise<T | never>}
	 */
	async waitUntilEnabled(elem, timeout = 5000) {
		await browser.wait($element.isEnabled, timeout).catch(error => error);
		return elem;
	}

	/**
	 * @async
	 * @param {ElementFinder} elem
	 * @param {Number} timeout
	 * @returns {Promise<*>}
	 */
	async waitUntilNotVisible(elem, timeout = 5000) {
		await browser.wait(EC.invisibilityOf(elem), timeout).catch(error => error);
	}

	/**
	 * @async
	 * @param {String} selector
	 * @param {Number} timeout
	 * @returns {Promise<void>}
	 */
	async waitUntilGone(elem, timeout = 1000) {
		await browser.wait(EC.stalenessOf(elem), timeout * 5);
	}

	/**
	 * @async
	 * @param {String} url
	 * @param {Number} timeout
	 * @returns {Promise<void>}
	 */
	async waitForUrlToBe(url, timeout = 1000) {
		await browser.wait(EC.urlIs(url), timeout * 5);
	}

	/**
	 * @async
	 * @param {String} url
	 * @param {Number} timeout
	 * @returns {Promise<void>}
	 */
	async waitForUrlToContain(url, timeOut = 1000) {
		await browser.driver.wait(EC.urlContains(url), timeOut * 5);
	}

	/**
	 * @async
	 * @param {String} width
	 * @param {String} height
	 * @returns {promise.Promise<void>}
	 */
	async setWindowSize(width = "1280", height = "1024") {
		const windowWidth = parseInt(width, 10);
		const windowHeight = parseInt(height, 10);

		await browser.driver.manage().window().setSize(windowWidth, windowHeight);
	}

	/**
	 * @async
	 * @returns {Promise<string>}
	 */
	getPageTitle() {
		return browser.getTitle();
	}

	/**
	 * @async
	 * @returns {Promise<promise.Promise<void>>}
	 */
	clearCookies() {
		return browser.manage().deleteAllCookies();
	}

	/**
	 * @async
	 * @returns {promise.Promise<any>}
	 */
	refreshPage() {
		return browser.refresh();
	}

	/**
	 * @async
	 * @returns {Promise<promise.Promise<void> | * | void>}
	 */
	navigateBack() {
		return browser.navigate().back();
	}

	/**
	 * @async
	 * @returns {Promise<void>}
	 */
	scrollToTop() {
		return browser.executeScript("window.scrollTo(0,0);");
	}

	/**
	 * @async
	 * @returns {Promise<void>}
	 */
	scrollToBottom() {
		return browser.executeScript("window.scrollTo(0,100500);");
	}

	/**
	 * @async
	 * @param {ElementFinder} element
	 * @returns {Promise<void>}
	 */
	async scrollToElement(element) {
		await browser.executeScript("arguments[0].scrollIntoView(false)", element);
	}



}