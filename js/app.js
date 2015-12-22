$(document).ready( function() {
	$('.container').text(personWillTurn("The developer", devDOB));
	logBirthdays(devDOB)
});

function logBirthdays(dobMoment) {
	// temporary debugging function!
	for(var name in planets) {
		var et = new ETBirthday(planets[name], new Birthday(dobMoment));
		console.log(et.toString());
	}

}

// Descriptive function, likely to be scrapped
function personWillTurn(name, dob) {
	var content = name 
		+ " will turn "
		+ (yearsSinceDate(dob) + 1)
		+ " years old in "
		+ daysUntil(nextBirthday(dob))
		+ " days, on "
		+ nextBirthday(dob).format("dddd, MMMM Do, YYYY")
		+ ".";
	return content;
}

// All orbital periods are measured in earth solar days.
var EARTH_ORBITAL_PERIOD = 365.25636;

function Planet(name, orbitalPeriod) {
	// Name of the planet.
	this.name = name;
	// AKA this planet's "year"; measure in earth days
	this.orbitalPeriod = orbitalPeriod;
	// Ratio between this planet's orbital period and Earth's orbital period
	this.periodRatio = orbitalPeriod/EARTH_ORBITAL_PERIOD;
}

/* Earth-local birthday.
 * ONLY for use in decribing the birthday on earth.
 * For extraterrestial birthdays, use ETBirthday. */
function Birthday(dob) {
	this.dob = dob; // Moment object
	this.earthAge = function() {return yearsSinceDate(this.dob)};
	this.daysAlive = function() {return daysSinceDate(this.dob)};
}

function ETBirthday(planet, birthday) {
	this.planet = planet;
	this.birthday = birthday;
	// age on this planet
	this.age = function() {
		return Math.floor(this.birthday.daysAlive() / this.planet.orbitalPeriod);
	}

	this.daysUntilBirthday = function() {
		return ((this.age() + 1)*this.planet.orbitalPeriod) - this.birthday.daysAlive();
	}

	// returns moment object; the next birthday on this planet
	this.nextBirthday = function() {
		return moment().add(this.daysUntilBirthday(), 'days');
	}

	this.toString = function() {
		return this.planet.name
			+ " age: "
			+ this.age()
			+ " | Next birthday: "
			+ Math.floor(this.daysUntilBirthday())
			+ " days, on "
			+ this.nextBirthday().format("dddd, MMMM Do, YYYY");
	}
}

/* BIRTHDAY WRANGLING */

function daysSinceDate(date) {
	return moment().diff(date, 'days');
}

/* Earth years, rounded down to the nearest integer
 * If the date is a birthday, this will be the subjects age. */
function yearsSinceDate(date) {
	return moment().diff(date, 'years');
}

// returns moment object. EARTH-LOCAL ONLY.
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

/* Birthdays, for testing purposes */
var copperKnickersDOB = moment([1473, 1, 19]);
var devDOB = moment([1996, 3, 1]);

/* Planet Info */
var planets = {
	"Mercury": new Planet("Mercury", 87.96926),
	"Venus": new Planet("Venus", 224.7008),
	"Earth": new Planet("Earth", 365.25636),
	"Mars": new Planet("Mars", 686.9796),
	"Jupiter": new Planet("Jupiter", 4332.82),
	"Saturn": new Planet("Saturn", 10755.7),
	"Uranus": new Planet("Uranus", 30637.153),
	"Neptune": new Planet("Neptune", 60190.03),
	"Pluto": new Planet("Pluto", 90553.02),
	"Kepler-438b": new Planet("Kepler-438b", 35.23319)
}