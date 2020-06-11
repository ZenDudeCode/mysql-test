const express = require('express');
const router =  express.Router();


const path = require('path');

const pool = require('../database');

router.get('/add', (req, res) => {
   // res.send('formulario');
    res.render('links/add');
});

router.post('/add', async (req, res) => {
   // console.log(req.body)
  //  res.send('received');
  const { title, url, description} = req.body;
  const  newLink = {
      title,
      url,
      description
  };
  await pool.query('INSERT INTO links set ?', [newLink]);
  res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
   // res.send('Listas iran aqui');
   res.render('links/list.hbs', {links} );
});

router.get('/delete/:id', async (req, res) =>{
   // console.log(req.param.id);
   // res.send('Deleted');
   const { id } = req.params;
   await pool.query('DELETE FROM links WHERE ID = ?', [id]);
   res.redirect('/links');
});

router.get('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    console.log(id);
    const links = await pool.query('SELECT * FROM links WHERE id = ?',[id]);
    console.log(links[0]);
    res.render('links/edit', {link: links[0]});
    
    //await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    //res.redirect('/links');
 });

 router.post('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const { title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
     await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
     req.flash('success','Link succesfully saved');
     res.redirect('/links');
 });

module.exports = router;