import './App.css';
import { useEffect, useState } from 'react';
import Login from './componentes/registro/Login';
import Registro from './componentes/registro/Registro';
import UserContext from './componentes/contexto/UserContext';
import { useNavigate,Routes,Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './componentes/Home';
import CreaPerfil from './componentes/CrearPerfil';
import VerPerfil from './componentes/VerPerfil';
import Instrumentos from './componentes/instruments/Instrumentos';
import Contacto from './componentes/Contacto';



function App() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState();

  useEffect(() => {
    if(!usuario) {
      if(sessionStorage.getItem('USUARIO')) {
        setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')))
      } else {
        navigate('/login')
      }
    } else {
      sessionStorage.setItem('USUARIO', JSON.stringify(usuario));
    }
  }, [])

  return (

    <UserContext.Provider value={{usuario, setUsuario}}>
      <Container>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registro' element={<Registro />}></Route>
          <Route path='/perfil' element={<CreaPerfil />} ></Route>
          <Route path='/instrumentos/:especialidad' element={<Instrumentos/>}></Route>
          <Route path='/musico/:id' element={<VerPerfil />}></Route>
          <Route path='/contacto' element={<Contacto/>}></Route>
        </Routes>
      </Container>
    </UserContext.Provider>

  );
}

export default App;
