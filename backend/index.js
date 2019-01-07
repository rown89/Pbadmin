var restify = require('restify');
const { Pool } = require('pg');
const corsMiddleware = require('restify-cors-middleware');

const connectionString = 'postgresql://rown:scrotolol@62.75.141.240:5432/petbitedb';

const pool = new Pool({
  connectionString: connectionString,
})

const server = restify.createServer({
  name: 'pbadmin server',
  version: '1.0.0'
});

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
})

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight)
server.use(cors.actual)

server.post('/adminize/all', async (req, res, next) => {
  try {
    const all = await pool.query(
      `SELECT brands.id AS brandId, brands.name AS brandname, brands.image AS brandimage, products.id AS productid, products.name AS productname, products.image AS productimage, diets.name AS dietname, animals.name AS animalname, types.name AS typename FROM brands 
      INNER JOIN products ON products.brand_id = brands.id 
      INNER JOIN diets ON products.diet_id = diets.id 
      INNER JOIN animals ON products.animal_id = animals.id 
      INNER JOIN types ON products.type_id = types.id`
    );
    res.send(all.rows);
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/addBrand', async (req, res, next) => {
  try {
    const brands = await pool.query(`INSERT INTO brands(name, image) VALUES ('${req.body.name}', '${req.body.image}')`);
    res.send({msg: 'added'});
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/addProducts', async (req, res, next) => {
  const {name} = req.body;
  const {puppy} = req.body;
  const {cereal} = req.body;
  const {weight} = req.body;
  const {description} = req.body;
  const {image} = req.body;
  const {brandID} = req.body;
  const {animalID} = req.body;
  const {dietID} = req.body;
  const {typeID} = req.body;
  try {
    const products = await pool.query(
      `INSERT INTO products(name, is_puppy, is_cereal_free, weight, description, image, brand_id, animal_id, diet_id, type_id) VALUES ('${name}', '${puppy}', '${cereal}', '${weight}', '${description}', '${image}', '${brandID}', '${animalID}', '${dietID}', '${typeID}')`
    );
    res.send({msg: 'products added'});
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/animals', async (req, res, next) => {
  try {
    const animals = await pool.query('SELECT id AS animalID, name AS animalName FROM animals');
    res.send(animals.rows);
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/brands', async (req, res, next) => {
  try {
    const brands = await pool.query('SELECT id AS brandID, name AS brandName, image as brandImage FROM brands');
    res.send(brands.rows);
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/diets', async (req, res, next) => {
  try {
    const diets = await pool.query(`SELECT id AS dietID, name AS dietName FROM diets`);
    res.send(diets.rows);
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/products', async (req, res, next) => {
  try {
    const products = await pool.query(
      `SELECT products.id AS productid, products.name AS productname, products.image AS productimage, diets.name AS dietname, animals.name as animalname, types.name as typename FROM products 
      INNER JOIN diets ON products.diet_id = diets.id 
      INNER JOIN animals ON products.animal_id = animals.id 
      INNER JOIN types ON products.type_id = types.id`
    );
    res.send(products.rows);
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/types', async (req, res, next) => {
  try {
    const types = await pool.query(`SELECT id AS typeID, name AS typeName FROM types`);
    res.send(types.rows);
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});