const express = require('express');
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  complete: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;

