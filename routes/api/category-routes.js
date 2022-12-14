const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// todo: this works
// todo: async/await promise
// GET all categories
// find and return all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: Product });
      res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// todo: this works
// todo: async/await promise
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

// todo: this works
// todo: async/await promise
// CREATE a category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// todo: this works
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

// todo: this works
// todo: async/await promise
// DELETE a category
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
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
