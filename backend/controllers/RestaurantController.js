const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const Customer = require("../models/Customer");
const Restaurant = require("../models/Restaurant");
const Orders = require('../models/Orders')
const Item = require("../models/Item");

exports.RestaurantRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "Validation error" });
  }

  const { name, email, password, description } = req.body;

  let existinguser;
  try {
    existinguser = await Restaurant.findOne({ email: email });
  } catch (e) {
    return res.json({ err: "There was some error verifying the account." });
  }

  // See if a restaurant email is present or no
  let customerUser;
  try {
    customerUser = await Customer.findOne({ email });
  } catch (e) {
    return res.json({ err: "There some error with the email id" });
  }

  if (customerUser) {
    return res.json({
      err: "This email is already associated with Customer account.",
    });
  }

  if (existinguser) {
    return res.json({
      err:
        "There already exists an account with this email, choose a different email address",
    });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    return res.json({ err: "There was some error hashing the password" });
  }

  const addNewUser = new Restaurant({
    restaurantName: name,
    email: email,
    password: hashedPassword,
    description,
    item: [],
    orders: [],
  });

  let saveUser;
  try {
    saveUser = await addNewUser.save();
  } catch (e) {
    console.log(e)
    return res.json({ err: "There was some problem saving the user" });
  }

  return res.json({ message: "User created successfully", user: saveUser });
};

exports.RestaurantLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "Validation error" });
  }

  const { email, password } = req.body;

  let checkCustomer;
  try {
    checkCustomer = await Customer.findOne({ email: email });
  } catch (error) {
    return res.json({
      err:
        "This account is already associated wuth Customer, you can login with customer login.",
    });
  }

  let checkUser;
  try {
    checkUser = await Restaurant.findOne({ email: email });
  } catch (e) {
    return res.json({ err: "There was some error with logging in the user" });
  }

  if (!checkUser) {
    return res.json({
      err: "There is no account the exists with this email id",
    });
  }

  let comparePassword;
  try {
    comparePassword = await bcrypt.compare(password, checkUser.password);
  } catch (error) {
    return res.json({ err: "Email id or Password is wrong" });
  }

  if (!comparePassword) {
    return res.json({ err: "Email id or Password is wrong" });
  }

  let token;
  try {
    token = jwt.sign(
      { email: checkUser.email, id: checkUser._id, role: checkUser.role },
      process.env.JWTSECRET,
      { expiresIn: "24h" },
    );
  } catch (error) {
    return res.json({ err: "There was some error creating the token." });
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
      email: checkUser.email,
      id: checkUser._id,
      role: checkUser.role,
      description: checkUser.description
    },
    token: token,
    isAuth: true,
  });
};

exports.RestaurantAddFood = async (req, res, next) => {
  const { resid } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "There is some validation error" });
  }

  let checkRestaurant;
  try {
    checkRestaurant = await Restaurant.findById(resid);
  } catch (error) {
    return res.json(
      { err: "There was some error finding the restaurant account 1" },
    );
  }

  if (!checkRestaurant) {
    return res.json(
      { err: "There was some error finding the restaurant account" },
    );
  }

  const { name, description, isVeg, price } = req.body;

  let addItem;
  try {
    addItem = new Item(
      { name, description, isVeg, price, resid: resid.toString() },
    );
  } catch (error) {
    return res.json({ err: "Error Adding the item" });
  }

  let saveItem;
  try {
    saveItem = await addItem.save();
  } catch (error) {
    return res.json({ err: "Error saving the item" });
  }

  return res.json({ message: "Item added successfully", item: saveItem });
};

exports.GetAllRestaurants = async (req, res, next) => {
  let getRestaurants;
  try{
    getRestaurants = await Restaurant.find()
  }catch (e) {
    return res.json({err: 'There was some problem with fetching the restaurants'})
  }

  if(!getRestaurants){
    return res.json({err: 'There are no Restaurants found'})
  }

  return res.json({message: 'Restaurants found!', restaurants: getRestaurants})

}

exports.GetItemsFromRestaurant = async (req, res, next) => {
  const {resid} = req.params;

  let checkRestaurant;
  try{
    checkRestaurant = await Restaurant.findById(resid)
  }catch(e){
    return res.json({err: 'There was some problem is loading this'})
  }

  if(!checkRestaurant){
    return res.json({err: 'There is no such Restaurant'})
  }

  let findItems;
  try{
    findItems = await Item.find({resid: resid})
  }catch(e){
    return res.json({err: 'There was some problem'})
  }

  if(!findItems){
    return res.json({err: 'No items added'})
  }

  return res.json({message: 'Found!' , items : findItems})

}

exports.GetARestaurant = async (req, res, next) => {
  const {resid} = req.params;

  let findRestaurant;
  try{
    findRestaurant = await Restaurant.findById(resid)
  }catch(e){
    return res.json({err: 'Error in finding the restaurant'})
  }

  if(!findRestaurant) return res.json({err: 'Couldnt find the restaurant'})

  return res.json({message: 'Found', restaurant: {name: findRestaurant.restaurantName, email: findRestaurant.email, role: findRestaurant.role, id: findRestaurant._id, item: findRestaurant.item, orders: findRestaurant.orders}})
}

exports.ViewOrders = async (req, res, next) => {
  const resid = req.user._id;

  let findOrder;
  try{
    findOrder = await Orders.find({restaurantId: resid})
  }catch(e){
    return res.json({err: 'There was some problem finding the restaurant'})
  }

  if(!findOrder) return res.json({err: 'There is no restaurant that exists with this name'})

  return res.json({message: 'Found', orders: findOrder})
}