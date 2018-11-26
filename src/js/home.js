const prueba=1;
//console.log("%c¡Detente!", "font-family: ';Arial';, serif; font-weight: bold; color: red; font-size: 45px");
//console.log("%cEsta función del navegador está pensada para desarrolladores.", "font-family: ';Arial';, serif; color: white; font-size: 20px");

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

	const $clearCache = document.getElementById('clearCache');






	/* -- DEASRROLLO --  */	
	/* Elemento de busqueda */
	$form.addEventListener('submit', searchMovie); 



	/* Obteniendo y renderizando listas de peliculas */
	const actionList = await cacheExist('action');
	renderListMovies(actionList,$actionListContainer,'action');


	const dramaList = await cacheExist('drama');
	renderListMovies(dramaList,$dramaListContainer, 'drama');


	const animationList   = await cacheExist('animation');
	renderListMovies(animationList,$animationListContainer, 'animation');



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
		try	{
			const {data:{movies: datePeli}} = await getDataMovies(`${BASE_API_MOVIES}?limit=1&query_term=${data.get('search')}`)
			const stringFeaturing = stringTemplateFeaturing(datePeli[0]);
			$featuringContainer.innerHTML=stringFeaturing;

		}catch(error){
			alert(error);
			$loader.remove();
			$home.classList.remove('search-active');
		}
	} 


	/* Funciones traer y renderizar peliculas  */
	async function getDataMovies(url){
		const response = await fetch(url)
		const datos = await response.json()
		if (datos.data.movie_count>0) {
			return datos;
		}
		throw 'No se encontró ningún resultado, intenta nuevamente';	
	}



	function stringTemplateVideo(movie,category){
		return(
			`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
			<div class="primaryPlaylistItem-image">
			<img src="${movie.medium_cover_image}">
			</div>
			<h4 class="primaryPlaylistItem-title">
			${ movie.title}
			</h4>
			</div>`
			)
	}


	function renderListMovies(list, container,category){
		container.querySelector('img').remove();
		list.forEach((movie)=>{		
			const stringContainer = stringTemplateVideo(movie,category);
			const htmlContainer = createHtmlContainer(stringContainer);
			container.append(htmlContainer);
			addEventClickMovie(htmlContainer);

			const imageContainer = htmlContainer.querySelector('img');
			imageContainer.addEventListener('load',(event)=>{
				event.srcElement.classList.add('fadeIn');
			})
		})
	}


	function  addEventClickMovie(element){
		element.addEventListener('click',()=>{
			showModal(element);	
		})
	}



	/* Funciones modal  */
	function showModal(element){
		$overlay.classList.add('active');
		$modal.style.animation= 'modalIn .8s forwards';
		const id = element.dataset.id;
		const category = element.dataset.category;

		const dataMovie=searchMovieModal(id, category);
		$modalTitle.textContent=dataMovie.title;
		$modalImage.setAttribute('src',dataMovie.medium_cover_image);
		$modalDescription.textContent=dataMovie.description_full;
	}


	function hideModal(){
		$overlay.classList.remove('active');
		$modal.style.animation= 'modalOut .8s forwards';	
	}


	function searchMovieModal(id, category){
		switch (category){
			case 'action':
			return findByIdMovie(actionList, id);
			break;
			case 'drama':
			return findByIdMovie(dramaList, id);
			break;
			default :{
				return findByIdMovie(animationList, id);
			}
		}	
	}


	function findByIdMovie(list, id){
		return list.find(movie => movie.id === parseInt(id, 10));
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



	/* funciones featuring*/
	async function cacheExist(category){
		const listName =`${category}List`;
		const cacheList = window.localStorage.getItem(`${listName}`);

		if (cacheList) {
			return JSON.parse(cacheList);
		} 
		const {data: {movies: data}} = await getDataMovies(`${BASE_API_MOVIES}?genre=${category}`);
		window.localStorage.setItem(listName, JSON.stringify(data));
		return data;
	}





})()
