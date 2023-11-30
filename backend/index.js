const fs = require('fs');
const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Live on port ${PORT}`);
});

app.get("/tests", (req, res) => {
  // Read the local JSON file
  fs.readFile('./tests.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Send the JSON data to the Angular app
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
});
