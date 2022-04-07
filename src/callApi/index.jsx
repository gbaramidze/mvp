const callApi = (url, params) => {
	return fetch(`${process.env.REACT_APP_API_URL}${url}`, params).then(r=>r.json())
}

export default callApi