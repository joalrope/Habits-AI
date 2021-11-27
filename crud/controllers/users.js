const { request, response } = require('express');
const Users = require('../models/Users');

const createUser = async (req = request, res = response) => {
  const { name } = req.body;
  console.log(name);

  try {
    let user = await Users.findOne({ name });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: `Ya existe el cliente: ${name}`,
        result: [],
      });
    } else {
      user = new Users(req.body);
      await user.save();
      return res.status(201).json({
        ok: true,
        msg: 'User created',
        result: user,
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

const getUsers = async (req = request, res = response) => {
  try {
    const users = await Users.find();

    if (users) {
      res.status(200).json({
        ok: true,
        msg: 'Get Users',
        result: users,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: `There is not users`,
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    const foundUser = await Users.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({
        ok: false,
        msg: `There is not user with id: ${req.params.id}`,
      });
    }

    const newData = { ...req.body };
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      msg: 'Updated user',
      result: updatedUser,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const foundUser = await Users.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({
        ok: false,
        msg: `There is no user with id: ${req.params.id}`,
      });
    }

    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({
      ok: true,
      msg: `user ${foundUser.name} removed`,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const msgError = (res, err) => {
  res.status(500).json({
    ok: false,
    msg: 'Please, talk to the administrator',
  });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
