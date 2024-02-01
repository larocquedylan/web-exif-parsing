import { useCallback, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface FileInputProps {
  onFileSelected: (file: File) => void;
  selectedFile: File | null;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelected, selectedFile }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [status, setStatus] = useState<'initial' | 'success' | 'fail'>('initial');

  const fileInputRef = useRef<HTMLInputElement>(null);

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
        setStatus('fail');
        return;
      }

      if (!isValidFileType(file)) {
        updateError('Invalid file type. Please select a jpeg or png file.');
        setStatus('fail');
        return;
      }

      if (!isFileSizeValid(file)) {
        updateError('File too large. Please select a file under 25MB.');
        setStatus('fail');
        return;
      }

      try {
        setStatus('initial');

        const sanitizedFile = sanitizeExifData(file);
        onFileSelected(sanitizedFile);
        setStatus('success');
        setError(false);
        setErrorMessage('');
      } catch (error) {
        console.error('File processing error:', error);
        setStatus('fail');
        updateError('Error processing file.');
      }
    },
    [onFileSelected],
  );

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      setStatus('initial');

      if (
        e.dataTransfer.items &&
        e.dataTransfer.items.length > 0 &&
        e.dataTransfer.items[0].kind === 'file'
      ) {
        const droppedFile = e.dataTransfer.files[0];
        handleFileSelection(droppedFile);
      } else {
        updateError('No file to drop.');
        setStatus('fail');
      }
    },
    [handleFileSelection],
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileSelection(selectedFile);
      } else {
        updateError('No file was transferred.');
        setStatus('fail');
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

  const renderFileInput = () => {
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      fileInputRef.current?.click();
    };

    return (
      <div className='relative w-full' onClick={handleCardClick}>
        <input
          id='upload'
          type='file'
          ref={fileInputRef}
          onChange={handleOnChange}
          aria-label='File Upload'
        />
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
          className='grid w-full h-full items-center gap-1.5 bg-white rounded-md p-4'
          role='button'
          tabIndex={0}
          aria-label='File Input'
        >
          {isDragActive ? 'Drop it like its hot' : 'Drag and drop a file or click here'}
          <Result status={status} />
          {selectedFile}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderFileInput()}
      {error && renderAlert()}
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else {
    return null;
  }
};

export default FileInput;
