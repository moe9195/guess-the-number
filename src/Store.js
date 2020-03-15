import React from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal'
import { faGem } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Store(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let points = props.points
    let upgrades = props.upgrades




    let barUpgrade = <div className="row">
        <div className="col-sm">
        Colorbar <br/> <font size="1">display approximate location of number</font> 
        </div>
        <div className="col-sm">
            <button className = "btn btn-outline-dark btn " onClick={() => props.buyHelperBar()}>{upgrades.helperBar == true ? "Bought": <h6><FontAwesomeIcon icon={faGem}/><h6>1000</h6></h6>}</button>
        </div></div>

    let evenOrOddUpgrade = <div className="row">
        <div className="col-sm">
        Even or Odd <br/> <font size="1">tells you if number is even or odd</font> 
        </div>
        <div className="col-sm">
            <button className = "btn btn-outline-dark btn " onClick={() => props.buyEvenOdd()}>{upgrades.evenOdd == true ? "Bought": <h6><FontAwesomeIcon icon={faGem}/><h6>5000</h6></h6>}</button>
        </div></div>

    let AwesomeSurprise = <div className="row">
        <div className="col-sm">
        Awesome Surprise <br/> <font size="1">click for an awesome surprise!</font> 
        </div>
        <div className="col-sm">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className = "btn btn-outline-dark btn"><FontAwesomeIcon icon={faGem}/><h6>9999</h6></a>
        </div></div>
        


    return (
      <>
        <button onClick={handleShow} className="btn btn-outline-light btn-lg">{points} &nbsp; <FontAwesomeIcon icon={faGem}/> </button> &nbsp; &nbsp;
  
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
          <div className="card-body" align="center">
            <Modal.Title id="contained-modal-title-vcenter"><h3>Store</h3></Modal.Title>
          </div>
          </Modal.Header>
          <Modal.Body>
            <div className="container text-center">

            {barUpgrade}
            <br/>
            {evenOrOddUpgrade}
            <br/>
            {AwesomeSurprise}

             </div>
          </Modal.Body>

        </Modal>
      </>
    );
  }
  

  export default Store;