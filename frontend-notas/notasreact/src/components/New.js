import React, {useState} from 'react';
import Global from '../Global';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

const New = () => {

//accedo a global y a la url 
    const url = Global.url;

    const [article, setArticle] = useState({

        title: null,
        content: null,
        author:null,
        image:null,
        ingredientes:null,
    });

    const [redirected, setRedirected] = useState(false);
    //referencia de los datos del formulario:
    //creando referencia
    let titleRef = React.createRef();
    let contentRef = React.createRef();
    let authorRef = React.createRef();
    let imagenRef = React.createRef();
    let ingreRef = React.createRef();

    const changeState = () =>{

        setArticle({
            title: titleRef.current.value,
            content:contentRef.current.value,
            author:authorRef.current.value,
            image:imagenRef.current.value,
            ingredientes:ingreRef.current.value.split(","),
        });

        console.log(article);
    }


    const sendData = (e) =>{
        //evitamos que al recibir los datos se recargue la pantalla
        e.preventDefault();
        changeState();
        //peticion HTTP por POST para guardar el articulo
        //direccion para guardar articulos
        axios.post(url + 'save', article).then (res =>{
                setRedirected(true);
                console.log(res.data)
        });
    }

    if(redirected)
    {
        return <Navigate to ="articles" />

    }
    return(

        <div className="nueva-publicacion">
            <div id="formulario" className="card mx-auto mb-3 mt-5" style={{width: '30em'}}>
            <div className="card-header text-dark">
                <h4>Publicar nueva receta</h4>
            </div>
            <div className="card-body">
               <form onSubmit={sendData}>
                    <div className="mb-3">
                     <label>Titulo</label>
                     <input type="text" className="form-control" id="title"   name="title" ref={titleRef} onChange={changeState} required/>

                    </div>
                    <div className="mb-3">
                     <label>Imagen</label>
                     <input type="text" placeholder="Ingresar url"  className="form-control" id="image"   name="image" ref={imagenRef} onChange={changeState} required/>

                    </div>
                    <div>
                        <label className='mb-3'>Ingredientes: (Separar con coma) </label>
                        <div>
                            <textarea type='text' name='ingredientes' className="form-control" id="ingredientes"  rows="6" cols="30"  ref={ingreRef} onChange={changeState} required>
                            </textarea>
                        </div>
                        <br></br>
                    </div>

                    <div className="mb-3">
                     <label>Preparación</label>
                     <textarea type="text" className="form-control" id="content" name="content" rows="6" cols="30" ref={contentRef} onChange={changeState}required/>                    
                    </div>

                    <div className="mb-3">
                     <label>Autor</label>
                     <textarea type="text" className="form-control" id="author" name="author" ref={authorRef} onChange={changeState} required/>                    
                    </div>

                    <div className="mb-3">
                      
                     <input className="form-control btn btn-primary" type="submit" id="publish" value="Publicar" required/>                    
                    </div>
                </form>  
            </div>
            </div>
        </div>
    );
}

export default New;