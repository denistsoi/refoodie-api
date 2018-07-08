const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./.data/food.json')
const db = low(adapter);

db.defaults({ food: [], users: [] }).write();

const User = require('../models/User');
const Resource = require('../models/Resource');

const { createUser, listUsers, retrieveUser, updateUser } = require('./user');

/**
 * create Food posting
 * @param {*} req 
 * @param {*} res 
 */
const createFood = async (req, res) => {
  const { type, userId, imageUrl } = req.body;
  
  const id = await db.get('food').value().length + 1;

  const resource = new Resource({ 
    id, 
    type,
    donatedBy: userId, 
    image: imageUrl,
  });

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
  const food = await db.get('food').value();
  res.json({ food });
}

/**
 * reserveFood
 * @param {*} req 
 * @param {*} res 
 */
const reserveFood = async (req, res) => {
  const { id } = req.body;
  const updatedAt = new Date().toISOString();
  
  const food = await db.get('food').find({ id }).assign({
    updatedAt,
    status: "COLLECTED",
    collected: true,
  }).write();

  res.json({
    status: "OK",
    food
  });
}

module.exports = {
  createUser,
  listUsers,
  retrieveUser,
  updateUser,

  createFood,
  listFood,
  reserveFood,
}