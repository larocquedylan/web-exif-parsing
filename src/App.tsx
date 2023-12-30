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
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container space-y-12 px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center text-white'>
              Web Exif Viewer
            </h2>
            <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center mx-auto'>
              The main purpose of this project is to create a web-based application that allows users to upload
              image files (specifically JPG and PNG files) either by selecting them or by using a drag-and-drop
              interface. Once a file is uploaded, the application parses the file to extract Exif metadata. The
              application uses the HTML5 Drag and Drop API to enable file drag-and-drop functionality  this project is a
              web-based Exif viewer application that allows users to upload JPG or PNG files and view the Exif
              metadata contained in those files. The application provides a user-friendly interface with
              drag-and-drop file upload functionality, making it easy for users to upload files and view their
              metadata.
            </p>
          </div>
        </section>
        <main className="flex-grow p-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Drag or Select Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="w-full flex">
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
              <CardTitle>Metadata View</CardTitle>
              {/* <CardTitle>ASCII Image</CardTitle> */}
            </CardHeader>
            <CardContent>
              {/* <AsciiImage file={selectedFile} width={556} height={755}  /> */}
              <ExifViewer file={selectedFile} parseOptions={parsingOptions} />
            </CardContent>
          </Card>
        </div>
      </main>
      <section className='w-full py-12 md:py-24 lg:py-32'>
      </section>
      <footer className="flex items-center justify-center p-4">
        <span className="text-sm text-gray-600">dylan larocque</span>
      </footer>
    </div>
    </>
  )
}


export default App
