const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "045d8b6e521dc2882ebd8638dec87bcb3371daf7a447752bfe7b3c314fb5618656220ce37ca0ae0674fea993322c0b841faced13187d26b94c70d3d49e1a67cfac": 100,
  "049a16afd77e0d368463394bde7689a7a33c4735aa62c63765924ada0a59d29c295cd1807f7bc6f7a0e3f891da432d5e775340aaefc93d3416987f1e86cefaaa82": 50,
  "04d455de740f9a56c31de7d9cd93439c3047c5ca255db0d35f661a8ac459b06d4c63916aa542c2cd880c4256c0320d626a4f16f8f07eab463ff8ccc59ea3f8655c": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;``
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
