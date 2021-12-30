const path = require("path");
const multicaps = require('../capabilities/multicapabilities');

exports.config = {
	baseUrl: 'http://www.example.com',
	multiCapabilities: multicaps.buildMultiCapabilities(),

	// specs below has a global priority > overrides specs noted in capabilities
	specs: [
		path.join(__dirname, "../../e2e/web/sample_web.js"),
	],

	params: {
		userId: 'user_dev',
		password: 'password',
		token: 'token',
		language: 'en', // en, zh-hans, zh-hant
	},
}