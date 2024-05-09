import { Router } from 'express';
const router = Router(); // instance
import * as categories_response from '../controller/categories.js';
import * as items_response from '../controller/items.js';
import * as Path from './inventoryPaths.js';
//todo: extract path into another file;
// home page
router.get(Path.index, categories_response.index);

// category routes
router.get(Path.categories_list_path, categories_response.categories_list);

router.get(Path.category_detail_path, categories_response.category_detail);

router.get(Path.category_create_path, categories_response.category_create_get);

router.post(
  Path.category_create_path,
  categories_response.category_create_post
);

router.get(Path.category_update_path, categories_response.category_update_get); // render update page

router.post(
  Path.category_update_path,
  categories_response.category_update_post
); //post delete request

router.get(Path.category_delete_path, categories_response.category_delete_get); // render delete page

router.post(
  Path.category_delete_path,
  categories_response.category_delete_post
); // post delete request

// item routes
router.get(Path.item_list_path, items_response.items_list);

router.get(Path.item_detail_path, items_response.item_detail);

router.get(Path.item_create_path, items_response.item_create_get);

router.post(Path.item_create_path, items_response.item_create_post);

router.get(Path.item_update_path, items_response.item_update_get); // render update page

router.post(Path.item_update_path, items_response.item_update_post); //post delete request

router.get(Path.item_delete_path, items_response.item_delete_get); // render delete page

router.post(Path.item_delete_path, items_response.item_delete_post); //
export default router;
