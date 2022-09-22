import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {GiFireSilhouette} from 'react-icons/gi'
const {Container, Form, Button} = require ('react-bootstrap');



const dataInicial = {
    nombre:'',
    apellido:'',
    email:'',
    password:'',
    confirmPassword:''
}

const Registro = () => {

    const navigate = useNavigate();

    const [formulario, setFormulario] = useState(dataInicial);

    const actualizaForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const enviar = (e) => {
        e.preventDefault();
        axios.post('/api/crearNewUsuario', formulario)
        .then(respuesta => {
            if(!respuesta.data.error) {
                Swal.fire('Registro', 'El usuario se ha registrado exitosamente', 'success')
                navigate('/login');

            } else {
                Swal.fire('Registro', 'Ha ocurrido un error al registrar al usuario', 'error')
            }
        })
    }

    return (
        <Container>
            <h1 className='proMember'><GiFireSilhouette/>Pro Member</h1> <hr className="aliceBlue" /> <br /><br />
            <Form onSubmit={enviar}>
                <h2 className='aliceBlue'>Registro</h2> <br />
                <Form.Group className="formPerfil" >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name='nombre' type="text" value={formulario.nombre} onChange={actualizaForm}  required/>
                </Form.Group> <br />
                <Form.Group className="formPerfil" >
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control name='apellido'  type="text" value={formulario.apellido} onChange={actualizaForm}  required />
                </Form.Group> <br />
                <Form.Group className="formPerfil" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email'  type="email" value={formulario.email} onChange={actualizaForm}  required/>
                </Form.Group> <br />
                <Form.Group className="formPerfil" >
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control name='password' type="password" minLength={6} value={formulario.password} onChange={actualizaForm} autoComplete="on"  required/>
                </Form.Group> <br />
                <Form.Group className="formPerfil" >
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control name='confirmPassword'  type="password" minLength={6} value={formulario.confirmPassword} onChange={actualizaForm} autoComplete="on"  required/>
                </Form.Group> <br />
            <Button type='submit'>Registrarse</Button>
            </Form>
            <br />
            <Link to={'/login'}>Iniciar Sesión</Link> <br /><br />
        </Container>

    )
}

export default Registro;