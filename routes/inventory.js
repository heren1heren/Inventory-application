import { Router } from 'express';
const router = Router(); // instance
import * as categories_response from '../controller/categories.js';
import * as items_response from '../controller/items.js';
import * as Path from './inventoryPaths.js';
//todo: extract path into another file;
// home page
router.get('/', categories_response.index);

// category routes
router.get(Path.categories_list_path, categories_response.categories_list);

router.get('/category/:id', categories_response.category_detail);

router.get('/categories/create', categories_response.category_create_get);

router.post('/categories/create', categories_response.category_create_post);

router.get('/categories/update', categories_response.category_update_get); // render update page

router.post('/categories/update', categories_response.category_update_post); //post delete request

router.get('/categories/delete', categories_response.category_delete_get); // render delete page

router.post('/categories/delete', categories_response.category_delete_post); // post delete request

// item routes
router.get('/items', items_response.items_list);

router.get('/item/:id', items_response.item_detail);

router.get('/items/create', items_response.item_create_get);

router.post('/items/create', items_response.item_create_post);

router.get('/items/update', items_response.item_update_get); // render update page

router.post('/items/update', items_response.item_update_post); //post delete request

router.get('/items/delete', items_response.item_delete_get); // render delete page

router.post('/items/delete', items_response.item_delete_post); // post delete request
export default router;
