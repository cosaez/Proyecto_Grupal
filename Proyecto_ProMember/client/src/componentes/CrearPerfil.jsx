import { useState } from "react"
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import {GiFireSilhouette} from 'react-icons/gi'



const dataInicial = {
    img:'',
    nombre:'',
    email:'',
    numero:'',
    descripcion:'',
    especialidad:'',
    rol:''
}

const CreaPerfil = () => {

    const [formulario, setFormulario] = useState(dataInicial);

    const [fileName, setFileName] = useState('')

    const [selectedIMG, setSelectedIMG] = useState(null)

    const navigate = useNavigate();




    const actualizaForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }


    const guardar =  (e) => {
        e.preventDefault();
        axios.post('/api/member/crear', formulario)
        .then(resp => {
            if(!resp.data.error) {
                navigate('/');
            } else {
                Swal.fire('Error', resp.data.mensaje,'error')
                return false
            }})
        }

        const fileUpload = () => {
            const formData = new FormData();
    
            formData.append(
                "my file",
                selectedIMG.name
            );
    
            console.log(selectedIMG);
    
            axios.post('/api/photos/upload', formData);
        }


    const handleFileChange = e => {
        const file = e.target.files[0];
        const isValidSize = file.size < 50 * 1024 * 1024
        const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
        const isValidType = isNameOfOneImageRegEx.test(file.name)

        if(!isValidSize) return alert('Imagen muy pesada, max 50MB')
        if(!isValidType) return alert('Solo puede subir imagenes')

        setFileName(file.name);
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedIMG(reader.result);
        }
        reader.readAsDataURL(file)
    }

    return (
        <Container>
            <h1 className='proMember'><GiFireSilhouette/>Pro Member</h1> <br /> 
            
            <hr className="aliceBlue" />

            <h3 className="aliceBlue">Crea tu Perfil de Musico para que puedas encontrar una banda para ti !!</h3> <br />
            <Form onSubmit={guardar}>
                <FormGroup className="formPerfil">
                    <FormLabel>Subir Imagen</FormLabel>
                    <FormControl formAction="/profile" formMethod="post" formEncType="multipart/form-data" type='file' name='img' value={formulario.img} accept="image/*" onChange={handleFileChange}/> <br />
                </FormGroup> 
                <img className='img-fluid' style={{
                    color:"aliceblue",
                        width:'50%',
                        height:'50%'
                }} src={selectedIMG} alt='profilePREV'></img> <br /> <br /><br /><br />
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
                </Form.Select> <br /> <br />
                

                <Button type="submit" onClick={fileUpload}> Subir Datos </Button>
                    <br /> <br />

                <Link to='/'>Volver al Inicio</Link> 

                <br /> <br />
            </Form>

        </Container>
    )
}

export default CreaPerfil;