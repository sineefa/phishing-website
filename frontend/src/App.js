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

  const renderWhoisInfo = () => {
    if (!whoisInfo) return null;

    // Check and log the whoisInfo structure to inspect domainName directly
    console.log("WHOIS Info Object:", whoisInfo);

    // Destructure fields and verify types
    let { domainName, creationDate, registryExpiryDate } = whoisInfo;

    // Debug log to see the exact value of domainName
    console.log("Raw Domain Name Value:", domainName);

    // If domainName is not a string, attempt to convert it
    if (domainName && typeof domainName !== "string") {
      domainName = String(domainName);
      console.warn("Converted domainName to string:", domainName);
    }

    // Use trim only if domainName is a string and apply it cautiously
    if (domainName && typeof domainName === "string") {
      // Only split if the domain has commas, and trim after verifying it's necessary
      if (domainName.includes(",")) {
        domainName = domainName.split(",")[0].trim();
      } else {
        domainName = domainName.trim();
      }
    } else {
      console.warn("Domain name is either missing or not in the expected format.");
      domainName = null; // Explicitly set domainName to null if extraction fails
    }

    // Verify values for creationDate and registryExpiryDate
    if (creationDate && typeof creationDate === "string") {
      creationDate = creationDate.split(",")[0].trim();
    }
    if (registryExpiryDate && typeof registryExpiryDate === "string") {
      registryExpiryDate = registryExpiryDate.split(",")[0].trim();
    }

    // Additional logging to confirm extraction
    console.log("Extracted Domain Name:", domainName);
    console.log("Creation Date:", creationDate);
    console.log("Registry Expiry Date:", registryExpiryDate);

    // Determine if the domain is alive by comparing today’s date to registryExpiryDate
    const currentDate = new Date();
    const expiryDate = registryExpiryDate ? new Date(registryExpiryDate) : null;

    // Check the status based on the availability of domain name and expiry date
    const isAlive = domainName && expiryDate && expiryDate > currentDate;

    if (isAlive) {
      return (
        <div className="whois-info">
          <h3>WHOIS Information</h3>
          <p>
            <strong>Domain Name:</strong> {domainName}
          </p>
          <p>
            <strong>Creation Date:</strong> {creationDate}
          </p>
          <p>
            <strong>Registry Expiry Date:</strong> {registryExpiryDate}
          </p>
          <p style={{ fontWeight: "bold", color: "green" }}>URL is Alive</p>
        </div>
      );
    } else {
      return (
        <div className="whois-info">
          <h3 style={{ color: "#FFD700", marginBottom: "10px" }}>WHOIS Information</h3>
          <p>
            <strong>Domain Name:</strong> {domainName || "Not available"}
          </p>
          <p>
            <strong>Creation Date:</strong> {creationDate || "Not available"}
          </p>
          <p>
            <strong>Registry Expiry Date:</strong> {registryExpiryDate || "Not available"}
          </p>
          <p style={{ fontWeight: "bold", color: "red" }}>URL is NOT alive</p>
        </div>
      );
    }
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

        {renderWhoisInfo()}
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
//   const [whoisInfo, setWhoisInfo] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setResult("");
//     setError("");
//     setWhoisInfo(null);
//     setLoading(true);

//     fetch("http://localhost:5000/classify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ url }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setResult(data.result || "Unknown result"); // Display the classification result or "Unknown result"
//         setWhoisInfo(data.whoisInfo); // Set WHOIS information regardless of classification outcome
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setError("Error in processing request");
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
//             <h3>WHOIS Information</h3>
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
