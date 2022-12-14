const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// todo: async/await promise - this works
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({ include: [{ model: Category}, { model: Tag, as: 'productTag_tag' }]});
      res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// todo: .then promise
// get all products
// router.get('/', (req, res) => {
//   // find all products
//   // be sure to include its associated Category and Tag data
//   Product.findAll({
//     include: [
//       {
//         model: Category
//       },
//       {
//         model: Tag,
//         attributes: ['tag_name'],
//         through: ProductTag,
//         as: 'productTag_tag'
//       }
//     ]
//   })
//   .then(productData => res.json(productData))
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });


// get one product
// todo: write async/await promise - this doesn't work
// router.get('/', async (req, res) => {
//   try {
//     const productData = await Product.findByPk(req.params.id,{ include: [{ model: Category}, { model: Tag, as: 'productTag_tag' }]});
//       if (!productData) {
//         res.status(404).json({ message: 'No product found with this id!' });
//         return;
//       }
//       res.status(200).json(productData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// todo: .then promise - this works
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: ProductTag,
        as: 'productTag_tag'
      }
    ]
  })
  .then(productData => {
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(productData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



// create new product
// todo: write async/await promise - this works
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// todo: .then promise - this works
// router.post('/', (req, res) => {
//   /* req.body should look like this...
//     {
//       product_name: "Basketball",
//       price: 200.00,
//       stock: 3,
//       tagIds: [1, 2, 3, 4]
//     }
//   */

//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });




// update product
// todo: write async/await promise


// todo: .then promise - this works
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// todo: write async/await promise - this works
// DELETE a product
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// todo: .then promise - this works
// router.delete('/:id', (req, res) => {
//   // delete one product by its `id` value
//   Product.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(productData => {
//     if (!productData) {
//       res.status(404).json({ message: 'No Product found with this id' });
//       return;
//     }
//     res.json(productData);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

module.exports = router;
