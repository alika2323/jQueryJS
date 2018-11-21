(async function load(){
	async function getDataMovies(url){
		const response = await fetch(url)
		const datos = await response.json()
		return datos;
	}

	const actionList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=action');
	const dramaList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=drama');
	const animationList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=animation');

	console.log(actionList.data.movies);
	console.log(dramaList.data.movies);
	console.log(animationList.data.movies);
})()
