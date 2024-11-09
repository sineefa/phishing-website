import React, { useState } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [whoisInfo, setWhoisInfo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setResult("");
    setError("");
    setWhoisInfo(null);
    setLoading(true);

    fetch("http://localhost:5000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result || "Unknown result"); // Display the classification result or "Unknown result"
        setWhoisInfo(data.whoisInfo); // Set WHOIS information regardless of classification outcome
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error in processing request");
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <i className="fas fa-shield-alt"></i> Phishing URL Classifier
        </h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button type="submit" disabled={loading}>
            Detect
          </button>
        </form>

        {loading && (
          <div className="loading-message">
            <div className="spinner"></div>
            Loading...
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {result && (
          <p className={result === "Malicious URL (Phishing)" ? "phishing-result" : "not-phishing-result"}>
            {result === "Malicious URL (Phishing)" && <i className="fas fa-exclamation-triangle blinking-icon"></i>}
            Result: {result}
          </p>
        )}

        {whoisInfo && (
          <div className="whois-info">
            <h3>WHOIS Information</h3>
            <p>
              <strong>Domain Name:</strong> {whoisInfo.domainName}
            </p>
            <p>
              <strong>Creation Date:</strong> {whoisInfo.creationDate}
            </p>
            <p>
              <strong>Registry Expiry Date:</strong> {whoisInfo.registryExpiryDate}
            </p>
          </div>
        )}
      </header>

      <div className="footer">University of Ruhuna | Faculty of Engineering | Undergraduate Project | Group 06</div>
    </div>
  );
}

export default App;

// import React, { useState } from "react";
// import "./App.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// function App() {
//   const [url, setUrl] = useState("");
//   const [result, setResult] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [whoisInfo, setWhoisInfo] = useState(null); // New state for WHOIS information

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setResult("");
//     setError("");
//     setWhoisInfo(null); // Reset WHOIS info on each new request
//     setLoading(true);

//     fetch("http://localhost:5000/classify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ url }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setResult(data.result);
//         setWhoisInfo(data.whoisInfo); // Set WHOIS info from backend response
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setError("Error in classification");
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>
//           <i className="fas fa-shield-alt"></i> Phishing URL Classifier
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
//           <button type="submit" disabled={loading}>
//             Detect
//           </button>
//         </form>

//         {loading && (
//           <div className="loading-message">
//             <div className="spinner"></div>
//             Loading...
//           </div>
//         )}

//         {error && <p className="error-message">{error}</p>}

//         {result && (
//           <p className={result === "Malicious URL (Phishing)" ? "phishing-result" : "not-phishing-result"}>
//             {result === "Malicious URL (Phishing)" && <i className="fas fa-exclamation-triangle blinking-icon"></i>}
//             Result: {result}
//           </p>
//         )}

//         {whoisInfo && (
//           <div className="whois-info">
//             <h3>WHOIS Information:</h3>
//             <p>
//               <strong>Domain Name:</strong> {whoisInfo.domainName}
//             </p>
//             <p>
//               <strong>Creation Date:</strong> {whoisInfo.creationDate}
//             </p>
//             <p>
//               <strong>Registry Expiry Date:</strong> {whoisInfo.registryExpiryDate}
//             </p>
//           </div>
//         )}
//       </header>

//       <div className="footer">University of Ruhuna | Faculty of Engineering | Undergraduate Project | Group 06</div>
//     </div>
//   );
// }

// export default App;

// //////////////////with loading spinner////////////////

// import React, { useState } from "react";
// import "./App.css";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome

// function App() {
//   const [url, setUrl] = useState("");
//   const [result, setResult] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // New loading state

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Reset the result and error states
//     setResult("");
//     setError("");
//     setLoading(true); // Set loading to true before the fetch

//     // Send the input to the backend
//     fetch("http://localhost:5000/classify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ url }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setResult(data.result); // Display the result from backend (Malicious or Benign)
//         setLoading(false); // Set loading to false after the response
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setError("Error in classification"); // Handle error case
//         setLoading(false); // Set loading to false on error
//       });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>
//           <i className="fas fa-shield-alt"></i> Phishing URL Classifier
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
//           <button type="submit" disabled={loading}>
//             Detect
//           </button>
//         </form>

//         {loading && (
//           <div className="loading-message">
//             <div className="spinner"></div> {/* Show the spinner */}
//             Loading...
//           </div>
//         )}

//         {error && <p className="error-message">{error}</p>}

//         {result && (
//           <p className={result === "Malicious URL (Phishing)" ? "phishing-result" : "not-phishing-result"}>
//             {result === "Malicious URL (Phishing)" && <i className="fas fa-exclamation-triangle blinking-icon"></i>}
//             Result: {result}
//           </p>
//         )}
//       </header>

//       <div className="footer">University of Ruhuna | Faculty of Engineering | Undergraduate Project | Group 06</div>
//     </div>
//   );
// }

// export default App;
