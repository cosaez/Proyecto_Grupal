import { useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {GiFireSilhouette} from 'react-icons/gi'


const Instrumentos = () => {

    const [nuevaEspecialidad, setNuevaEpecialidad] = useState([]);

    const {especialidad} = useParams();

    useEffect(() => {
        axios.get(`/api/member/listar/${especialidad}`)
        .then(resp => {
            console.log(resp.data.datos);
            setNuevaEpecialidad(resp.data.datos)
        })
    }, []);

    return(
        <Container>
            <h1 className='proMember'><GiFireSilhouette/>Pro Member</h1>
            <hr className="aliceBlue" /> <br />
            <h3 className="aliceBlue"> Categoría: {especialidad}</h3> <br /><br />
            {nuevaEspecialidad.map((p,i) => (

                <ListGroup key={i}>
                    <ul className="listaGen">
                        <li>
                            <div className="listaMusico" >
                                <img src={p.img} alt='profilPic' />
                                <h2>{p.nombre}</h2>
                                <h4>{p.rol}</h4>
                                <Link to={`/musico/${p._id}`}>Ver Más</Link>
                            </div> <br />
                        </li>
                    </ul>
                </ListGroup>

))}
<br /> <br /> <Link to='/'>Volver al Inicio</Link> <br /><br />
        <br /> <br /> <br /> <br /> <br /> <br /><br /> <br /> <br /> <br /> <br /> <br />
        </Container>

    )
}

export default Instrumentos;