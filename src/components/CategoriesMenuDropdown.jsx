import { Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

const CategoriesMenuDropdown = () => {

    // fetch all "categories"  and fill dropdown with them


    const getMainCategories = () => { }
    const getCategories = () => { }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default CategoriesMenuDropdown