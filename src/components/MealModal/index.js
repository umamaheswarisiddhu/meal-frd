import React,{useState , useContext} from 'react';
import {Modal,Button} from'react-bootstrap';
import {MyContext}from "../../context";
import axios from '../../Axios';

function MealModal({title,description ,idMeal}) {
  
        const [show, setShow] = useState(false);
        const{user, setUser}= useContext(MyContext);
        const [loading, setLoading] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const handleAddToFavorites = ()=>{
          setLoading(true);
          axios.post("/add-favorites/",{ mealId: idMeal })
          .then(({data})=>{
            setLoading(false);
            setUser(data)
            alert("Meal added successfully!");

          })
          .catch((err)=>{
            setLoading(false);
            console.log(err)});
        };
        const handleRemoveFromFavorites = ()=>{
          setLoading(true);
          axios.post("/remove-favorites/",{ mealId: idMeal })
          .then(({data})=>{
            setLoading(false);
            setUser(data)
            alert("Meal removed successfully!");

          })
          .catch((err)=>{
            setLoading(false);
            console.log(err)});
        };
      
        return (
          <>
            <Button variant="primary" onClick={handleShow}>
              See More
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{description}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {user &&(
                  <>
                  {user.favorites.includes(idMeal) ? (

                    <Button variant="danger" onClick={handleRemoveFromFavorites} disabled={loading} >Remove from Favorites</Button>
                  ) :(

                    <Button variant="primary" onClick={handleAddToFavorites} disabled={loading} >Add to Favorites</Button>
                  )}
  
                    </>
                )}

              </Modal.Footer>
            </Modal>
          </>
        );
      
      
}

export default MealModal;