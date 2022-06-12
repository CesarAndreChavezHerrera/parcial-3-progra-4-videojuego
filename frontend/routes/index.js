var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'First view with node and express', info:"Prueba de paso de parametros" });
});


const loginPage = "../views/paginas/inicio/login";
const registroPage = "../views/paginas/inicio/registro";
const rankingPage = "../views/paginas/postlogin/ranking";

router.get('/login', (req, res)=>{
  res.render(loginPage)
});

router.get('/registro', (req, res)=>{
  res.render(registroPage)
});




router.post('/login', async (req, res) => {
  res.redirect('/home')
})

router.post('/registro', async (req, res) => {
  res.redirect('/home')
})






router.get('/home', (req, res)=>{
  res.render('home')
});

router.get('/home/ranking', (req, res)=>{
  res.render(rankingPage)
});




module.exports = router;
