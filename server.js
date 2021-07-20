const 
	express = require('express')
	app = express()
	path = require('path')

app.get('/', (req,res)=>{
	console.log('Connection ::')
	res.sendFile(path.join(__dirname,'/client/index.html'))
})

app.get('/css/styles.css', (req,res) => {
	res.sendFile(path.join(__dirname, '/client/css/styles.css'))
})

app.get('/js/script.js', (req,res)=>{
	res.sendFile(path.join(__dirname, '/client/js/script.js'))
})
app.listen('3000')


