var restify = require('restify');
const { Pool } = require('pg');

const connectionString = 'postgresql://rown:scrotolol@62.75.141.240:5432/petbitedb';

const pool = new Pool({
  connectionString: connectionString,
})

const server = restify.createServer({
  name: 'pbadmin server',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/adminize/all', async (req, res, next) => {
  try {
    const all = await pool.query('SELECT brands.id, brands.name, products.name FROM brands INNER JOIN products ON products.brand_id = brands.id ORDER BY brands.name, products.name', (err, res) => {
      console.log(res.rows);
    });
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/brands', async (req, res, next) => {
  try {
    const brands = await pool.query('SELECT * FROM brands', (err, res) => {
      console.log(brands.rows);
    });
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.post('/adminize/products', async (req, res, next) => {
  try {
    const products = await pool.query('SELECT * FROM products', (err, res) => {
      console.log(products.rows);
    });
    return next();
  } catch (err) {
    console.log(err.stack)
  }
});

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});