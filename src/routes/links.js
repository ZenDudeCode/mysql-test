const express = require('express');
const router =  express.Router();


const path = require('path');

const pool = require('../database');

router.get('/add', (req, res) => {
   // res.send('formulario');
    res.render('links/add');
});

router.post('/add', (req, res) => {
    console.log(req.body)
  //  res.send('received');
});

module.exports = router;