import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import axios from "axios";

const app = express();
const port = process.env.PORT || 8080;
const dir = dirname(fileURLToPath(import.meta.url));

app.use(express.static(dir + "/public"));

app.set("view engine", "ejs");
app.set("views", dir + "/views");

app.get("/", async (req, res) => {
    var data = await getJoke();

    // Check if the request is for JSON (e.g., from fetch)
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json(data);
    }

    res.render("hello", { joke : data });
});

app.listen(port, () => {
    console.log(`Server Running on port ${port}.`);
});

async function getJoke() {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/random');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }