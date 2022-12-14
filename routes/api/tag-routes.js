const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// todo: write promises (.then or async/await)

// find all tags
// be sure to include its associated Product data
// todo: async/await promise - this doesn't work (only shows basic info)
// router.get('/', async (req, res) => {
//   try {
//     const TagData = await Tag.findAll({ model: Product, through: ProductTag, as: 'productTag_product' });
//       res.status(200).json(TagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// todo: .then promise - this works
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
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id`
// be sure to include its associated Product data
// todo: async/await promise - this doesn't work
// router.get('/:id', async(req, res) => {
//   try {
//     const TagData = await Tag.findByPk({model: Product, through: ProductTag, as: 'productTag_product'});
//     if (!TagData) {
//       res.status(404).json({ message: 'No tag found with this id!' });
//       return;
//     }
//     res.status(200).json(TagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// todo: .then promise - this works
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
  .then(tagData => {
    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new tag
// todo: write async/await promise - this doesn't work
// router.post('/', async (req, res) => {
//   try {
//     const tagData = await Tag.create(req.body);
//     res.status(200).json(TagData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


// todo: .then promise - this works
router.post('/', (req, res) => {
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


// todo: async/await promise - this doesn't work
// DELETE a product
// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const TagData = await Tag.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!TagData) {
//       res.status(404).json({ message: 'No product found with this id!' });
//       return;
//     }
//     res.status(200).json(TagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// todo: .then promise - this works
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
  console.log(err);
  res.status(500).json(err);
  });
});

module.exports = router;
