const requestPromise = require('request-promise').defaults({
	jar: true,
});
const noProxyrequest = requestPromise.defaults({
	proxy: '',
});

module.exports = class ApiHelper {
	/**
     * ApiHelper class can be used for making precondition
     * API calls which can be very useful to speed up UI tests.
     * Example:
     *
     * async login(user) {
		const options = {
			method: 'POST',
			rejectUnauthorized: false,
			url: `http://${host}:8080/gateway/api/auth/login`,
			followAllRedirects: true,
			'Proxy-Connection': 'keep-alive',
			resolveWithFullResponse: true,
			qs: {
				appId: 'APP-NAME',
				username: username,
				password: password,
			},
			headers: {
				'cache-control': 'no-cache',
				'content-type': 'application/x-www-form-urlencoded;',
			},
        };

        const response = await this.send(options);

		return this.getCookies(response);
	}
     *
     */
	send(request) {
		return noProxyrequest(request);
	}

	getCookies(response) {
		return response.headers['set-cookie'].reduce((prev, curr) => {
			const cookie = curr.match(/([^=]+)=([^;]+)/);
			// eslint-disable-next-line no-param-reassign
			prev[cookie[1]] = cookie[2];
			return prev;
		}, {});
	}
};