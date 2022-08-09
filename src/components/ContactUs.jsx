import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const ContactUs = () => {
  return (
    <>
      <h1>Contact Us</h1>
      <ul>
        <li> </li>
        <li> </li>
        <li> </li>
        <li> </li>
        <li> </li>
        <br />
        <li> </li>
        <li> </li>
        <li> </li>
        <li> </li>
        <li> </li>

      </ul>

      {/* google map where we are located */}
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d910.1302628522483!2d4.265224524993351!3d39.889890400498075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ses!4v1659966174291!5m2!1sen!2ses" style={{ border: "0", width: "50vw", height: "50vh" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </>
  )
}

export default ContactUs
