/* global describe, it, xit, expect, beforeEach, beforeAll, browser, afterEach, afterAll, allure */

const dataProvider = require('../../data/test-data');
const SamplePage = require('../../pages/samplePageAsync');
const samplePage = new SamplePage();

describe(`As a user, I want to be able to see more information about example reserved domains [${browser.screenType}]:`, () => {
	beforeEach(() => {
		browser.ignoreSynchronization = true;
		// If we use the same feature name in several describes they will be grouped in Allure
		allure.feature('');
		allure.description('');
	});

	afterEach(() => {
		// This way we can log in again
		utils.clearCookies();
	});

	it('The one where website header should be correct', async () => {
		await allure.story('JIRA-1 Website page header should be correct');
		await samplePage.get();
		expect(await samplePage.header.getText()).toEqual(dataProvider.examplePage.header);
	});

	it('The one where the user successfully navigates to the IANA page', async () => {
		await allure.story('JIRA-2 More Info link should navigate User to the IANA page');
		await samplePage.clickMoreInfoLink();
		await expect(browser.getCurrentUrl()).toBe('https://www.iana.org/domains/reserved');
	});

	it('The one where the user is presented with the correct logo', async () => {
		allure.story('JIRA-3 Correct logo');
		expect(await samplePage.ianaLogo.getAttribute('alt')).toMatch('Homepage');
		expect(await samplePage.ianaLogo.isDisplayed()).toBe(true);
	});
});