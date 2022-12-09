const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
  // todo: write promise (.then or async/await)


  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // todo: write promise (.then or async/await)
  

});

router.post('/', (req, res) => {
  // create a new category
  // todo: write promise (.then or async/await) 
    

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // todo: write promise (.then or async/await) 
    

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // todo: write promise (.then or async/await)
    

});

module.exports = router;
