import React from 'react';
const Intro = props => {
    if (!props.show) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="opacity-float" onClick={props.onClose}>
            </div>
            <div className="float">
                <h2 className="pregunta">¿En que consiste?</h2> <br /> <br />
                <div className="descriptionHome">
                    <h4 className="descr">En esta super página podrás darte a conocer como músico y también conocer a otros artistas para poder hacer música juntos! <br /> <br /> Busca el integrante que se adecúe a lo que necesitas. Podrías llegar a formar la mejor banda de todas !!</h4> <br /><br />
                    <img className="imgBand" src={require("./imgs/5-20-22-Radial-Snarky-Pup-726x483.jpg")} alt="bandImg" />
                </div>
                <div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Intro;