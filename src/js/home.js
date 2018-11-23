const prueba=1;
(async function load(){

	const BASE_API_MOVIES='https://yts.am/api/v2/list_movies.json';

	/* -- SELECTORES --  */	
	const $actionListContainer = document.getElementById('action');
	const $dramaListContainer = document.getElementById('drama');
	const $animationListContainer = document.getElementById('animation');

	const $featuringContainer = document.getElementById('featuring');
	const $home = document.getElementById('home');
	const $form = document.getElementById('form');


	const $modal = document.getElementById('modal');
	const $overlay = document.getElementById('overlay');
	const $hideModal = document.getElementById('hide-modal');
	const $modalImage = $modal.querySelector('img');
	const $modalTitle = $modal.querySelector('h1');
	const $modalDescription = $modal.querySelector('p');






	/* -- DEASRROLLO --  */	
	/* Elemento de busqueda */
	$form.addEventListener('submit', searchMovie); 


	/* Obteniendo y renderizando listas de peliculas */
	const actionList = await getDataMovies(`${BASE_API_MOVIES}?genre=action`);
	const dramaList = await getDataMovies(`${BASE_API_MOVIES}?genre=drama`);
	const animationList = await getDataMovies(`${BASE_API_MOVIES}?genre=animation`);

	renderListMovies(actionList,$actionListContainer);
	renderListMovies(dramaList,$dramaListContainer);
	renderListMovies(animationList,$animationListContainer);



	/* Boton cerrar modal */
	$hideModal.addEventListener('click',hideModal);






	/* -- FUNCIONES --  */	
	/* Funciones Generales  */
	function addAttribute($element,attributes){
		for (const atributo in attributes) {
			$element.setAttribute(atributo,attributes[atributo])
		}
	}
	

	function createHtmlContainer(stringContainer){
		const html = document.implementation.createHTMLDocument();
		html.body.innerHTML=stringContainer;
		return html.body.children[0];
	}


	/* Funciones buscar peliculas  */
	async function searchMovie(event){
		event.preventDefault();
		$home.classList.add('search-active');

		const $loader = document.createElement('img');
		addAttribute($loader,{src: './src/images/loader.gif', height: 50, width: 50})
		$featuringContainer.append($loader);

		const data = new FormData($form);
		const {
			data:{
				movies: datePeli
			}
		} = await getDataMovies(`${BASE_API_MOVIES}?limit=1&query_term=${data.get('search')}`)


		const stringFeaturing = stringTemplateFeaturing(datePeli[0]);
		$featuringContainer.innerHTML=stringFeaturing;
	} 


	/* Funciones traer y renderizar peliculas  */
	async function getDataMovies(url){
		const response = await fetch(url)
		const datos = await response.json()
		return datos;
	}


	function stringTemplateVideo(movie){
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


	function renderListMovies(list, container){
		container.querySelector('img').remove();
		list.data.movies.forEach((movie)=>{		
			const stringContainer = stringTemplateVideo(movie);
			const htmlContainer = createHtmlContainer(stringContainer);
			container.append(htmlContainer);
			addEventClickMovie(htmlContainer);
		})
	}

	function  addEventClickMovie(element){
		element.addEventListener('click',()=>{
			showModal();	
		})
	}



	/* Funciones modal  */
	function showModal(){
		$overlay.classList.add('active');
		$modal.style.animation= 'modalIn .8s forwards';
	}

	function hideModal(){
		$overlay.classList.remove('active');
		$modal.style.animation= 'modalOut .8s forwards';	
	}


	/* funciones featuring*/
	function stringTemplateFeaturing(peli){
		return(
			`<div class="featuring">
			<div class="featuring-image">
			<img src="${peli.medium_cover_image}" width="70" height="100" alt="">
			</div>
			<div class="featuring-content">
			<p class="featuring-title">${peli.title}</p>
			<p class="featuring-album">${peli.year}</p>
			</div>
			</div>`
			)
	}







})()
