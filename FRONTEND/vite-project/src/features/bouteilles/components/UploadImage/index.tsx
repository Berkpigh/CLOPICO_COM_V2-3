import {useState} from "react"
import axios from "axios"
import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";

export const UploadImage = () => {
    const [file,setFile] = useState<Blob>()

    let url: string = BASE_URL + "upload"

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!(e.target.files == null)) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("file", file)

        await axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data"}
        })
        alert("Fichier envoyé !")
    }

    return (
        <div>
            <h2>Uploader une image</h2>
            <input type ="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
            <button onClick={handleUpload}>Envoyer</button>
        </div>
    )
}