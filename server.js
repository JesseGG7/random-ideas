const express = require('express');
const port = 5000;
const app = express();
const ideas = [
  {
    id: 1,
    text: 'This is a sample idea',
    tag: 'sample',
    user: 'JohnDoe',
    date: '2023-06-01',
  },
  {
    id: 2,
    text: 'Another idea for testing',
    tag: 'test',
    user: 'JaneDoe',
    date: '2023-06-02',
  },
  {
    id: 3,
    text: 'A third idea for testing',
    tag: 'test',
    user: 'BobSmith',
    date: '2023-06-03',
  },
];

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Random Ideas API' });
});
app.get('/api/ideas', (req, res) => {
  res.send({ success: true, data: ideas });
});
app.get('/api/ideas/:id', (req, res) => {
  const idea = ideas.find((i) => i.id === +req.params.id);
  if (!idea) {
    return res.status(404).json({ success: false, message: 'Idea not found' });
  }
  res.send({ success: true, data: idea });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
