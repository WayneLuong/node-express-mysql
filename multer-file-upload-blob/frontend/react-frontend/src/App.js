import React, { useState } from 'react';
import './App.css';

function App() {

  const [files, setFiles] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/upload')
      .then(res => {
        res.json().then(data => {
          console.log(data)
          setFiles(data)
        })
      })

  }
  return (
    <div className="App">

      <h1>File Uploads</h1>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="myImage" />
        <input type="submit" value="Submit" />
      </form>
      <h1>Get Image</h1>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <input type="submit" value="Submit" />
      </form>

      {files.map(image => (
        <div>
          {image.mimeType == 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/gif' ?
            <span>
              <img src={image.file} alt="" />
              <a download={image.name} href={image.file}>Download: {image.name}</a>
            </span> :
            <span>
              <a download={image.name} href={image.file}>Download: {image.name}</a>
            </span>}
        </div>
      ))}

    </div>
  );
}

export default App;
