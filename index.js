require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  let randomPage = Math.floor(Math.random() * 41);
  // If it randomly hits 0 just grab first one
  if (randomPage === 0) {
    randomPage = 1;
  }

  const response = await fetch(
    `https://nuthatch.lastelm.software/v2/birds?page=${randomPage}&pageSize=25&operator=AND=`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "API-Key": process.env["BIRD_API_KEY"],
      },
    }
  );

  const { entities } = await response.json();
  const birdsWithImages = entities.filter((bird) => bird.images.length);
  const randomBirdIndex = Math.floor(
    Math.random() * birdsWithImages.length + 1
  );

  return birdsWithImages[randomBirdIndex];
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
