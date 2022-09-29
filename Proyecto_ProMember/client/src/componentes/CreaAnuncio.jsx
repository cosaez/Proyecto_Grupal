import React from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { GiFireSilhouette } from 'react-icons/gi';
import axios from "axios";
import { useState } from "react";

const CreaAnuncio = () => {
    const navigate = useNavigate();
    const [anuncio, setAnuncio] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const crearAnuncio = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/instrumento/create',
            {
                "anuncio": anuncio,
                "nombre": nombre,
                "email": email
            }
        )
            .then((res) => {
                console.log(res)
                navigate('/anuncios')
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }
    return (
        <div>
            <h1 className='proMember'><GiFireSilhouette />Pro Member</h1> <br />
            <hr className="aliceBlue" />
            <div>
                <Form className="form-anuncio" onSubmit={crearAnuncio}>
                    <FormGroup>
                        <FormLabel>Anuncio de Venta de Instrumento</FormLabel>
                        <FormControl type="text" required onChange={(e) => setAnuncio(e.target.value)} />
                    </FormGroup>
                    {anuncio.length < 6 ? <p>*El anuncio es demasiado corto</p> : null}
                    <br />
                    <FormGroup>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl type="text" required onChange={(e) => setNombre(e.target.value)} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <FormLabel>Email de Contacto</FormLabel>
                        <FormControl type="email" required onChange={(e) => setEmail(e.target.value)} />
                    </FormGroup>

                    <br /><br />

                    <Button type="submit"> Subir Datos </Button>
                    <br /> <br />

                    <Link to='/'>Volver al Inicio</Link>

                    <br /> <br />
                </Form>
            </div>
        </div>
    )
}
export default CreaAnuncio;