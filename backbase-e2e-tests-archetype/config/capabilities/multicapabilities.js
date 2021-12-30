'use strict';
//Parameters
let browser = process.env.BROWSER;
let device = process.env.DEVICE;

module.exports = {
	/**
	 * buildMultiCapabilities function creates multicapabilities array using environment variables.
	 * Environment variables can be sent as comma separated values.
	 * eg. BROWSER="chrome,firefox,internet explorer"
	 * If none of the browsers have been chosen, then one chrome instance will start.
	 * Intended use: In local environments and as Jenkins build parameters
	 */
	buildMultiCapabilities: function () {
		let multicaps = [];

		if (browser) {
			browser.split(',').map(function (browserName) {
				multicaps.push({
					browserName: browserName.trim(),
					shardTestFiles: true,
					maxInstances: 2
				});
			})
		} else {
			multicaps.push({
				browserName: 'chrome',
				'goog:chromeOptions': {
					args: ['--lang=en',
						'--no-default-browser-check',
						'--start-maximized'
					]
				},
			});
		}

		if (device) {
			device.split(',').map(function (deviceName) {
				multicaps.push({
					browserName: 'chrome',
					shardTestFiles: true,
					maxInstances: 2,
					'goog:chromeOptions': {
						mobileEmulation: {
							'deviceName': deviceName.trim()
						},
						args: ['--lang=en',
							'--no-default-browser-check'
						]
					}
				});
			})
		}

		return multicaps;
	},
	/**
	 * getMyMultiCapabilities is an array of predefined capabilities
	 * which can be modified to suit your needs
	 */
	getMyMultiCapabilites: [{
		chromeDesktop: {
			browserName: 'chrome',
			'goog:chromeOptions': {
				args: ['--lang=en',
					'--no-default-browser-check',
					'--start-maximized'
				]
			},
		},

		chromeMobile: {
			browserName: 'chrome',
			'goog:chromeOptions': {
				mobileEmulation: {
					'deviceName': 'Nexus 6P'
				},
				args: ['--lang=en',
					'--no-default-browser-check',
					'window-size=412,860'
				]
			}
		},
		chromeTablet: {
			browserName: 'chrome',
			'goog:chromeOptions': {
				mobileEmulation: {
					'deviceName': 'iPad'
				},
				args: ['--lang=en',
					'--no-default-browser-check',
					'window-size=768,1024'
				]
			}
		},
		firefox: {
			browserName: 'firefox',
		},

		internetExplorer: {
			browserName: 'internet explorer'
		},

		safari: {
			browserName: 'safari',
		},

		msEdge: {
			browserName: 'MicrosoftEdge'
		}
	}],

}