import { Container, Col, Row, Image, Button  } from "react-bootstrap"
/**
 * Page magasin
 */
export const Panier = () => {
  return (
    <>
    <Container>
      <h1>Bienvenue</h1>
      <h2>AOC Premier cru coteau de Lully</h2>
      <Button>
        
      </Button>
      <Row>
        <Col md={8}>
          <Image
            src="https://cdn.pixabay.com/photo/2021/09/06/20/12/cat-6602447_1280.jpg"
            rounded
          >
          </Image>
        </Col>
      </Row>
    </Container>
    </>
  );
};
