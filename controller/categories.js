import asyncHandler from 'express-async-handler';
import Item from '../models/itemModel.js';
import Category from '../models/categoryModel.js';

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
  console.log(categoriesList);
  res.render('categories_list', { title: 'Categories List', categoriesList });
});
export const category_detail = asyncHandler(async (req, res, next) => {
  // need to fetch data of a current category -> then render detail page for it by getting its id through req.params.id
  const category = await Category.findById(req.params.id).exec();
  // using same category id to find all of its items
  const items = await Item.find(
    { category: req.params.id },
    { name: 1, url: 1 }
  )

    .sort({ name: 1 })

    .exec();
  console.log(items);
  console.log(category);
  // fetch items that contain this category throw mongoose

  res.render('category_detail', { title: 'Category Detail', category, items });
});
export const category_create_get = asyncHandler(async (req, res, next) => {
  console.log('access');
  res.render('category_create', { title: 'Create Category' });
});

export const category_create_post = asyncHandler(async (req, res, next) => {
  // validating and handling post request to mongodb through mongoose
  // so we need an array of middleware functions here
  res.send('not implemented');
});

export const category_delete_get = asyncHandler(async (req, res, next) => {
  res.render('category_delete', { title: 'Delete Category' });
});
export const category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
export const category_update_get = asyncHandler(async (req, res, next) => {
  res.render('category_update', { title: 'Update Category' });
});
export const category_update_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
