import { Container } from "react-bootstrap"
const Home = (props) => {
  const {
    iframeSource = `
    <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d84929.35896347032!2d-0.09635535198124827!3d42.888353056238344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0xd57e7ef6237b82f%3A0xe0824049f05f889a!2sPont%20d&#39;Espagne!3m2!1d42.851548!2d-0.1368737!4m5!1s0xd57da6c4ee15807%3A0x406f69c2f3d8c30!2s65400%20Argel%C3%A8s-Gazost!3m2!1d43.005027999999996!2d-0.101087!5e0!3m2!1sen!2sfr!4v1653497605491!5m2!1sen!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  } = props

  return (
    <Container>
      <div className="App" dangerouslySetInnerHTML={{ __html: iframeSource }}></div>
    </Container>
  )
}

export default Home
