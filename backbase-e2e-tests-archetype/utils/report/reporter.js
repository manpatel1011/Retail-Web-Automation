const AllureReporter = require('jasmine-allure2-reporter');
const AllureJsCommons = require('allure2-js-commons');
const JasmineSpecReporter = require('jasmine-spec-reporter'); // verbose console report
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

module.exports = {

	allureReporter: function () {
		const allureReporter = new AllureReporter.JasmineAllureReporter(new AllureJsCommons.AllureRuntime({
			resultsDir: "target/allure-results"
		}));
		jasmine.getEnv().addReporter(allureReporter);

		global.allure = allureReporter.getInterface();
		jasmine.getEnv().afterEach((done) => {
			browser.takeScreenshot().then((png) => {
				allure.attachment('Screenshot', new Buffer(png, 'base64'), 'image/png');
				done();
			});
		});
	},

	jasmineReporter: function () {
		const jasmineReporter = new JasmineSpecReporter({
			displayStacktrace: 'all'
		});
		jasmine.getEnv().addReporter(jasmineReporter);
	},

	htmlScreenshotReporter: function (deviceType, browserName, startTime) {
		const htmlReporter = new HtmlScreenshotReporter({
			dest: `target/reports/html/${deviceType}/${browserName}_${startTime}`,
			filename: 'report.html',
			reportTitle: 'Your project E2E test report',
			pathBuilder(currentSpec) {
				return `screenshots/${currentSpec.id}`; // sub-folder with screenshots
			},
		});

		jasmine.getEnv().addReporter(htmlReporter);
	}

}