$(document).ready( function() {
	var content = "Copper Knickers will turn "
		+ (yearsSinceDate(copperKnickersDOB) + 1)
		+ " years old in "
		+ daysUntil(nextBirthday(copperKnickersDOB))
		+ " days, on "
		+ nextBirthday(copperKnickersDOB).format("dddd, MMMM Do, YYYY")
		+ ".";
	$('.container').text(content);
});

var copperKnickersDOB = moment([1473, 1, 19]);

function daysSinceDate(date) {
	return moment().diff(date, 'days');
}

function yearsSinceDate(date) {
	return moment().diff(date, 'years');
}

function nextBirthday(dob) {
	var year = moment().year();
	var month = dob.month();
	var date = dob.date();
	var next = moment([year, month, date]);
	if (moment().diff(next) < 0) {
		return next;
	}
	return moment([year+1, month, date]);
}

function daysUntil(date) {
	return date.diff(moment(), 'days');
}