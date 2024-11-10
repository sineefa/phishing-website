const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const { spawn } = require("child_process");

const app = express();
const port = 5000;

const API_URL = "https://gfp6ousrgw8gfh9m.us-east-1.aws.endpoints.huggingface.cloud";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

app.use(cors());
app.use(bodyParser.json());

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

function fetchWhoisInfo(url) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["whois_extractor.py", url]);

    let data = "";
    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk;
    });

    pythonProcess.stderr.on("data", (error) => {
      console.error(`WHOIS error: ${error}`);
      reject("Error fetching WHOIS data");
    });

    pythonProcess.on("close", () => {
      try {
        const whoisInfo = JSON.parse(data);
        resolve(whoisInfo);
      } catch (error) {
        console.error(`Error parsing WHOIS JSON: ${error}`);
        reject("Error parsing WHOIS data");
      }
    });
  });
}

app.post("/classify", async (req, res) => {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ result: "Invalid URL format" });
  }

  try {
    // Fetch WHOIS data first
    const whoisInfo = await fetchWhoisInfo(url);

    // Prepare the response object with WHOIS data included
    let response = { whoisInfo, result: null };

    try {
      // Perform classification only after WHOIS data
      const payload = { inputs: url };
      const classificationResponse = await axios.post(API_URL, payload, { headers });
      const predictedClass = classificationResponse.data.predicted_class;

      // Append the classification result
      response.result = predictedClass === 1 ? "Malicious URL (Phishing)" : "Benign URL";
    } catch (classificationError) {
      console.error(`Error in classification: ${classificationError.message}`);
      response.result = "Error in classification";
    }

    res.json(response);
  } catch (error) {
    console.error(`Error in WHOIS lookup: ${error}`);
    res.status(500).json({ result: "Error in WHOIS lookup", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const whois = require("whois-json");

// const app = express();
// const port = 5000;

// const API_URL = "https://sylu1027vx8l2d8r.us-east-1.aws.endpoints.huggingface.cloud";
// const headers = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

// app.use(cors());
// app.use(bodyParser.json());

// function isValidUrl(url) {
//   try {
//     new URL(url);
//     return true;
//   } catch (_) {
//     return false;
//   }
// }

// app.post("/classify", async (req, res) => {
//   const { url } = req.body;

//   if (!isValidUrl(url)) {
//     return res.status(400).json({ result: "Invalid URL format" });
//   }

//   try {
//     // Fetch WHOIS data first, independent of the classification
//     const whoisData = await whois(url);
//     const whoisInfo = {
//       domainName: whoisData.domainName || "Unavailable",
//       creationDate: whoisData.creationDate || "Unavailable",
//       registryExpiryDate: whoisData.registryExpiryDate || "Unavailable",
//     };

//     // Prepare the response object with WHOIS data included
//     let response = { whoisInfo, result: null };

//     try {
//       // Perform classification only after WHOIS data
//       const payload = { inputs: url };
//       const classificationResponse = await axios.post(API_URL, payload, { headers });
//       const predictedClass = classificationResponse.data.predicted_class;

//       // Append the classification result
//       response.result = predictedClass === 1 ? "Malicious URL (Phishing)" : "Benign URL";
//     } catch (classificationError) {
//       console.error(`Error in classification: ${classificationError.message}`);
//       response.result = "Error in classification";
//     }

//     res.json(response);
//   } catch (error) {
//     console.error(`Error in WHOIS lookup: ${error.message}`);
//     res.status(500).json({ result: "Error in WHOIS lookup", error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const whois = require("whois-json"); // For retrieving WHOIS data

// const app = express();
// const port = 5000;

// const API_URL = "https://sylu1027vx8l2d8r.us-east-1.aws.endpoints.huggingface.cloud";
// const headers = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

// app.use(cors());
// app.use(bodyParser.json());

// function isValidUrl(url) {
//   try {
//     new URL(url);
//     return true;
//   } catch (_) {
//     return false;
//   }
// }

// app.post("/classify", async (req, res) => {
//   const { url } = req.body;

//   if (!isValidUrl(url)) {
//     return res.status(400).json({ result: "Invalid URL format" });
//   }

//   const payload = {
//     inputs: url,
//   };

//   try {
//     const response = await axios.post(API_URL, payload, { headers });
//     const predictedClass = response.data.predicted_class;

//     // WHOIS data retrieval
//     const whoisData = await whois(url);

//     // Extract relevant WHOIS information
//     const domainName = whoisData.domainName || "Unavailable";
//     const creationDate = whoisData.creationDate || "Unavailable";
//     const registryExpiryDate = whoisData.registryExpiryDate || "Unavailable";

//     const classificationResult = predictedClass === 1 ? "Malicious URL (Phishing)" : "Benign URL";

//     res.json({
//       result: classificationResult,
//       whoisInfo: {
//         domainName,
//         creationDate,
//         registryExpiryDate,
//       },
//     });
//   } catch (error) {
//     console.error(`Error in API call: ${error.message}`);
//     res.status(500).json({ result: "Error in classification", error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const axios = require("axios"); // For making HTTP requests

// const app = express();
// const port = 5000;

// // Replace with your Hugging Face API endpoint URL
// const API_URL = "https://sylu1027vx8l2d8r.us-east-1.aws.endpoints.huggingface.cloud";
// const headers = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   // "Authorization": "Bearer YOUR_API_KEY" // Uncomment if needed
// };

// app.use(cors());
// app.use(bodyParser.json());

// function isValidUrl(url) {
//   try {
//     new URL(url); // Will throw an error if the URL is not valid
//     return true;
//   } catch (_) {
//     return false; // If an error is thrown, it's not a valid URL
//   }
// }

// app.post("/classify", async (req, res) => {
//   const { url } = req.body;

//   // Validate URL format
//   if (!isValidUrl(url)) {
//     return res.status(400).json({ result: "Invalid URL format" });
//   }

//   // Payload to send to the Hugging Face inference API
//   const payload = {
//     inputs: url,
//   };

//   try {
//     // Make a POST request to the Hugging Face endpoint
//     const response = await axios.post(API_URL, payload, { headers });

//     // Extract predicted_class from the response
//     const predictedClass = response.data.predicted_class;

//     // Check the value of predicted_class and return the appropriate response
//     if (predictedClass === 1) {
//       res.json({ result: "Malicious URL (Phishing)" });
//     } else if (predictedClass === 0) {
//       res.json({ result: "Benign URL" });
//     } else {
//       res.status(500).json({ result: "Error in classification" });
//     }
//   } catch (error) {
//     console.error(`Error in API call: ${error.message}`);
//     res.status(500).json({ result: "Error in classification", error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { exec } = require("child_process"); // To execute Python script
// const path = require("path"); // For handling file paths

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.post("/classify", (req, res) => {
//   const { url } = req.body;

//   // Define the path to the Python script
//   const pythonScript = path.join(__dirname, "URLTran.py"); // Ensure path is correct

//   // Use double quotes around the URL argument to handle any special characters
//   const command = `python "${pythonScript}" "${url}"`;

//   console.log(`Executing command: ${command}`); // Log the command for debugging

//   // Execute Python script
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Execution error: ${error.message}`);
//       return res.status(500).json({ result: "Error in classification", error: error.message });
//     }

//     // Log stderr but continue processing, assuming the error isn't critical
//     if (stderr) {
//       console.error(`Python stderr: ${stderr}`);
//     }

//     // Split the output by new lines and get the last non-empty line
//     const outputLines = stdout.trim().split("\n");
//     const pythonResult = outputLines[outputLines.length - 1].trim(); // Get the last non-empty line

//     console.log(`Python output: ${pythonResult}`); // Log the output for debugging

//     // Interpret Python output
//     if (pythonResult === "1") {
//       res.json({ result: "Malicious URL (Phishing)" }); // Send response as 'Malicious'
//     } else if (pythonResult === "0") {
//       res.json({ result: "Benign URL" }); // Send response as 'Benign'
//     } else {
//       res.status(500).json({ result: "Error in classification" });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
