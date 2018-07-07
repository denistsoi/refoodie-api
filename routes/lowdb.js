const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./.data/food.json')
const db = low(adapter);

db.defaults({ food: [], users: [] }).write();

const User = require('../models/User');
const Resource = require('../models/Resource');

/**
 * create Food posting
 * @param {*} req 
 * @param {*} res 
 */
const createFood = async (req, res) => {
  const { name, details } = req.body;
  const resource = new Resource({ name, details });

  await db.get('food').push(resource).write();
  
  res.json({ 
    status: "OK", 
    resource
  });
}

/**
 * list Food posts
 * @param {*} req 
 * @param {*} res 
 */
const listFood = async (req, res) => {
  const foods = await db.get('food').value();
  res.json({ foods });
}


/**
 * create User Account
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
  const { name, address, contact } = req.body;
  
  let id = await db.get('users').value().length + 1;

  const user = new User({ id, name, address, contact });

  try {
    await db.get('users').push(user).write();
    res.json({
      status: "OK",
      user
    })
  } catch (error) {
    res.json({
      status: "Error: fault creating user",
      user,
    })
  }
}

const listUsers = async (req, res) => {
  const users = await db.get('users')
  res.json({
    userss
  })
}


module.exports = {
  createUser,
  createFood,
  listFood,
}