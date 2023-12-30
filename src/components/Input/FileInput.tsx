import { useCallback, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface FileInputProps {
  onFileSelected: (file: File) => void;
  file: File | null;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelected }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
  
    const updateError = (message: string) => {
      setError(true);
      setErrorMessage(message);
      console.warn(message);
    };
  
    const isValidFileType = (file: File) => {
      const allowedTypes = ['image/jpeg', 'image/png'];
      return allowedTypes.includes(file.type);
    };
  
    const isFileSizeValid = (file: File) => {
      const maxSizeInBytes = 25 * 1024 * 1024; // 25MB
      return file.size <= maxSizeInBytes;
    };
  
    const sanitizeExifData = (file: File) => {
      // TODO: sanitize exif data
      return file;
    };

const handleFileSelection = useCallback(
    (file: File) => {
      if (file.size === 0) {
        updateError('Empty File Dropped.');
        return;
      }

      if (!isValidFileType(file)) {
        updateError('Invalid file type. Please select a jpeg or png file.');
        return;
      }

      if (!isFileSizeValid(file)) {
        updateError('File too large. Please select a file under 25MB.');
        return;
      }

      try {
        const sanitizedFile = sanitizeExifData(file);
        setFile(sanitizedFile);
        setFileName(sanitizedFile.name);
        onFileSelected(sanitizedFile);
        setError(false);
        setErrorMessage('');
      } catch (error) {
        console.error('File processing error:', error);
        updateError('Error processing file.');
      }
    },
    [onFileSelected],
  );

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
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
        updateError('No file to drop.');
      }
    },
    [handleFileSelection],
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileSelection(selectedFile);
      } else {
        updateError('No file was transferred.');
      }
    },
    [handleFileSelection],
  );


const renderAlert = () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );

  const renderFileInput = () => (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
      className='grid w-full max-w-sm items-center gap-1.5'
      role='button'
      tabIndex={0}
      aria-label='File Input'
    >
      <Label htmlFor='upload' aria-label='upload input label'>Upload File</Label>
      <Input
        id='upload'
        type='file'
        ref={fileInputRef}
        onChange={handleOnChange}
        aria-label='File Upload'
        className='border-none'
      />
      {isDragActive ? 'Drop it like its hot' : fileName || 'Drag your file here or click to upload'}
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</li>
          </ul>
        </section>
      )}
    </div>
  );

return (
    <>
      {error && renderAlert()}
      {renderFileInput()}
    </>
  );
};


export default FileInput;
