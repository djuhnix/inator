const axios = require('axios');

const limit = 1;

async function getFact() {
	try {
		const response = await axios.get('https://api.api-ninjas.com/v1/facts', {
			headers: {
				'X-Api-Key': process.env.NINJA_API_KEY,
			},
			params: { limit },
		});
		return response.data[0];
	}
	catch (error) {
		console.error('API Ninja Facts Request failed:', error);
	}
}
/*
getFact()
	.then(response => {
		const { fact } = response;
		return console.log('fact retrieve successfully :', fact);
	});
*/
module.exports = {
	getFact,
};