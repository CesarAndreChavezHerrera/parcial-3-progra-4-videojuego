var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const axios = require('axios')

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
  const {name,nickname,email,password,repassword} = req.body

  if(password === repassword){

    axios.get('http://localhost:8000/api/users')
    .then(data => {
        var correo_existente= false
        var apodo_existente = false
        for(var a = 0 ; a < data.data.length;a ++){
          if(data.data[a].email == email ){
            correo_existente = true
            break
          }
          if(data.data[a].nickname == nickname ){
            apodo_existente = true
            break
          }

        }
        if(correo_existente == true){
          res.render(registroPage,{
            message:"El correo ya ha sido usado",
            messageClass:"alert-danger"
          })
          console.log("correo existente")
        }
        if(apodo_existente == true){
          res.render(registroPage,{
            message:"Ya hay alguien usando ese apodo",
            messageClass:"alert-danger"
          })
          console.log("apodo existente")
        }
        if(apodo_existente == false && correo_existente == false){
          console.log("se puede guardar un nuevo usuario")
          var body = {
            name:name,
            nickname:nickname,
            email:email,
            password:password
          }
          axios.post('http://localhost:8000/api/users',body)
            .then(data_=>{
              res.redirect('/home')
              console.log('se guardo')
            })
        }

  })
  }else{
    //res.redirect('/home')
    res.render(registroPage,{
      message:"La contraseña no coincide",
      messageClass:"alert-danger"
    })
  }
  //console.log(name,nickname,email,password,repassword)
  
})






router.get('/home', (req, res)=>{
  res.render('home')
});

router.get('/home/ranking', async (req, res)=>{
  try{
    var respuesta = axios.get('http://localhost:8000/api/ranking')
      .then(data => {
        //console.log(data.data[0]._id)
        //res.send(data.data)    
        /*
        var a = data.data.sort(function(a,b){
          return parseInt(a['tiempo']) >parseInt(b['tiempo'])
        })*/

        /*
        var datos = []
        for(var a = 0; a < data.data.length; a++){
            var c ={
              nickname:data.data[a].nickname,
              n_muertes:data.data[a].n_muertes,
              n_disparos_magia:data.data[a].n_disparos_magia,
              n_disparos_arma:data.data[a].n_disparos_arma,
              tiempo:parseInt(data.data[a].tiempo)
            }
            console.log(data.data[a].n_disparos_arma)
            datos.push(c)

        }
        console.log(datos,data.data)
        data.data.sort((a,b)=>{
         
          parseInt(a.tiempo)-parseInt(b.tiempo)
        
        })
        //console.log("original",data.data)
        var ordenado = []
        //console.log("original",data.data) 
      
      /*  
      for(var a = 0; a < data.data.length; a++){
        
        var max = -110;
        var s = 0
        for(var i=0;i<datos.length;i++){
          var w = parseInt(datos[i].tiempo)
          if(max < w){
            max = w;
            s = i

          }
        }

        ordenado.push(datos[s])
        console.log(s)
        datos.splice(s,1)
      }  
      

      //console.log("ordenado",ordenado)
      //console.log("mas alto",salida)
      //console.log("original",data.data)

      */
      res.render(rankingPage,{ranking:data.data})
      }
        )
      //.catch(err => res.send(err));
    
    
    
  }
  catch{
    console.log("error")
  }
  
  //res.render(rankingPage)
});




module.exports = router;
