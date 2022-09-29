import { useState } from "react"
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import {GiFireSilhouette} from 'react-icons/gi'
import { useContext } from "react";
import UserContext from "./contexto/UserContext";
import { useEffect } from "react";


const CreaPerfil = () => {

    const {usuario, setUsuario} = useContext(UserContext);

    const dataInicial = {
        nombre:'',
        email:'',
        numero:'',
        descripcion:'',
        especialidad:'',
        rol:'',
        usuario: usuario._id,
        avatar:''
    }

    const [formulario, setFormulario] = useState(dataInicial);

    const [editar, setEditar] = useState(false);

    const [uploadedFile, setUploadedFile] = useState([]); 

    const [selectedIMG, setSelectedIMG] = useState(null);

    const navigate = useNavigate();

    const {id} = useParams();

    

    
    useEffect(() => {
        setFormulario({...formulario, ['usuario']: usuario._id})
    },[])

    useEffect(() => {
        if(id) {
            axios.get(`/api/member/verperfil/${id}`)
            .then(resp => {
                if(!resp.data.error) {
                    setFormulario(resp.data.datos);
                } else {
                    Swal.fire('Oooops!!', resp.data.mensaje,'Error')
                }
            })
        }
    }, []);

    const actualizaForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const selectedFile = (e) => {
        setSelectedIMG(e.target.files[0]);
        console.log(e.target.files[0]);

    }

    

    const crearMusico = () => {
        const formData = new FormData();
    
        formData.append(
            "archivo",
            selectedIMG,
            selectedIMG.name)
        
    
        console.log(selectedIMG);
    
        axios.post('/api/member/upload', formData, {responseType:'blob', headers : {'content-type': 'multipart/form-data'}})
        .then(resp => {
            console.log(resp.data);
        } );


        return axios.post('/api/member/crear', formulario/* , {responseType:'blob', headers: {'content-type':'multipart/form-data'}} */)
        .then(resp => {
            if(!resp.data.error) {
                setUsuario({...usuario, ['musico']: true})
                navigate('/');
            } else {
                Swal.fire('Error', resp.data.mensaje,'error')
                return false
            }})
    }

    const editMusico = (p) => {
        return axios.put(`/api/member/edit/${id}`, p)
        .then(resp => {
            if(!resp.data.error) {
                setEditar(!editar);
            } else {
                Swal.fire('Error', resp.data.mensaje, 'error')
                return(false)
            }
        })
    }

    const guardar = async (e) => {
        e.preventDefault();
        let respuesta = false;
        const formData = new FormData(e.target);
        
        console.log('target',e.target);
        if(!id) {
            respuesta = await crearMusico(formulario);
        } else {
            respuesta = await editMusico(formulario);
            navigate('/')
        }
        
    }

    /* const fileUpload = (e) => {
    e.preventDefault();
        const formData = new FormData();
    
        formData.append(
            "archivo",
            selectedIMG,
            selectedIMG.name
        );
    
        axios.post('/api/member/upload', formData, {responseType:'blob', headers : {'content-type': 'multipart/form-data'}})
        .then(resp => {
            console.log(resp.data);

            const reader = new FileReader();
            reader.readAsDataURL(new Blob([resp.data]));
            reader.onloadend = () => {
                console.log(uploadedFile);
                setUploadedFile(reader.result)
            };
        } );
    }
 */



    return (
        <Container>
            <h1 className='proMember'><GiFireSilhouette/>Pro Member</h1> <br /> 
            
            <hr className="aliceBlue" />

            <h3 className="aliceBlue">Crea tu Perfil de Musico para que puedas encontrar una banda para ti !!</h3> <br />
            <Form onSubmit={guardar} encType='multipart/form-data'>
                <FormGroup className="formPerfil">
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl name="nombre" value={formulario.nombre} type="text" onChange={actualizaForm} required/>
                </FormGroup> <br />
                <FormGroup className="formPerfil">
                    <FormLabel>Email</FormLabel>
                    <FormControl name="email" value={formulario.email} type="email" onChange={actualizaForm} required/>
                </FormGroup> <br />
                <FormGroup className="formPerfil">
                    <FormLabel>Numero Telefonico (opcional)</FormLabel>
                    <FormControl name="numero" value={formulario.numero} type="number" onChange={actualizaForm} />
                </FormGroup> <br />
                <FormGroup className="formPerfil">
                    <FormLabel>Breve descripción: su experiencia, genero preferido, influencias, etc...</FormLabel>
                    <FormControl name="descripcion" value={formulario.descripcion} as="textarea" onChange={actualizaForm} required/>
                </FormGroup> <br /> 
                <FormGroup className="formPerfil">
                    <FormLabel>Especifique su rol en la banda (primera guitarra, coros, etc...)</FormLabel>
                    <FormControl name="rol" value={formulario.rol} type="text" onChange={actualizaForm} required/>
                </FormGroup> <br /><br />
                <Form.Select bsPrefix="formSelect"  name='especialidad' value={formulario.especialidad} onChange={actualizaForm}>
                    <option>Elije tu especialidad</option>
                    <option value="Vocal">Vocal</option>
                    <option value="Guitarra">Guitarra</option>
                    <option value="Bajo">Bajo</option>
                    <option value="Batería">Batería</option>
                    <option value="Percusión">Percusión</option>
                    <option value="Teclados">Teclados</option>
                    <option value="Vientos">Vientos</option>
                    <option value="Dj">DJ</option>
                    <option value="Productor">Productor</option>
                </Form.Select> <br /> <br /> <br />
                <FormGroup className="formPerfil">
                    <FormLabel>Elija una Imagen para su Perfil</FormLabel>
                    <FormControl  type='file' name='avatar'  accept="image/*" onChange={selectedFile}/> <br />
                    {/* <Button onClick={fileUpload}>Enviar Foto</Button> */}
                </FormGroup> <br /> <br />
                {/* <img src={uploadedFile}></img> */}
                

                <Button type="submit"> Subir Datos </Button>
                    <br /> <br />

                <Link to='/'>Volver al Inicio</Link> 

                <br /> <br />
            </Form>

        </Container>
    )
}

export default CreaPerfil;