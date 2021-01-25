const mongoose = require('mongoose');
const app = require('./app');

const port = 3030;

app.listen(port, () => {
  mongoose
    .connect('mongodb://localhost:27017/chat', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`App ready on http://localhost:${port}`);
    });
});
