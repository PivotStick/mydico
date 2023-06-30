class API {
	#host;

	/**
	 * @param {string} host
	 */
	constructor(host) {
		this.#host = host;
	}

	/**
	 * @param {string} endpoint
	 * @param {string} method
	 * @param {any=} body
	 */
	async #request(endpoint, method, body) {
		/**
		 * @type {RequestInit}
		 */
		const options = { method };

		if (method !== "GET" && body) {
			options.headers = { "content-type": "application/json" };
			options.body = JSON.stringify(body);
		}

		const response = await fetch(`${this.#host}${endpoint}`, options);

		if (response.status >= 400) {
			throw new Error(response.statusText);
		}

		return await response.json();
	}

	get(endpoint = "") {
		return this.#request(endpoint, "GET");
	}

	put(endpoint = "", body = {}) {
		return this.#request(endpoint, "PUT", body);
	}

	post(endpoint = "", body = {}) {
		return this.#request(endpoint, "POST", body);
	}

	patch(endpoint = "", body = {}) {
		return this.#request(endpoint, "PATCH", body);
	}

	delete(endpoint = "", body = {}) {
		return this.#request(endpoint, "DELETE", body);
	}
}

export const api = new API("/api");
