const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');
// The `/api/tags` endpoint

// Find all tags with its associated Product data
router.get('/', (req, res) => {
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
    res.status(500).json(err);
  });
});

// Find a tag by its `id` with associated Product data
router.get('/:id', (req, res) => {
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
    res.status(500).json(err);
  });
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(TagData => res.json(TagData))
  .catch(err => {
    res.status(500).json(err);
  });
});

// Update a tag's name by its `id` value
router.put('/:id', (req, res) => {
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
  res.status(500).json(err);
  });
});

// Delete a product
router.delete('/:id', (req, res) => {
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
  res.status(500).json(err);
  });
});

module.exports = router;
