// deezer.js

async function deezer() {
	const url = 'https://billboard-api2.p.rapidapi.com/radio-songs?date=2024-06-01&range=1-10';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '318b4c6e46mshd999ece9b6d80cep14a5d4jsn74cbf1b37ee0',
		'x-rapidapi-host': 'billboard-api2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}

// Immediately invoke
deezer();
