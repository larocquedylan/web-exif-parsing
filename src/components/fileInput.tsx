import { useState } from "react"
import "./FileInput.css"

interface FileInputProps {
}

const FileInput: React.FC<FileInputProps> = ({  }) => {
    const [file, setFile] = useState<File | null>(null)
    const [image, setImage] = useState<string | undefined>(undefined)

    const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files
        if (fileList === null) {
            return
        }
        setFile(fileList[0])
        setImage(URL.createObjectURL(fileList[0]))
    }

    console.log("🚀 ~ file: fileInput.tsx:9 ~ file:", file)


    return(
        <div>
            <form>
                <label htmlFor="file-input"></label>
                <input 
                    type="file" 
                    id="file-input" 
                    name="file-input"
                    aria-label="file input"
                    onChange={handleFileSelection}
                />
            </form>
            {image && <img src={image} alt="image file uploaded" style={{width: "200px"} } />}
        </div>
    )
}

export default FileInput