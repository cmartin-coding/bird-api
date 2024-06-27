require("dotenv").config();
fetch(
  "https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=25&operator=AND",
  {
    method: "GET",
    headers: {
      accept: "application/json",
      "API-Key": process.env["BIRD_API_KEY"],
    },
  }
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
