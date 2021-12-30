const defaultConf = require('./base.conf');
const devConf = require('./envs/dev.conf');
const testConf = require('./envs/test.conf');

let protractorConf = {};

switch (process.env.ENV) {
	case 'dev':
		protractorConf = Object.assign(defaultConf.config, devConf.config);
	case 'test':
		protractorConf = Object.assign(defaultConf.config, testConf.config);
	case 'local':
		// ... and so on ...
	default:
		protractorConf = defaultConf.config;
}

exports.config = protractorConf;