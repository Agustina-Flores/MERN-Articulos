import React from "react";
import '../assets/css/App.css'

const Article = ({id,articleData,delArticle}) =>{

    const {title, date, content,author,image,ingredientes} = articleData;
    const formatDate = (date) =>{
        return date.substring(4,8) + date.substring(0,4);
    }

    const del = () =>{
        delArticle(id);
    }
    return(

        <div className="col">
            <div className="card mx-auto mb-3">
                <div className="card-header">
                  <h3 className="card-title">{title}</h3>
                </div>
                <div className="card-body">
                 <label className="card-text text-start">
                    <img src = {image} className="image-receta" alt=''/>
                 </label>       
              </div>

              <div className="card-body">
              <label className="card-text text-start">
                 <b> Ingredientes </b>  <br></br> 
                 <ol> 
                 {ingredientes.map(ing =>(
                        <li>{ing}</li>
                 ))}
                 </ol>
                 </label>
              </div>

                <div className="card-body">
                 <label className="card-text text-start">
                  <b> Preparación: </b>  <br></br> {content}
                 </label>       
              </div>
              <ul className="list-group list-group-flush">
            <li className="list-pub list-group-item" style={{ 'fontSize': 12 }}>
            <b>  Publicado el :  {formatDate(date)}  </b> 
            </li>
            <li className="list-pub list-group-item" style={{ 'fontSize': 12 }}>
            <b>  Autor :  {author} </b> 
            </li>
              </ul>
              <div className="card-footer">
                <button className="btn btn-danger btn-sm" type="button" onClick={del}>
                    Eliminar
                </button>
            </div>
            
        </div>
      
            </div>

          

    );
}

export default Article;