import React from 'react';
import './App.css';

function App() {
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/upload')
      .then(res => {
        res.json().then(data => {
          console.log(data)
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
    </div>
  );
}

export default App;
