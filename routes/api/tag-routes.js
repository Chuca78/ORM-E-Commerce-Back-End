const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
  // todo: write promise (.then or async/await)


  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
  // todo: write promise (.then or async/await)


  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
  // todo: write promise (.then or async/await)


  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
  // todo: write promise (.then or async/await)


  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
  // todo: write promise (.then or async/await)
  

  });
});

module.exports = router;
