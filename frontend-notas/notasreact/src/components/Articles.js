import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Global from '../Global';
 import Article from './Article';

const Articles = () =>{

//cargar todos los articulos
    const [articles, setArticles] = useState([]);
    const url = Global.url;

//nos deja ver todos los articulos
//llamando a la funcion getArticles
//articles.length para obtener todosl os articulos
    useEffect(() => {
    getArticles();
        console.log(articles);
    },[articles.length]);

    //obtenemos todos los articulos
    const getArticles = () =>{
        axios.get(url + 'articles').then(res =>{
            setArticles(res.data.articles);
        });
    }
//eliminamos un articulo a traves de su id
    const deleteArticle = (id) =>{
        const idArticle = articles[id]._id;
        axios.delete(url + 'delete/' + idArticle).then(res =>{
            getArticles();
        });
    }
    return(

        <div className='publicaciones'> 
        <br></br>
           <button> 
           <a href="/" className="volver">
             <b>Volver</b>  
            </a>
            </button>
        <h1 className='mt-5'>Recetas</h1>
        <div className='container mt-3'>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-2'>
                
                {
                    articles.length > 0 ? (

                        articles.map((article, i) =>{

                            return (
                                <Article
                                key={i}
                                id={i}
                                articleData ={article}
                                delArticle = {deleteArticle}
                                />
                            );
                        })
                    ): (
                       <h3 className='mx-auto'>No hay recetas que mostrar</h3> 
                    )
                }
            </div>
        </div>
        </div>
 

    );
}

export default Articles;