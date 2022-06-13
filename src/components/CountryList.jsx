import { Container, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import MyNavbar from "./MyNavbar"

const CountryList = () => {
    const navigate=useNavigate()

    return(
        <>
            <MyNavbar/>
            <Container>
                <ListGroup>
      <ListGroup.Item className="pointer" onClick={()=>navigate("/route")}>le fraaaaaaance</ListGroup.Item>
    
    </ListGroup>
    
                </Container>
        </>
    )
}

export default CountryList