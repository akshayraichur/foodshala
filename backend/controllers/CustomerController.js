const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Orders = require('../models/Orders')

const Customer = require("../models/Customer");
const Restaurant = require("../models/Restaurant");
const Item = require('../models/Item')

exports.CustomerRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "Validation error" });
  }

  const { name, email, password, isVeg } = req.body;

  let existinguser;
  try {
    existinguser = await Customer.findOne({ email: email });
  } catch (e) {
    return res.json({ err: "There was some error verifying the account." });
  }

  // See if a customer email is present or no
  let restaurantUser;
  try {
    restaurantUser = await Restaurant.findOne({ email });
  } catch (e) {
    return res.json({ err: "There some error with the email id" });
  }

  if (restaurantUser)
    return res.json({
      err: "This email is already associated with Restaurant account.",
    });

  if (existinguser)
    return res.json({
      err:
        "There already an account exists with this email, choose a different email address",
    });

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    return res.json({ err: "There was some error hashing the password" });
  }

  const addNewUser = new Customer({
    name,
    email,
    isVeg,
    password: hashedPassword,
    orders: [],
  });

  let saveUser;
  try {
    saveUser = await addNewUser.save();
  } catch (e) {
    return res.json({ err: "There was some problem saving the user" });
  }

  return res.json({ message: "User created successfully", user: saveUser });
};

exports.CustomerLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "Validation error" });
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await Customer.findOne({ email: email });
  } catch (error) {
    return res.json({ err: "There was some problem finding the account." });
  }

  if (!existingUser) {
    return res.json({ err: "The user doesn't exist! " });
  }

  let checkIfRestaurantUser;
  try {
    checkIfRestaurantUser = await Restaurant.findOne({ email: email });
  } catch (error) {
    return res.json({
      err:
        "This email is associated with restaurant account, please signin with customer account.",
    });
  }

  let verifyPassword;
  try {
    verifyPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return res.json({ err: "There was some error checking the password" });
  }

  let token;
  try {
    token = jwt.sign(
      { email: existingUser.email, role: existingUser.role },
      process.env.JWTSECRET
    );
  } catch (error) {
    return res.json({ err: "There was some error in preparing JWT" });
  }

  const twoYear = 1000 * 60 * 60 * 24 * 365 * 2;

  //This sets up a cookie
  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: twoYear,
  });

  return res.json({
    message: "Logged In!!",
    user: {
      restaurantName: existingUser.restaurantName,
      email: existingUser.email,
      id: existingUser._id,
      role: existingUser.role,
    },
    token: token,
    isAuth: true,
  });
};

exports.CustomerOrder = async (req, res, next) => {
  const {customer, itemId, restaurant} = req.body;

  let findCustomer;
  try{
    findCustomer = await Customer.findById(customer)
  }catch (e) {
    return res.json({err: 'Problem finding customer'})
  }

  if(!findCustomer) return res.json({err: 'Not found customer'})

  let findRes;
  try{
    findRes = await Restaurant.findById(restaurant)
  }catch (e) {
    return res.json({err: 'Problem finding restaurant'})
  }

  if(!findRes) return res.json({err: 'Not found Restaurant'})

  let item;
  try{
    item = await Item.findById(itemId)
  }catch (e) {
    return res.json({err: 'Problem finding Item'})
  }

  const add = new Orders({
    customerName: findCustomer.name,
    customerEmail: findCustomer.email,
    restaurantName: findRes.restaurantName,
    restaurantEmail: findRes.email,
    itemName: item.name,
    itemPrice: item.price,
    customerId: customer,
    itemId: itemId,
    restaurantId: restaurant
  })

  let saveOrder
  try{
    saveOrder = await add.save();
  }catch(e){
    return res.json({err: 'There was some error in saving the order'})
  }

  // let pushOrder
  let findRestaurant;

  try{
    findRestaurant = await Restaurant.findById(restaurant)
  }catch (e) {
    return res.json({err: 'Error finding the restaurant'})
  }

  if(!findRestaurant){
    return res.json({err :'Restaurant doesnt exist'})
  }

  try{
    findRestaurant.orders.push(saveOrder._id)
  }catch (e) {
    return res.json({err: 'Error pushing the order into restaurant'})
  }

  //Restaurant.orders.push(saveOrder._id);
  return res.json({message: 'Added!', order: saveOrder})
}

exports.CustomerAccount = async (req, res, next) => {
  const {cid} = req.params;

  let findCustomer;
  try{
    findCustomer = await Customer.findById(cid);
  }catch(e){
    return res.json({err: 'Cant find customer acc'})
  }

  if(!findCustomer) return res.json({err: 'Not found'})

  return res.json({message: 'Found', customer: findCustomer})
}