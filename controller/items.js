import Item from '../models/itemModel.js';
import asyncHandler from 'express-async-handler';
export const items_list = asyncHandler(async (req, res, next) => {
  const itemsList = await Item.find().exec();
  console.log(itemsList);
  // render url for each item
  res.render('items_list', { title: 'Items List', itemsList });
});
export const item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('category').exec();
  console.log(item);
  res.render('item_detail', { title: 'Item Detail', item });
});
export const item_create_get = asyncHandler(async (req, res, next) => {
  // what data do we need to display in this page, so we need to fetch them.
  console.log('view: item_create');
  res.render('item_create', { title: 'Create Item' });
});

export const item_create_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});

export const item_delete_get = asyncHandler(async (req, res, next) => {
  // what data do we need to display in this page, so we need to fetch them.

  res.render('item_delete', { title: 'Delete Item' });
});
export const item_delete_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
export const item_update_get = asyncHandler(async (req, res, next) => {
  // what data do we need to display in this page, so we need to fetch them.

  res.render('item_update', { title: 'Update Item' });
});
export const item_update_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented');
});
