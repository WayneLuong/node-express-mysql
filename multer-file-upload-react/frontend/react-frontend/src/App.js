import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>File Uploads</h1>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="myImage" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
