import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error('Error uploading file.');
      }
    } catch (error) {
      console.error('There was an error sending the file.', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>

      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Narrative</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.step}</td>
              <td>{item.narrative}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
