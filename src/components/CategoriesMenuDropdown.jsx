import { Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addItems } from "../slices/items/itemsSlice"

const CategoriesMenuDropdown = () => {

    const items = useSelector((state) => state.itemsSlice.items);


    const getMainCategories = async () => {

        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}mainCategories/all`);
            const data = await response.json();
            // dispatch(addBrands(data));

        } catch (error) {
            console.log(error)
        }
    }
    const getCategories = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}categories/all`);
            const data = await response.json();
            // dispatch(addBrands(data));

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {/* categories.map((category)=>{}) */}
                {/* mainCategories.map((mCat)=>{}) */}
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default CategoriesMenuDropdown