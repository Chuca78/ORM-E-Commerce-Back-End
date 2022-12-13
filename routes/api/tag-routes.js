const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// todo: write promise (.then or async/await)
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


// todo: write promise (.then or async/await)
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


// todo: write promise (.then or async/await)
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


// todo: write promise (.then or async/await)
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

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
  // todo: write promise (.then or async/await)
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
