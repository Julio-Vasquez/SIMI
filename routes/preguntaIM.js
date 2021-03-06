
var express = require('express');
var router = express.Router();
const util = require('util');
const db = require('../utils/database').pool;

// Promesas nativas
const query = util.promisify(db.query).bind(db);

/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('preguntaIM', { title: 'Express', layout: 'admin' });
});

/* GET home page. */
router.get('/', async (req, res, next) => {
  const result = await query('SELECT * FROM test ');
  
  res.render('preguntaIM', { test: result,  layout: 'admin', title: 'Productos' })

});

/* traer un test de im  */
router.get('/:id', async (req, res, next) => {
  try {
    const result = await query(`SELECT test.cant_preguntas_test FROM test WHERE test.id = ${req.params.id}`);
    res.json(result);
  }
  catch (error) {
    console.log('Error =>', error);
    res.send(error.sqlMessage);
  }
});



router.post('/', async (req, res, next) => {
    var {texto} = req.body;
    try {
      const result = await query("INSERT INTO pregunta (fk_tema, texto, imagen) VALUES (?,?,?)", [01], [texto] , null);           
      res.json(result);
    } catch (error) {
      console.log('Error =>', error);
      res.send(error.sqlMessage);
    }
  });
  
  
  module.exports = router;