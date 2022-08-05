import { Col, Row } from "react-bootstrap"
import SingleItem from "./SingleItem"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

const SelectedCategory = () => {
    const navigate = useNavigate()
    const items = useSelector((state) => state.itemsSlice.items);

    return (
        <>

            <Col xs={10}>
                <Col>
                    <Row>
                        {/* map items. filter by the selected category*/}
                        <Col>
                            <SingleItem />
                        </Col>
                    </Row>
                </Col>
            </Col>
        </>
    )
}
export default SelectedCategory