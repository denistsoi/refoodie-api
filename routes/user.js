const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./.data/food.json')
const db = low(adapter);

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

/**
 * listUsers
 * @param {*} req 
 * @param {*} res 
 */
const listUsers = async (req, res) => {
  const users = await db.get('users').value()
  res.json({ users });
}

/**
 * retrieveUser
 * @param {*} req 
 * @param {*} res 
 */
const retrieveUser = async (req, res) => {
  const id = Number(req.params.id);  
  
  const user = await db.get('users').find({ id })

  if (!user) {
    res.json({
      status: "Error",
      message: "User is not found",
    })
  }

  res.json({ user });
};

/**
 * updateUser
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  const user = await db.get('users').find({ id });

  if (!user) {
    res.json({ 
      status: "Error",
      message: "User is not found"
    })
  }

  res.json({ user });
}


module.exports = {
  createUser, 
  listUsers,
  retrieveUser,
  updateUser,
}