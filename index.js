const express = require('express');
const app = express();
const { v4 : uuidv4 } = require('uuid');
uuidv4(); 

const path = require('path');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set('view engine' , 'ejs');
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));
let port = 8080 ;

let posts = [{
	id : uuidv4(),
	username : "Abhi Tyagi",
	content : "This is my first post"
}

	
]

app.get('/', (req, res) => {
	res.send("This is the home page");
});

app.get('/posts/new', (req,res) => {
	res.render("new.ejs");
});

app.post('/posts', (req, res) => {
	let { username, content } = req.body;
	let id = uuidv4();
	posts.push({id, username, content});
	res.redirect('/posts');
});

app.get('/posts', (req, res) => {
	res.render("index.ejs", { posts: posts });
});

app.get('/posts/:id', (req, res) => {
	let { id } = req.params;
	// console.log(id);
	let post = posts.find((p) => id === p.id);
	res.render("show.ejs", { post : post});
});

app.post('/posts/:id',(req,res) =>{
	let { id } = req.params;
	let post = posts.find((p) => id === p.id);
	let newContent = req.body.content ;
	post.content = newContent ;
	req.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) =>{
	let {id} = req.params ;
	let post = posts.find((p) => id === p.id);
	res.render("edit.ejs");
});

app.listen(port , () => {
	console.log(`Server is running on port ${port}`);
});

