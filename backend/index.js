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
    const all = await pool.query('SELECT brands.id AS brandId, brands.name AS brandname, brands.image AS brandimage, products.id AS productid, products.name AS productname, products.image AS productimage, diets.name AS dietname, animals.name as animalname, types.name as typename FROM brands INNER JOIN products ON products.brand_id = brands.id INNER JOIN diets ON products.diet_id = diets.id INNER JOIN animals ON products.animal_id = animals.id INNER JOIN types ON products.type_id = types.id');
    res.send(all.rows);
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

server.post('/adminize/addBrand', async (req, res, next) => {
  try {
    const brands = await pool.query(`INSERT INTO brands(name, image) VALUES ('${req.body.name}', '${req.body.image}')`);
    res.send({msg: 'added'});
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/products', async (req, res, next) => {
  try {
    const all = await pool.query('SELECT products.id AS productid, products.name AS productname, products.image AS productimage, diets.name AS dietname, animals.name as animalname, types.name as typename FROM products INNER JOIN diets ON products.diet_id = diets.id INNER JOIN animals ON products.animal_id = animals.id INNER JOIN types ON products.type_id = types.id');
    res.send(all.rows);
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});