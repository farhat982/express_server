const userDB = {
  users: require('../model/user.json'),
  setUser: function (data) {
    this.users = data;
  },
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  //check for duplicate username in the db
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendstatus(409); //conflict

  try {
    //ecrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUser([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join('../model/user.json'),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
