class produit {
	constructor(){
		this.nom
		this.composant
		this.created
		this.entreprise
		this.modified
		this.prix
		this.type
	}
}

class entreprise {
	constructor(){
		this.nom
		this.horaire
		this.adresse
		this.gpsx
		this.gpsy
		this.siren
	}
}

class compte {
	constructor(){
		this.created
		this.mdp
		this.modified
		this.nom
		this.prenom
		this.pseudo
		this.type
	}
}

const test = {
	produit1 : {
		composant: "Boite en carton",
		created: "2008-11-09T15:45:21+00:00",
		entreprise: null,
		id: 1,
		modified: "2008-11-09T15:45:21+00:00",
		nom: "Boite en carton",
		type: "objet",
		prix : 1
	},
	produit_test : {
		nom : "test",
		composant : "test",
		created : "2008-11-09T15:45:21+00:00",
		modified : "2008-11-09T15:45:21+00:00",
		entreprise : "Korasore",
		prix : "1",
		type : "test",
	},
	Entreprise_test : {
		nom : "test",
		horaire: "test",
		address: "test",
		gpsx: "123456",
		gpsy: "123456",
		sire: "test",
	},
}
	
const data = {
	id: false,
	type: "produit",
	data: false,
	callback: x => console.log(x),
	domaine : "https://myemnuapi.herokuapp.com",
}

api = {
	get(data) {
		request("POST", `${data.domaine}/ask/${data.type}${data.id != false ? '/'+data.id+'/' : "/"}`, data)
	},
	add(data) {
		request("POST", `${data.domaine}/add/${data.type}/`, data)
	},
	update(data) {
		request("PUT", `${data.domaine}/upd/${data.type}/${data.id}/`, data)
	},
	delete(data) {
		request("DELETE", `${data.domaine}/delt/${data.type}/${data.id}`, data)
	},
}

request = (method, url, data) => {
	$.ajax({
		method: method,
		url: url,
		data: data.data ? data.data : null,
	})
	.done( respose => data.callback() )
	.fail( (jqXHR, textStatus, errorThrown) => {
		console.log(jqXHR, textStatus, errorThrown)
	})
}