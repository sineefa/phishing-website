// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { exec } = require('child_process'); // To execute Python script
// const path = require('path'); // For handling file paths

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());


// // app.post('/classify', (req, res) => {
// //   const { url } = req.body;

// //   // Define the path to the Python script
// //   const pythonScript = path.join(__dirname, 'URLTran.py'); // Ensure path is correct
  
// //   // Use double quotes around the URL argument to handle any special characters
// //   const command = `python "${pythonScript}" "${url}"`;

// //   console.log(`Executing command: ${command}`); // Log the command for debugging

// //   // Execute Python script
// //   exec(command, (error, stdout, stderr) => {
// //     if (error) {
// //       console.error(`Execution error: ${error.message}`);
// //       return res.status(500).json({ result: 'Error in classification', error: error.message });
// //     }
// //     if (stderr) {
// //       console.error(`Python stderr: ${stderr}`);
// //       // Log stderr but continue processing, assuming the error isn't critical
// //     }

// //     const pythonResult = stdout.trim(); // Get the output of the Python script
// //     console.log(`Python output: ${pythonResult}`); // Log the output for debugging

// //     // Interpret Python output
// //     if (pythonResult === '1') {
// //       res.json({ result: 'Phishing' });
// //     } else if (pythonResult === '0') {
// //       res.json({ result: 'Benign' });
// //     } else {
// //       res.status(500).json({ result: 'Error in classification' });
// //     }
// //   });
// // });


// // app.listen(port, () => {
// //   console.log(`Server running on http://localhost:${port}`);
// // });



// app.post('/classify', (req, res) => {
//   const { url } = req.body; // Ensure we extract 'url' from request body
  
//   if (!url) {
//     return res.status(400).json({ error: 'No URL provided' });
//   }

//   const pythonScript = path.join(__dirname, 'URLTran.py');
//   const command = `python "${pythonScript}" "${url}"`;

//   console.log(`Executing command: ${command}`);

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Execution error: ${error.message}`);
//       return res.status(500).json({ result: 'Error in classification', error: error.message });
//     }

//     const pythonResult = stdout.trim();
//     console.log(`Python output: ${pythonResult}`);

//     if (pythonResult === '1') {
//       res.json({ result: 'Phishing' });
//     } else if (pythonResult === '0') {
//       res.json({ result: 'Benign' });
//     } else {
//       res.status(500).json({ result: 'Error in classification' });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process'); // To execute Python script
const path = require('path'); // For handling file paths

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/classify', (req, res) => {
  const { url } = req.body;

  // Define the path to the Python script
  const pythonScript = path.join(__dirname, 'URLTran.py'); // Ensure path is correct
  
  // Use double quotes around the URL argument to handle any special characters
  const command = `python "${pythonScript}" "${url}"`;

  console.log(`Executing command: ${command}`); // Log the command for debugging

  // Execute Python script
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error.message}`);
      return res.status(500).json({ result: 'Error in classification', error: error.message });
    }

    // Log stderr but continue processing, assuming the error isn't critical
    if (stderr) {
      console.error(`Python stderr: ${stderr}`);
    }

    // Split the output by new lines and get the last non-empty line
    const outputLines = stdout.trim().split('\n');
    const pythonResult = outputLines[outputLines.length - 1].trim(); // Get the last non-empty line
    
    console.log(`Python output: ${pythonResult}`); // Log the output for debugging

    // Interpret Python output
    if (pythonResult === '1') {
      res.json({ result: 'Malicious URL (Phishing)' }); // Send response as 'Malicious'
    } else if (pythonResult === '0') {
      res.json({ result: 'Benign URL' }); // Send response as 'Benign'
    } else {
      res.status(500).json({ result: 'Error in classification' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
