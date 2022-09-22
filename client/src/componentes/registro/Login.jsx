import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../contexto/UserContext';
import {GiFireSilhouette} from 'react-icons/gi'
const { Container, Form, Button } = require("react-bootstrap");



const dataInicial = {
    username:'',
    password:'',
}

const Login = () => {

    const [formulario, setFormulario] = useState(dataInicial);
    const context = useContext(UserContext );
    const navigate = useNavigate();

    const actualizaForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const login = (e) => {
        e.preventDefault();
        axios.post('/api/loginUsuario', formulario)
        .then(respuesta => {
            if(!respuesta.data.error) {
                context.setUsuario(respuesta.data.datos);
                sessionStorage.setItem('USUARIO', JSON.stringify(respuesta.data.datos))
                navigate('/')
            } else {
                Swal.fire('Login', respuesta.data.mensaje, 'error');
            }
        })
    }

    return (
        <Container>
            <h1 className='proMember'><GiFireSilhouette/>Pro Member</h1> <hr className="aliceBlue" /> <br /> <br />

            <h3 className="sesion">Inicia Sesión</h3> <br /> <br />
            <div className='loginBody'>
                <Form onSubmit={login}>
                    <Form.Group className="login" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='username' type="email" value={formulario.username} onChange={actualizaForm} autoComplete="on"  required/>
                    </Form.Group> <br />

                    <Form.Group className="login" >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control name='password'  type="password" value={formulario.password} onChange={actualizaForm} autoComplete="on" required />
                    </Form.Group>  <br />

                    <Button type='submit'>Entrar</Button> <br /><br /> <br/>
                    <p className="aliceBlue">¿No estas registrado?, Registrate <Link to={'/registro'}>aquí</Link> </p> <br /><br /><br /><br /><br /><br /><br />
                </Form> <br />
                <img className='imgNirvana' src={require("../imgs/unplugged-1.jpg")} alt="nirvanaIMG"  />

            </div>
        </Container>
    )
}

export default Login;