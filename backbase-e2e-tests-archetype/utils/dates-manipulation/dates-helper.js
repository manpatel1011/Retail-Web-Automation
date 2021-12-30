const moment = require('moment');
const currentDate = moment();
const defaultDateFormat = 'DD/MM/YYYY';

module.exports = class DatesHelper {

	getYear(date = currentDate) {
		return date.format('YYYY');
	}

	getMonth(date = currentDate) {
		return date.format('MMM');
	}

	getDay(date = currentDate) {
		return date.format('DD');
	}

	getToday(date = currentDate, dateFormat = defaultDateFormat) {
		return date.format(dateFormat);
	}

	subtractDays(days) {
		return moment().subtract(days, 'days');
	}

	subtractDaysAndFormat(days, dateFormat = defaultDateFormat) {
		return moment().subtract(days, 'days').format(dateFormat);
	}

	parseDateString(dateString, dateFormat = defaultDateFormat) {
		return moment(dateString, dateFormat).toDate();
	}

	get daysFromLastFriday() {
		return (7 - 5 + new Date().getDay()) % 7;
	}

	lastWeek(dateFormat = defaultDateFormat) {
		return {
			start: moment().subtract(1, 'weeks').startOf('isoWeek').format(dateFormat),
			end: moment().subtract(1, 'weeks').endOf('isoWeek').format(dateFormat)
		};
	}

	lastMonth(dateFormat = defaultDateFormat) {
		return {
			start: moment().subtract(1, 'months').startOf('month').format(dateFormat),
			end: moment().subtract(1, 'months').endOf('month').format(dateFormat)
		};
	}

	thisMonth(dateFormat = defaultDateFormat) {
		return {
			start: moment().startOf('month').format(dateFormat),
			end: this.getToday(undefined, dateFormat)
		};
	}

	firstDayOfNextMonth(months, format) {
		return moment().add(months, 'months').startOf('month').format(format);
	}

	lastQTR(dateFormat = defaultDateFormat) {
		return {
			start: moment().quarter(moment().quarter() - 1).startOf('quarter').format(dateFormat),
			end: moment().quarter(moment().quarter() - 1).endOf('quarter').format(dateFormat)
		};
	}
};