import { Col, Row } from "react-bootstrap"
import SingleItem from "./SingleItem"
import { useSelector } from "react-redux"

const SelectedCategory = () => {
    const items = useSelector((state) => state.itemsSlice.items);

    return (
        <>

            <Col xs={10}>
                <Col>
                    <Row>
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