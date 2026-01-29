import express from 'express';

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());

let items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
];

app.get('/items', (req, res) => {
  res.status(200).json(items);
});

app.get('/items/:id', (req, res) => {
  const item = items.find(
    (i) => i.id === Number(req.params.id),
  );

  if (!item) {
    return res.sendStatus(404);
  }

  res.json(item);
});

app.post('/items', (req, res) => {
  if (!req.body.name) {
    return res.sendStatus(400);
  }

  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const item = items.find(
    (i) => i.id === Number(req.params.id),
  );

  if (!item) {
    return res.sendStatus(404);
  }

  if (!req.body.name) {
    return res.sendStatus(400);
  }

  item.name = req.body.name;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(
    (i) => i.id === Number(req.params.id),
  );

  if (index === -1) {
    return res.sendStatus(404);
  }

  items.splice(index, 1);
  res.sendStatus(204);
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});