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

// All orbital periods are measured in earth solar days.
var EARTH_ORBITAL_PERIOD = 365.25636;

function Planet(name, orbitalPeriod) {
	// Name of the planet. May be replaced later with detailed PlanetInfo object
	this.name = name;
	// AKA this planet's "year"; measure in earth days
	this.orbitalPeriod = orbitalPeriod;
	// Ratio between this planet's orbital period and Earth's orbital period
	this.periodRatio = orbitalPeriod/EARTH_ORBITAL_PERIOD;
}

/* BIRTHDAY WRANGLING */

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

var copperKnickersDOB = moment([1473, 1, 19]);

/* Planet Info */
var planets = {
	"Mercury": Planet("Mercury", 87.96926);
	"Venus": Planet("Venus", 224.7008);
	"Earth": Planet("Earth", 365.25636);
	"Mars": Planet("Mars", 686.9796);
	"Jupiter": Planet("Jupiter", 4332.82);
	"Saturn": Planet("Saturn", 10755.7);
	"Uranus": Planet("Uranus", 30637.153);
	"Neptune": Planet("Neptune", 60190.03);
	"Pluto": Planet("Pluto", 90553.02);
	"Kepler-438b": Planet("Kepler-438b", 35.23319);
}