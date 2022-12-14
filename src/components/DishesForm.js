import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function DishesForm ({ handleNewDish } ) {

  const { id } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    dish_name: "",
    restaurant_id: `${parseInt(id)}`,
    price: 0.00,
    description: "",
    image: ""
  })

  function onChange (event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function onSubmit(event) {
    event.preventDefault()

    fetch("http://localhost:9292/dishes", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => handleNewDish(data))

    setFormData({
      dish_name: "",
      restaurant_id: `${parseInt(id)}`,
      price: 0.00,
      description: "",
      image: ""
    })

    alert("New Dish Submitted")

    navigate(`/restaurants/${id}/dishes`)
  }


  return (
    <div id="dishesFormContainer">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} >
            <Form.Label>Dish Name:</Form.Label>
            <Form.Control 
              type="text" 
              name='dish_name'
              placeholder="Enter Name Here"
              value={formData.dish_name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Dish Description(Usually found on restaurant website):</Form.Label>
            <Form.Control 
              type='text'
              name='description'
              placeholder="Enter Description"
              value={formData.description}
              onChange={onChange}
            />
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col}>
            <Form.Label>Dish Cost:</Form.Label>
            <Form.Control 
              type='number'
              name='price'
              placeholder="Enter Dish cost:"
              value={formData.price}
              onChange={onChange}
            />
            </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Dish image:</Form.Label>
            <Form.Control 
              type='text'
              name='image'
              placeholder="Enter Dish Image URL:"
              value={formData.image}
              onChange={onChange}
            />
          </Form.Group>
        </Row>
        <br/>
        <Button onClick={onSubmit} variant="primary" type="submit">Submit New Dish</Button>
      </Form>
    </div>
  )

}

export default DishesForm