const prueba=1;
(async function load(){

	/* selectores */
	
	const $actionListContainer = document.getElementById('action');
	const $dramaListContainer = document.getElementById('drama');
	const $animationListContainer = document.getElementById('animation');

	const $featuringContainer = document.getElementById('featuring');
	const $form = document.getElementById('form');
	const $home = document.getElementById('home');


	const $modal = document.getElementById('modal');
	const $overlay = document.getElementById('overlay');
	const $hideModal = document.getElementById('hide-modal');


	const $modalImage = $modal.querySelector('img');
	const $modalTitle = $modal.querySelector('h1');
	const $modalDescription = $modal.querySelector('p');



	/* listas de peliculas */
	const actionList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=action');
	const dramaList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=drama');
	const animationList = await getDataMovies('https://yts.am/api/v2/list_movies.json?genre=animation');









	actionList.data.movies.forEach((movie)=>{
		console.log(videoItemTemplate(movie))
	})



	/* funciones */
	async function getDataMovies(url){
		const response = await fetch(url)
		const datos = await response.json()
		return datos;
	}

	function videoItemTemplate(movie){
		return(
			`<div class="primaryPlaylistItem">
			<div class="primaryPlaylistItem-image">
			<img src="${movie.medium_cover_image}">
			</div>
			<h4 class="primaryPlaylistItem-title">
			${ movie.title}
			</h4>
			</div>`
			)
	}


})()
