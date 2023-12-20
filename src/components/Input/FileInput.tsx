import { useCallback, useRef, useState } from "react"
import "./FileInput.css"

interface FileInputProps {
    onFileSelected: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelected }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleFileSelection = useCallback((file: File) => {
        try {
            if (file.size === 0) {
                console.warn('Empty File Dropped.');
                return;
            }
            setFileName(file.name);
            onFileSelected(file);
        } catch (error) {
            console.error('Failed file processing:', error);
        }
    },[onFileSelected]);

  
    const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(false);

        if (
            e.dataTransfer.items &&
            e.dataTransfer.items.length > 0 &&
            e.dataTransfer.items[0].kind === 'file'
        ) {
            const droppedFile = e.dataTransfer.files[0];
            handleFileSelection(droppedFile);
        } else {
            console.warn('No file to drop.');
        }
    },[handleFileSelection]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(true);
    };

    const handleDragLeave = () => {
        setIsDragActive(false);
    };

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelection(file);
        } else {
            throw new Error('No file was transfered!');
        }
    },[handleFileSelection]);

    return (
        <div className='upload-container'>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleFileDrop}
                className='drag-drop-container'
                role='button'
                tabIndex={0}
                aria-label='File Input'
            >
                <input
                    ref={fileInputRef}
                    type='file'
                    aria-label='File Upload'
                    onChange={handleOnChange}
                    className='upload'
                />
                {isDragActive ? 'drop it like its hot' : fileName || 'Drag your file here or click to upload'}
            </div>
        </div>
    );
};


export default FileInput;