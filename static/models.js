BASE_URL = '/';

/* class sends ajax request to the server*/
class sendToServer {
	static async checkWord(wordCheck) {
		return await axios
			.post(`${BASE_URL}word`, {
				word: `${wordCheck}`
			})
			.then((resp) => {
				return resp;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static async sendUserScore(userScore) {
		return await axios
			.post(`${BASE_URL}score`, {
				score: `${userScore}`
			})
			.then((resp) => {
				return resp;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static async getHint() {
		return await axios
			.get(`${BASE_URL}hint`)
			.then((resp) => {
				return resp;
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
