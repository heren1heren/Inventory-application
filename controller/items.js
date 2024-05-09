import Category from '../models/categoryModel.js';
import Item from '../models/itemModel.js';
import asyncHandler from 'express-async-handler';
export const items_list = asyncHandler(async (req, res, next) => {
  const itemsList = await Item.find().exec();
  const itemsCount = itemsList.length;

  res.render('items_list', { title: 'Items List', itemsList, itemsCount });
});
export const item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('category').exec();
  console.log(item);
  res.render('item_detail', { title: 'Item Detail', item });
});
export const item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();
  res.render('item_create', { title: 'Create Item', categories });
});

export const item_create_post = asyncHandler(async (req, res, next) => {
  // how to link category option as an object id into an item when post requests
  res.send('not implemented');
});

export const item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  res.render('item_delete', { title: 'Delete Item', item });
});
export const item_delete_post = asyncHandler(async (req, res, next) => {
  console.log('delete item');
  res.send('not implemented');
});
export const item_update_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const categories = await Category.find().exec();
  res.render('item_update', { title: 'Update Item', item, categories });
});
export const item_update_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
