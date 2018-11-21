const prueba=1;
(async function load(){
	async function getDataMovies(url){
		const response = await fetch(url)
		const datos = await response.json()
		return datos;
	}

	const actionList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=action');
	const dramaList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=drama');
	const animationList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=animation');




	const $actionListContainer = document.getElementById('action');
	const $dramaListContainer = document.getElementById('drama');
	const $animationListContainer = document.getElementById('animation');

	const $featuringContainer = document.getElementById('featuring');
	const $form = document.getElementById('form');
	const $home = document.getElementById('home');


	const $modal = document.getElementById('modal');
	const $overlay = document.getElementById('overlay');
	const $hideModal = document.getElementById('hide-modal');


	/* selectores del modal */
	const $modalImage = $modal.querySelector('img');
	const $modalTitle = $modal.querySelector('h1');
	const $modalDescription = $modal.querySelector('p');

})()
