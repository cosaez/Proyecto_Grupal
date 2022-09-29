import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import {GiFireSilhouette} from 'react-icons/gi'
import { useContext } from "react";
import UserContext from "./contexto/UserContext";

const VerPerfil = () => {

    const {id} = useParams();

    const navigate = useNavigate(); 

    const [p, setP] = useState({});

    useEffect(() => {
        axios.get(`/api/member/verperfil/${id}`)
        .then((resp) => {
            console.log(resp)
            setP(resp.data.datos)
        })
    }, [])

    const eliminarMusic = () => {
        Swal.fire({
            text: `¿Está seguro que desea eliminar su perfil?`,
            title: 'Eliminar',
            showCancelButton: true,
            confirmButtonText: 'Si',
            confirmButtonColor: 'danger',
            cancelButtonText: 'No',
        }).then(resp => {
            if(resp.isConfirmed) {
                axios.delete(`/api/member/eliminar/${id}`)
                .then(respuesta => {
                    if(!respuesta.data.error) {
                        navigate('/instrumentos/Percusión');
                    } else {
                        Swal.fire('Error', respuesta.data.mensaje,'error')
                    }
                })
            }
        })
    }
    

    const {usuario} = useContext(UserContext);
    console.log(usuario)

    return(
        <Container> 

        <h1 className='proMember'><GiFireSilhouette/>Pro Member</h1> <hr className="aliceBlue" />      <br /> <br />
            <div className="aliceBlue">
                

                <h2>{p.nombre}</h2> <br/>
                <img src={p.img} alt='profilPic' /> 

            </div> <br/>
            <div className="aliceBlue">
                <div className="details2">
                    <strong>Email:</strong> 
                    <p className="details3">{p.email}</p>
                </div> <br />

                <div className="details2">
                    <strong>Numero Telefonico:</strong> 
                    <p className="details3">{p.numero}</p>
                </div> <br />

                <div className="details3">
                    <strong>Especialidad:</strong> 
                    <p className="details3">{p.especialidad}</p>
                </div> <br />
                
                <div className="details3">
                    <strong>Descripcion:</strong> 
                    <p className="details3">{p.descripcion}</p>
                </div> <br />
                {usuario._id == p.usuario ? '' :
                <Link className="contacto" to='/contacto'>Contactar</Link>}

                {usuario._id == p.usuario ?
                    <>
                        <Link className="editarLinkEdit"  to={`/editar/${p._id}`}><h3 className="editar"> Editar Perfil</h3> </Link> 
                        <Button style={{backgroundColor:'red'}} onClick={() => eliminarMusic()}>Eliminar Perfil</Button>
                    </>
                    
                    : '' }    

            </div>
            <br/><br/>
            <Link to='/'>Volver al Inicio</Link> <br /><br />
        </Container>
    )
}


export default VerPerfil;