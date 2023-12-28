import { useState } from 'react';
import './App.css'
import FileInput from './components/Input/FileInput'
import PhotoViewer from './components/Photo/Photo'
import AsciiImage from './components/Ascii/AsciiImage';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };


  return (
    <>
      <p> welcome to my web exif viewer app. </p>
      <div className='App'>
        <FileInput onFileSelected={handleFileSelected} />
        <PhotoViewer file={selectedFile} />
        <AsciiImage file={selectedFile} width={556} height={755}  />
      </div>  
    </>
  )
}

export default App
