const path = require('path');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const productController = require("./controllers/productController")
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser")
const app = express();
const User = require("./models/userModel")

connectDB();
app.use(bodyParser.json());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable CORS
app.use(cors());

app.post('/api/generate-referral-link', async (req, res) => {
  const { name } = req.body;
  const referralLink = `http://localhost:5000/referral/${name}`;

  // Update the user's referral link in the database
  await User.findOneAndUpdate({ name }, { referralLink }, { new: true });

  res.json({ referralLink });
});

// Track referral link visits and update user points
app.get('/api/referral/:name', async (req, res) => {
  console.log("data",req.params)
  const { name } = req.params;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ points: user.points });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.use('/api/users', require('./routes/userRoutes'));

app.post('/products', productController.create);
app.get('/products', productController.findAll);
app.get('/products/:productId', productController.findOne);
app.put('/products/:productId', productController.update);
app.delete('/products/:productId', productController.delete);

// Serve frontend


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
