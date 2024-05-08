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
  res.send('not implemented');
});
export const category_create_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});

export const category_create_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});

export const category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
export const category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
export const category_update_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
export const category_update_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
