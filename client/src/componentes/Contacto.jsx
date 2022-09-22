import { Button, Container, Form } from "react-bootstrap"
import {GiArrowDunk, GiFireSilhouette} from 'react-icons/gi'
import { Link } from "react-router-dom"
import Swal from "sweetalert2"



const Contacto = () => {


    const recibido = (e) => {
        e.preventDefault();
        Swal.fire('Gracias!!', 'Pronto te enviaré un mensaje de vuelta!', "success")
    }

    return(
        <Container>
            <h1 className='proMember'><GiFireSilhouette/>Pro Member</h1> <hr className="aliceBlue" /> <br /> <br />
            <h4 className="aliceBlue">Hola! Envíame un mensaje acá abajo <GiArrowDunk/></h4> <br /> <br />
            <Form onSubmit={recibido}>
                <Form.Group className="aliceBlue" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group> <br />
                <Form.Group className="aliceBlue" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group> <br/>
                <Form.Group className="aliceBlue" controlId="">
                <Form.Label>Mensaje:</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group> <br />
                <Button type="submit">Enviar</Button> <br /> <br />
                <Link to='/'>Volver al Inicio</Link> <br /><br />
            </Form> <br /> <br /> <br /> 
        </Container>
    )
}

export default Contacto;