import { useCallback, useRef, useState } from "react"
// import "./FileInput.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleFileDrop}
            className='grid w-full max-w-sm items-center gap-1.5'
            role='button'
            tabIndex={0}
            aria-label='File Input'
        >
            <Label htmlFor="upload" aria-label='upload input label' > </Label>
            <Input id='upload' type='file' ref={fileInputRef} onChange={handleOnChange} aria-label='File Upload' className="border-none"/>
            {isDragActive ? 'drop it like its hot' : fileName || 'Drag your file here or click to upload'}
        </div>
    );
};


export default FileInput;