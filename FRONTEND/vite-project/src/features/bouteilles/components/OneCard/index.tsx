import { Card, Button } from "react-bootstrap";

type OneCardProps = {
    bouteilleImageId: number,
    bouteilleId: number,   
    imageDesc: string,
    imageUrl: string
    updateBout?: (id: number) => void,
    deleteBout?: (id: number) => void
}

export const OneCard = (props: OneCardProps) => {
    const clickUpdate = () => {
        if (typeof props.updateBout !== "undefined") { // type guard     
            props.updateBout(props.bouteilleImageId)
        }
    }
    const clickDelete = () => {
        if (typeof props.deleteBout !== "undefined") { // type guard     
            props.deleteBout(props.bouteilleImageId)
        }
    }
    return (
        <Card key={props.bouteilleImageId}>
            <Card.Title>{props.bouteilleImageId}&nbsp;&nbsp;</Card.Title>
            <Card.Header className="texthalfrem">
                {props.imageUrl}
            </Card.Header>
            <Card.Img src={props.imageUrl} variant="top"></Card.Img>
            <Card.Body><strong>{props.imageDesc}</strong></Card.Body>
            <Card.Footer>
                <Button type="button" onClick={clickUpdate}>M A J</Button>
                &nbsp;&nbsp;
                <Button type="button" onClick={clickDelete}>Supprimer</Button>
            </Card.Footer>
        </Card>
    )
}