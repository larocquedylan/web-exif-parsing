import { useState } from 'react';
import FileInput from './components/Input/FileInput'
import PhotoViewer from './components/Photo/Photo'
import { CardTitle, CardHeader, CardContent, Card } from './components/ui/card';
import ExifViewer from './components/ExifData/ExifViewer';
import { defaultOptions } from './utils/ExifOptions';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsingOptions, setParsingOptions] = useState<object>(defaultOptions);
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };


  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-950 to-blue-900 p-2'>
      <p> welcome to my web exif viewer app. </p>
        <main className="flex-grow p-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Drag or Select Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="w-full">
              <FileInput onFileSelected={handleFileSelected} file={selectedFile}/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Photo View</CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoViewer file={selectedFile} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              {/* <CardTitle>Metadata View</CardTitle> */}
              <CardTitle>ASCII Image</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <pre>
                {`{`}
                <code className="text-sm text-gray-800">"id": 1, "name": "John Doe", "email": "john@doe.com"</code>
                {`}`}
              </pre> */}
              {/* <AsciiImage file={selectedFile} width={556} height={755}  /> */}
              <ExifViewer file={selectedFile} parseOptions={parsingOptions} />
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="flex items-center justify-center p-4 bg-gray-100">
        <span className="text-sm text-gray-600">© dylan larocque</span>
      </footer>
    </div>
    </>
  )
}


export default App
