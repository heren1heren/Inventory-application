import asyncHandler from 'express-async-handler';
import Item from '../models/itemModel.js';
import Category from '../models/categoryModel.js';
import { body, validationResult } from 'express-validator';
export const index = asyncHandler(async (req, res, next) => {
  const categoriesCount = await Category.countDocuments();
  const itemsCount = await Item.countDocuments();

  res.render('index', {
    title: 'inventory',
    categoriesCount: categoriesCount,
    itemsCount: itemsCount,
  });
});

export const categories_list = asyncHandler(async (req, res, next) => {
  // need to fetch all categories data from mongodb
  const categoriesList = await Category.find().exec();
  const categoriesCount = categoriesList.length;
  res.render('categories_list', {
    title: 'Categories List',
    categoriesList,
    categoriesCount,
  });
});
export const category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const items = await Item.find(
    { category: req.params.id },
    { name: 1, url: 1 }
  )

    .sort({ name: 1 })

    .exec();
  // console.log(items);
  // console.log(category);

  res.render('category_detail', { title: 'Category Detail', category, items });
});
export const category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_create', { title: 'Create Category' });
});

export const category_create_post = [
  // validating
  [
    body('name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('name is empty')
      .isAlpha()
      .withMessage('name must be alphabetic')
      .escape(),

    body('description')
      .trim()
      .isLength({ min: 10 })
      .withMessage('description must be longer than 10 characters')
      .escape(),
  ],
  //processing
  async (req, res, next) => {
    // push validation results inside errors variable
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('category_create', {
        title: 'Create Category',
        errors: errors.errors,
      });
      return;
    }
    // pass -> create an instance and save it to mongodb
    console.log(req.body.name);
    console.log(req.body.description);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    category.save();
    res.redirect('/inventory/categories');
  },
];
export const category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const itemsByCategory = await Item.find({ category: req.params.id })
    .sort({
      name: 1,
    })
    .exec();
  res.render('category_delete', {
    title: 'Delete Category',
    category,
    itemsByCategory,
  });
});
export const category_delete_post = asyncHandler(async (req, res, next) => {
  res.redirect('/inventory/categories');
});
export const category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  res.render('category_update', { title: 'Update Category', category });
});
export const category_update_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
