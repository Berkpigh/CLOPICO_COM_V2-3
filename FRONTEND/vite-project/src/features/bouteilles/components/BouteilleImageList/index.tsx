import { LBouteilleImages } from "../../models";
import { OneCard } from "../OneCard/index"

export type ImageInfoProp = {
    items : LBouteilleImages,
    updateBout?: (id: number) => void,
    deleteBout?: (id: number) => void
}
export const BouteilleImageList = (props: ImageInfoProp) => {

    const updateThisBouteille = (id: number) => {
        if(typeof props.updateBout !== "undefined"){
            props.updateBout(id)
        }
    }
    const deleteThisBouteille = (id: number) => {
        if(typeof props.deleteBout !== "undefined"){
            props.deleteBout(id)
        }
    }

    const ImageInfo = props.items.map((imag) => (
        <OneCard
            key = {imag.bouteilleImageId}
            bouteilleImageId ={imag.bouteilleImageId}
            bouteilleId = {imag.bouteilleId}
            imageDesc = {imag.imageDesc}
            imageUrl = {imag.imageUrl}
            updateBout = {updateThisBouteille}
            deleteBout = {deleteThisBouteille}
        >
        </OneCard>
    ))

    const composant = (
        <>
            {ImageInfo}
        </>
    )
    return composant
}