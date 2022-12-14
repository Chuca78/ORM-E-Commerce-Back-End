const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
// find and return all categories with associated products
// todo: async/await promise - this works
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: Product });
      res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// todo: async/await promise - this works
// find a single tag by its `id`
router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id,{ include: Product });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// todo: async/await promise - this works
// CREATE a category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// todo: .then promise - this works
// rewrote for .then (async wasn't working)
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update( 
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    } 
  )
  .then(categoryData => {
    if (!categoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
 
// todo: async/await promise - this doesn't work
// router.put('/:id', async (req, res) => {
//   // update a category by its `id` value
//   try {
//     const categoryData = await Category.update({
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!categoryData) {
//       res.status(404).json({ message: 'No category found with this id!' });
//       return;
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// todo: async/await promise - this works
// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
