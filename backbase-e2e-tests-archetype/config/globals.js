'use strict';

const Helpers = require('../utils/browser/browser-helper')
const helpers = new Helpers();

module.exports = () => {
	global.EC = protractor.ExpectedConditions;
	global.utils = helpers;
}