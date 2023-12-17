import "./FileInput.css"

interface FileInputProps {
}

const FileInput: React.FC<FileInputProps> = ({  }) => {
    return(
        <div>
            <input type="file" />
        </div>
    )
}

export default FileInput