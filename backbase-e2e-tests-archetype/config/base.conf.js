/* eslint-disable no-undef,global-require */
/* global browser, allure, require, jasmine */
const reporter = require('../utils/report/reporter');
const path = require("path");
const multicaps = require('./capabilities/multicapabilities');
const globals = require('./globals');

exports.config = {
	framework: 'jasmine2',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'http://www.example.com',

	// specs below has a global priority > overrides specs noted in capabilities
	specs: [
		path.join(__dirname, "../e2e/web/sample_web_async.js"),
	],

	// parameters coming from the CLI as --params.param
	params: {
		environment: 'TEST',
	},

	multiCapabilities: multicaps.buildMultiCapabilities(),

	jasmineNodeOpts: {
		onComplete: null,
		isVerbose: true,
		showColors: true,
		// Change value if you see 'Jasmine Spec timeout' error
		defaultTimeoutInterval: 30 * 1000,
	},

	onPrepare() {
		globals.call();
		reporter.jasmineReporter.call();
		reporter.allureReporter.call();
	},
	SELENIUM_PROMISE_MANAGER: false, // if you use async/await you need turn off promise manager in webdriver
	ignoreUncaughtExceptions: true

};