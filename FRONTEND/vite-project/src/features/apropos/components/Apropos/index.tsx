import { Col, Container, Image, Row } from "react-bootstrap";
/**
 * Page magasin
 */
export const Apropos = () => {
  return (
    <>
    <Container>
      <h1>Clopico Sàrl</h1>
      <h2>Projet de viticulture pour les autres</h2>
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
