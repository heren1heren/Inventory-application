import Category from '../models/categoryModel.js';
import Item from '../models/itemModel.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
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

export const item_create_post = [
  // validating
  [
    body('name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('name is empty')
      .escape(),

    body('description')
      .trim()
      .isLength({ min: 10 })
      .withMessage('description must be longer than 10 characters')
      .escape(),

    body('category').trim().escape(),
    body('price').isNumeric({ min: 0 }).escape(),
    body('number').isInt({ min: 0, max: 100 }).escape(),
  ],
  //processing
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const categories = await Category.find().sort({ name: 1 }).exec();

    if (!errors.isEmpty()) {
      res.render('item_create', {
        title: 'Create item',
        categories,
        errors: errors.errors,
      });
      return;
    }
    // start to create data to mongodb
    // search for category by name: req.body.category then asignning it as a field inside item
    const item = new Item({
      name: req.body.description,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number: req.body.number,
    });
    await item.save();
    res.redirect('/inventory/items');
  }),
];

export const item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  res.render('item_delete', { title: 'Delete Item', item });
});
export const item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/inventory/items');
});
export const item_update_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const categories = await Category.find().exec();
  res.render('item_update', { title: 'Update Item', item, categories });
});
export const item_update_post = [
  // validating
  [
    body('name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('name is empty')
      .escape(),

    body('description')
      .trim()
      .isLength({ min: 10 })
      .withMessage('description must be longer than 10 characters')
      .escape(),

    body('category').trim().escape(),
    body('price').isNumeric({ min: 0 }).escape(),
    body('number').isInt({ min: 0, max: 100 }).escape(),
  ],
  //processing
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = await Item.findById(req.params.id).exec();
    const categories = await Category.find().sort({ name: 1 }).exec();

    if (!errors.isEmpty()) {
      res.render('item_update', {
        title: 'Create item',
        categories,
        item,
        errors: errors.errors,
      });
      return;
    }
    const updatedItem = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number: req.body.number,
      _id: req.params.id,
    });
    await Item.findByIdAndUpdate(req.params.id, updatedItem);
    res.redirect('/inventory/items');
  }),
];
