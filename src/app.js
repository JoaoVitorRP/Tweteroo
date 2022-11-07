import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const user = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  user.push(req.body);

  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  if (tweets.length === 10) {
    tweets = tweets.filter((twt, index) => index > 0);
  }

  tweets.push({
    username,
    avatar: `${user[user.length - 1].avatar}`,
    tweet,
  });

  console.log(tweets);

  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(5000, console.log("Servidor iniciado na porta 5000"));
