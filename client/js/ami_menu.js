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
	
const
	cl = console.log,
data = {
	id: false,
	type: "produit",
	data: false,
	callback: x => console.log(x),
	domaine : "https://myemnuapi.herokuapp.com",
},
data2 = { ...data },
data3 = { ...data },
set_data_for_sorting = (parametre, separateur, limite, data) => {
	adresses = data[parametre].split(separateur).filter( (x, i) => i>limite )
	return adresses.join(separateur)
},
sort_data = (filter, data)=> { 
	ordered = {}
	data.sort((a, b) => (a[filter] > b[filter]) ? 1 : -1)
	data.forEach( x => {
		if (typeof ordered[x[filter].split('')[0]] != 'object') 
			ordered[x[filter].split('')[0]] = []
		ordered[x[filter].split('')[0]].push(x)
	})
	return ordered
}

data2.callback = (res) => {
	const response = Object.values(res.response)
	response.forEach( x => { 
		x.full_localisation = x.localisation
		x.localisation = set_data_for_sorting("localisation", ' ',0,x) 
	})
	cl(JSON.stringify(sort_data('localisation', response)))
},
data3.callback = (res) => {
	const response = Object.values(res.response)
	response.forEach( x => {
		x.full_nom = x.nom
		if (["le", 'la', "les"].includes(x.nom.split(' ')[0].toLowerCase()))
			x.nom = set_data_for_sorting('nom', ' ',0,x)
		else if (x.nom[1] === "'")
			x.nom = set_data_for_sorting('nom', '',1,x)
	})
	cl(JSON.stringify(sort_data('nom', response)))
}

data2.type = data3.type = 'entreprise'

api = {
	get(data) {
		request("GET", `${data.domaine}/ask/${data.type}${data.id != false ? '/'+data.id+'/' : "/"}`, data)
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
	.done( res => data.callback(res) )
	.fail( (jqXHR, textStatus, errorThrown) => {
		console.log(jqXHR, textStatus, errorThrown)
	})
}

byAdress = () => { api.get(data2) }
byName   = () => { api.get(data3) }

resultat_requete_byAdress = JSON.parse('{"L":[{"id":1,"nom":"Korasore","horaire":"Lundi - Dimanche de 8h - 18h","localisation":"Los Angeles USA","gpsX":"-6945623","gpsY":"-1245896","siren":"FFR455522HJIL123","created":"2000-11-11T11:12:01+00:00","modified":"2000-11-11T11:12:01+00:00","full_localisation":"45100 Los Angeles USA"}],"M":[{"id":3,"nom":"Les pecheurs incongrue","horaire":"Lundi - Samedi de 10h a 22h","localisation":"Marina","gpsX":"-12500","gpsY":"65002","siren":"F1258LJRLFK","created":"2005-11-09T15:45:21+00:00","modified":"2005-11-09T15:45:21+00:00","full_localisation":"1125 Marina"},{"id":2,"nom":"La case de Pepe !","horaire":"Mardi - Dimanche de 14h a 20h","localisation":"Murisia Local Chester","gpsX":"145896","gpsY":"-457865","siren":"FFGRH4592MJ","created":"2010-11-09T15:45:21+00:00","modified":"2010-11-09T15:45:21+00:00","full_localisation":"47859 Murisia Local Chester"}]}')
resultat_requete_byName   = JSON.parse('{"K":[{"id":1,"nom":"Korasore","horaire":"Lundi - Dimanche de 8h - 18h","localisation":"45100 Los Angeles USA","gpsX":"-6945623","gpsY":"-1245896","siren":"FFR455522HJIL123","created":"2000-11-11T11:12:01+00:00","modified":"2000-11-11T11:12:01+00:00","full_nom":"Korasore"}],"c":[{"id":2,"nom":"case de Pepe !","horaire":"Mardi - Dimanche de 14h a 20h","localisation":"47859 Murisia Local Chester","gpsX":"145896","gpsY":"-457865","siren":"FFGRH4592MJ","created":"2010-11-09T15:45:21+00:00","modified":"2010-11-09T15:45:21+00:00","full_nom":"La case de Pepe !"}],"p":[{"id":3,"nom":"pecheurs incongrue","horaire":"Lundi - Samedi de 10h a 22h","localisation":"1125 Marina","gpsX":"-12500","gpsY":"65002","siren":"F1258LJRLFK","created":"2005-11-09T15:45:21+00:00","modified":"2005-11-09T15:45:21+00:00","full_nom":"Les pecheurs incongrue"}]}')