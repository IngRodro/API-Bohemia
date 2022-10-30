import express from 'express';
import {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from './menuOptions.controller';
import { TokenValidation } from '../../../Utils/Authentication';

const router = express.Router();

router.get('/show/:idRestaurant', getMenu);
router.get('/:idRestaurant', TokenValidation, getMenu);
router.post('/', TokenValidation, createMenu);
router.put('/:idMenu', TokenValidation, updateMenu);
router.delete('/:idMenu', TokenValidation, deleteMenu);

export default router;
