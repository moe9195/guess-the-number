import React from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal'

function formatTime(ms) {
    if (ms) {
        return (ms/1000)
    }
    return ms
    
  }

function HighScoreModal(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    let highscores = props.highscores

    const easy = highscores.easy.map(score =>
        <tr className="table table-dark text-center">
          <td><font size="4" color="black">{formatTime(score)}</font></td>
        </tr>
        );

    const hard = highscores.hard.map(score =>
        <tr className="table table-dark text-center">
            <td><font size="4" color="black">{formatTime(score)}</font></td>
        </tr>
        );

    const insane = highscores.insane.map(score =>
        <tr className="table table-dark text-center">
            <td><font size="4" color="black">{formatTime(score)}</font></td>
        </tr>
        );


    return (
      <>
        <button onClick={handleShow} className="btn btn-outline-light btn-lg">Highscores</button> &nbsp; &nbsp;
  
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
          <div className="card-body" align="center">
            <Modal.Title id="contained-modal-title-vcenter"><h3>Highscores</h3></Modal.Title>
          </div>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <table className="table table-dark text-center">
                            <thead>
                                <tr>Easy</tr>
                            </thead>
                            <tbody>
                                 {easy}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm">
                    <table className="table table-dark text-center">
                            <thead>
                                <tr>Hard</tr>
                            </thead>
                            <tbody>
                                 {hard}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm">
                    <table className="table table-dark text-center">
                            <thead>
                                <tr>Insane</tr>
                            </thead>
                            <tbody>
                                 {insane}
                            </tbody>
                        </table>
                    </div>
               </div>
            </div>
          </Modal.Body>

        </Modal>
      </>
    );
  }
  

  export default HighScoreModal;