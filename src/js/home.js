/* EJEMPLO DE PROMESA BASICO*/
const status=1;
const getUser = new Promise(function(salioBien, salioMal){
	if (status==1) {
		salioBien('USER1: OK OK');
	} else {
		salioMal('USER1: Se acabo el tiempo');
	}
	// setTimeout(function(){
	// 	salioMal();
	// },3000);
})


getUser
.then(function(msj){
	console.log(msj);
})
.catch(function(msj){
	console.log(msj);
});



/* EJEMPLO DE EJECUCION DE VARIAS PROMESAS*/
const status2=1;
const status3=1;
const getUser2 = new Promise(function(salioBien, salioMal){
	if (status2==1) {
		salioBien('USER2:OK OK');
	} else {
		salioMal('USER2:Se acabo el tiempo');
	}
})

const getUser3 = new Promise(function(salioBien, salioMal){
	if (status3==1) {
		salioBien('USER3:OK OK');
	} else {
		salioMal('USER3:Se acabo el tiempo');
	}
})


Promise.all([
	getUser2,
	getUser3
	])
.then(function(msj){
	console.log(msj);
})
.catch(function(msj){
	console.log(msj);
})

