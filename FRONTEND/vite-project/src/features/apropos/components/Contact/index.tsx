import { Col, Container, Image, Row } from "react-bootstrap";
/**
 * Page magasin
 */
export const Contact = () => {
  return (
    <>
    <Container>
      <h1>Clopico Sàrl</h1>
      <h2>www.clopico.shop - pierre.berkovits@clopico.com</h2>
      <Row>
        <Col md={8}>
          <Image
            src="vineyard-6399505_640.jpg"
            rounded
          >
          </Image>
        </Col>
      </Row>
    </Container>
    </>
  );
};
