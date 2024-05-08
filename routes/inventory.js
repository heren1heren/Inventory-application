import { Router } from 'express';
const router = Router(); // instance

/**
 * how many router handlers?
 * category: get post
 * items: get post
 * item: get post
 * category:get post
 * homepage of inventory
 * = 9
 */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Inventory' });
}); // extract route handle to separate file called: controller

router.get('/categories', (req, res, next) => {
  res.render('categories_list', { title: 'Inventory' });
}); // extract route handle to separate file called: controller

// router.post();
// router.get();
// router.post();
// router.get();
// router.post();

export default router;
