const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// todo: write promises (.then or async/await)


// todo: async/await promise

// todo: .then promise - this works
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  .then(TagData => res.json(TagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// todo: async/await promise

// todo: .then promise - this works
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  .then(TagData => {
    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(TagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// todo: async/await promise

// todo: .then promise - this works
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(TagData => res.json(TagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// todo: async/await promise

// todo: .then promise - this works
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }
)
.then(TagData => {
  if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
  }
  res.json(TagData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
  });
});


// todo: async/await promise

// todo: .then promise - this works
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
  where: {
    id: req.params.id
  }
})
.then(TagData => {
  if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
  }
  res.json(TagData);
  })
  .catch(err => {
  console.log(err);
  res.status(500).json(err);
  });
});

module.exports = router;
