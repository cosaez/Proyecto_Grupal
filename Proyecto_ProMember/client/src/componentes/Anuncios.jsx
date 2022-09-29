import React from 'react';
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GiFireSilhouette } from 'react-icons/gi';
import axios from "axios";
import { useState, useEffect } from "react";

const Anuncios = () => {
    const navigate = useNavigate();
    const salir = e => {
        sessionStorage.removeItem('USUARIO');
        navigate('/login')
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/instrumentos")
            .then(res => setData(res.data.instrumentos))
            .catch((err) => {
                console.log(err)
            });
        console.log(data)
    })
    return (
        <div>
            <div className="navBar">
                <h1 className='proMember'><GiFireSilhouette /> Pro Member</h1>
                <Link className="creaPerfil" to="/nuevo_anuncio"><p>Crea un Anuncio!!</p></Link>
                <Button className='btn btn-danger' id="btnClose" onClick={salir}>Cerrar Sesión</Button>
            </div>
            <hr className="aliceBlue" />
            <div className="wrap-anuncios">
                {data.map((data) => {
                    return (
                <div className="contenedor-anuncio">
                    <ul className="lista-anuncio">
                        <p><strong>{data.anuncio}</strong></p>
                        <hr className="aliceBlue" />
                        <li><p>Anuncio por: </p></li>
                        <li className="align-derecha"><p>{data.nombre}</p></li>
                        <li><p>Interesados contactar al email:</p></li>
                        <li className="align-derecha"><p>{data.email}</p></li>
                    </ul>
                </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Anuncios;