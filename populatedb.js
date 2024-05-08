#! /usr/bin/env node

console.log(
  'This script populates some test categories, items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2); // get uri from commandline

import Category from './models/categoryModel.js';
import Item from './models/itemModel.js';

const items = [];
const categories = [];
import mongoose from 'mongoose';
const { set, connect, connection } = mongoose;
set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function categoryCreate(index, name, description, url) {
  const categoryFields = { name, description };
  const category = new Category(categoryFields);
  await author.save();
  categories[index] = category;
  console.log(`Added category: ${categoryFields.name} ${categoryFields.url}`);
}

async function itemCreate(index, name, description, category, price, number) {
  const itemFields = {
    name,
    description,
    category,
    price,
    number,
  };

  const item = new Item(itemFields);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name} ${url}`);
}

async function createCategories() {
  console.log('Adding catagories');
  await Promise.all([
    categoryCreate(0, 'food', 'food category for chiefs'),
    categoryCreate(1, 'hobby', 'hobby category for goodies'),
  ]);
}

async function createItems() {
  console.log('Adding Items');
  await Promise.all([
    itemCreate(0, 'Ice cream', 'I  am an ice cream', 'food', 10, 1),
    itemCreate(1, 'nothing', 'I  am nothing', 'unknown', 0, 2),
  ]);
}
