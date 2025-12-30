import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { makeinvisible, makevisible } from "../../../../redux/slices/etatpanierSlice";
import { AppDispatch, RootState } from "../../../../redux/store/storeRedux";
/**
 * Page magasin
 */
export const Magasin = () => {
  const etatpanier = useSelector((state: RootState) => state.etatpanier.etatp);
  const dispatch = useDispatch<AppDispatch>();
  console.log('etatpanier :',etatpanier)
  return (
    <>
    <Container>
      <h1>Bienvenue</h1>
      <h2>AOC Premier cru coteau de Lully</h2>
      <Button onClick={() => dispatch(makevisible())}>Montrer</Button>
      <Button onClick={() => dispatch(makeinvisible())}>Cacher</Button>
      <Row></Row>
      <Row>
        <Col md={8}>
{/*           <Image
            src="https://cdn.pixabay.com/photo/2021/09/06/20/12/cat-6602447_1280.jpg"
            rounded
          >
          </Image>
 */}        </Col>
      </Row>
    </Container>
    </>
  );
};
