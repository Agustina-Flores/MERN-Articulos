'use strict'

var Article = require('../models/article');

//Creamos un objeto para disponer de todos los metodos de ruta que vamos a definir

var controller = {

    //metodo para guardar un articulo

    save:(req,res) =>{

    var params = req.body;
    console.log(params);
    var article = new Article();

    //asignamos valores al objeto articulo
    article.title = params.title;
    article.content  = params.content;
    article.author = params.author;
    
    article.image=params.image;
    article.ingredientes=params.ingredientes;
    //guardamos el articulo
    article.save((err, articleStored) =>{

        if(err || !articleStored)
        {
            return res.status(404).send({
                status: 'error', 
                message: 'El articulo no se ha guardado'
            });
        }

        //si funciona bien

        return res.status(200).send({
            status: 'success',
            articleStored
        });
    });
},



//lista de articulos
getArticles: (req,res)=>{
    var query = Article.find({});
    
     //de fecha mas reciente a mas antigua
 
    query.sort('-date').exec((err, articles) =>{  
        
        if(err)
        {
            return res.status(500).send({
                status:'error',
                message:'Error al extraer los datos'
            });
        }

        if (!articles)
        {
            return res.status(404).send({
                status:'error',
                message:'No hay articulos para mostrar'
            });
        }


        return res.status(200).send({
            status:'sucess',
            articles
        });
    });
 
},

//eliminar  articulos

delete: (req,res) =>{
    //recoger el id a traves de la url

    var articleId = req.params.id;
    Article.findOneAndDelete({ _id: articleId}, (err,articleRemoved) =>{

        if(err)
        {
            return res.status(500).send({
                status:'error',
                message:'Error al eliminar el articulo'
            });
        }

        if(!articleRemoved)
        {
            return res.status(404).send({
                status:'error',
                message:'No se ha encontrado el articulo a eliminar'
            });
        }


        return res.status(200).send({
            status: 'success',
            article: articleRemoved
        });
    });
}




}

module.exports=controller;