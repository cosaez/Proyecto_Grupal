import { Container, Button, Row, Col } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { GiDrumKit } from 'react-icons/gi';
import { GiMusicalKeyboard } from 'react-icons/gi';
import { GiPanFlute } from 'react-icons/gi';
import { GiGuitarHead } from 'react-icons/gi';
import { GiCompactDisc } from "react-icons/gi";
import { GiMicrophone } from 'react-icons/gi';
import { GiDrum } from 'react-icons/gi';
import { CgMusicSpeaker } from 'react-icons/cg';
import { GiGuitarBassHead } from 'react-icons/gi';
import { GiFireSilhouette } from 'react-icons/gi'
import Intro from './Intro'
import '../App.css';
import React, { useState } from 'react';
import { useContext } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import UserContext from "./contexto/UserContext";



const Home = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const salir = e => {
        sessionStorage.removeItem('USUARIO');
        navigate('/login')
    }

    const { usuario } = useContext(UserContext)


    return (
        <div className="allHome">
            <Container className='containerHome'>
                <div className="navBar">
                    <h1 className='proMember'><GiFireSilhouette /> Pro Member</h1>
                    {usuario.musico == true ? '' : <Link className="creaPerfil" to="/perfil"><p>Crea tu Perfil de Musico !!</p></Link>}
                    <Button className='btn btn-danger' id="btnClose" onClick={salir}>Cerrar Sesión</Button>
                </div>
                <hr className="aliceBlue" /> <br /> <br />
                
                <Intro onClose={() => setShow(false)} show={show} />
                <div className="intro-responsive">
                    <h2 className="pregunta">¿En que consiste?</h2> <br /> <br />
                    <div className="descriptionHome">
                        <h4 className="descr">En esta super página podrás darte a conocer como músico y también conocer a otros artistas para poder hacer música juntos! <br /> <br /> Busca el integrante que se adecúe a lo que necesitas. Podrías llegar a formar la mejor banda de todas !!</h4> <br /><br />
                        <img className="imgBand" src={require("./imgs/5-20-22-Radial-Snarky-Pup-726x483.jpg")} alt="bandImg" />
                    </div> <br /><br /><br /><br />
                </div>
                <div className="intro-anuncios">
                    <Button className="intro-btn" onClick={() => setShow(true)}>Sobre el sitio</Button>
                    <Link to='/anuncios'><Button className="anuncio-btn">Necesitas instrumentos? Revisa nuestros anuncios</Button></Link>
                </div>
                <h2 className="aliceBlue">¿Que integrante estás buscando?</h2> <br /> <br />

                <Row className="linksTo">
                    <Col>
                        <Link to='/instrumentos/Vocal' className="link"><p style={{ backgroundColor: "#2345" }} className="linkPage">Vocales <GiMicrophone className="icons" /></p></Link>
                    </Col>
                    <Col>
                        <Link to='/instrumentos/Guitarra' className="link"><p style={{ backgroundColor: "#4683" }} className="linkPage">Guitarra <GiGuitarHead className="icons" /></p></Link>
                    </Col>
                    <Col>
                        <Link to='/instrumentos/Bajo' className="link"><p style={{ backgroundColor: "#8463" }} className="linkPage">Bajo <GiGuitarBassHead className="icons" /></p></Link>
                    </Col>
                </Row> <br />

                <Row className="linksTo2">
                    <Col>
                        <Link to='/instrumentos/Batería' className="link"><p style={{ backgroundColor: "#2679" }} className="linkPage">Batería <GiDrumKit className="icons" /></p></Link>
                    </Col>
                    <Col>
                        <Link to='/instrumentos/Vientos' className="link"><p style={{ backgroundColor: "#1000" }} className="linkPage">Vientos <GiPanFlute className="icons" /></p></Link>
                    </Col>
                    <Col>
                        <Link to='/instrumentos/Percusión' className="link"><p style={{ backgroundColor: "#0007" }} className="linkPage">Percusión <GiDrum className="icons" /></p ></Link>
                    </Col>

                </Row> <br />
                <Row className="linksTo3">
                    <Col>
                        <Link to='/instrumentos/Teclados' className="link"><p style={{ backgroundColor: "#1565" }} className="linkPage">Teclados <GiMusicalKeyboard className="icons" /></p></Link>
                    </Col>
                    <Col>
                        <Link to='/instrumentos/Dj' className="link"><p style={{ backgroundColor: "#9615" }} className="linkPage">DJ <GiCompactDisc className="icons" /></p ></Link>
                    </Col>
                    <Col>
                        <Link to='/instrumentos/Productor' className="link"><p style={{ backgroundColor: "#3682" }} className="linkPage">Productor <CgMusicSpeaker className="icons" /></p ></Link>
                    </Col>
                </Row> <br /><br />
            </Container>


        </div>


    )
}

export default Home;