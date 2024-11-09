///////////////Normal code//////////////

// import React, { useState } from 'react';
// import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

// function App() {
//   const [url, setUrl] = useState('');
//   const [result, setResult] = useState('');
//   const [error, setError] = useState('');


//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Send the input to the backend
//     fetch('http://localhost:5000/classify', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ url }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       setResult(data.result); // Display the result from backend (Malicious or Benign)
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setResult('Error in classification'); // Handle error case
//     });
//   };
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1><i className="fas fa-shield-alt"></i> Phishing URL Classifier</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter URL"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button type="submit">Detect</button>
//         </form>
        
//         {error && <p className="error-message">{error}</p>}
        
//         {result && (
//           <p className={result === 'Phishing' ? 'phishing-result' : 'not-phishing-result'}>
//             {result === 'Phishing' && <i className="fas fa-exclamation-triangle blinking-icon"></i>}
//             Result: {result}
//           </p>
//         )}
//       </header>

//       <div className="footer">
//         University of Ruhuna | Faculty of Engineering | Undergraduate Project | Group 06
//       </div>
//     </div>
//   );
// }

// export default App;


///////////////////loading.... message//////////////////////////////

// import React, { useState } from 'react';
// import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

// function App() {
//   const [url, setUrl] = useState('');
//   const [result, setResult] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // New loading state

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Reset the result and error states
//     setResult('');
//     setError('');
//     setLoading(true); // Set loading to true before the fetch

//     // Send the input to the backend
//     fetch('http://localhost:5000/classify', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ url }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       setResult(data.result); // Display the result from backend (Malicious or Benign)
//       setLoading(false); // Set loading to false after the response
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setError('Error in classification'); // Handle error case
//       setLoading(false); // Set loading to false on error
//     });
//   };
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1><i className="fas fa-shield-alt"></i> Phishing URL Classifier</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter URL"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button type="submit" disabled={loading}>Detect</button>
//         </form>
        
//         {loading && <p className="loading-message">Checking the URL...</p>} {/* Show loading message */}
        
//         {error && <p className="error-message">{error}</p>}
        
//         {result && (
//           <p className={result === 'Malicious URL (Phishing)' ? 'phishing-result' : 'not-phishing-result'}>
//             {result === 'Malicious URL (Phishing)' && <i className="fas fa-exclamation-triangle blinking-icon"></i>}
//             Result: {result}
//           </p>
//         )}
//       </header>

//       <div className="footer">
//         University of Ruhuna | Faculty of Engineering | Undergraduate Project | Group 06
//       </div>
//     </div>
//   );
// }

// export default App;




//////////////////with loading spinner////////////////



import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset the result and error states
    setResult('');
    setError('');
    setLoading(true); // Set loading to true before the fetch

    // Send the input to the backend
    fetch('http://localhost:5000/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    .then(response => response.json())
    .then(data => {
      setResult(data.result); // Display the result from backend (Malicious or Benign)
      setLoading(false); // Set loading to false after the response
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Error in classification'); // Handle error case
      setLoading(false); // Set loading to false on error
    });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1><i className="fas fa-shield-alt"></i> Phishing URL Classifier</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" disabled={loading}>Detect</button>
        </form>
        
        {loading && (
          <div className="loading-message">
            <div className="spinner"></div> {/* Show the spinner */}
            Loading...
          </div>
        )}
        
        {error && <p className="error-message">{error}</p>}
        
        {result && (
          <p className={result === 'Malicious URL (Phishing)' ? 'phishing-result' : 'not-phishing-result'}>
            {result === 'Malicious URL (Phishing)' && <i className="fas fa-exclamation-triangle blinking-icon"></i>}
            Result: {result}
          </p>
        )}
      </header>

      <div className="footer">
        University of Ruhuna | Faculty of Engineering | Undergraduate Project | Group 06
      </div>
    </div>
  );
}

export default App;
