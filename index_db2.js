var express = require('express');

var app = express();
app.use(express.json())

const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'database.sqlite'
// });
const sequelize = new Sequelize('mydb', 'root', '1234', {
  dialect: 'mariadb',
  dialectOptions: {
    // Your mariadb options here
    // connectTimeout: 1000
  }
});

const Users = sequelize.define('Users', {
  userid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
});

(async () => {
  await Users.sync();
  })();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');

app.get('/', async function(req, res) {
  const users = await Users.findAll();
  res.render('index',{ users: users});
});

app.post('/create', async function(req, res) {
  console.log(req.body.userid);
  console.log(req.body.username);
  const { userid, username } = req.body;
  await Users.create({ userid: userid, username: username });
  res.redirect('/')
});

app.post('/update/:id', async function(req, res) {
  console.log(req.body.userid);
  console.log(req.body.username);
  const { userid, username } = req.body;
  const { id } = req.params
  await Users.update({ userid: userid, username: username }, {
    where: {
      id: id
    }
  });
  res.redirect('/')
});

app.post('/delete/:id', async function(req, res) {
  const { id } = req.params
  await Users.destroy({
    where: {
      id: id
    }
  });
  res.redirect('/')
});

app.listen(3000);
console.log('Server is listening on port 3000');