const _ = require("lodash");
const multicaps = require('../capabilities/multicapabilities');

exports.config = {
	baserUrl: 'http://www.example.com',
	params: {
		userId: 'user_test',
		password: 'password',
		token: 'token',
		language: 'en', // en, zh-hans, zh-hant
	},
}