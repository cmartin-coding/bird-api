require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.get("/get-bird-otd", async (req, res) => {
  let randomPage = Math.floor(Math.random() * 41);
  // If it randomly hits 0 just grab first one
  if (randomPage === 0) {
    randomPage = 1;
  }

  const response = await fetch(
    `https://nuthatch.lastelm.software/v2/birds?page=25&pageSize=25&hasImg=true`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "API-Key": process.env["BIRD_API_KEY"],
      },
    }
  );

  const result = await response.json();
  console.log(result, "HERE");

  const randomBirdIndex = Math.floor(
    Math.random() * result.entities.length + 1
  );

  return result.entities[randomBirdIndex];
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
