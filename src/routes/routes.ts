import { Router } from 'express';
import trainerController from '../controllers/trainerController';
import itemController from '../controllers/itemController';
import pokemonController from '../controllers/pokemonController';
import authController from "../controllers/authController";
import example from '../middlewares/example';
import File from "../config/files";
import multer from "multer";
import authentication from "../middlewares/authentication";

const router = Router();
const upload = multer({ storage: File.storage });

//exemplo de middleware
router.use('/trainer', example);
router.use("/private", authentication);

var allUploads = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'file', maxCount: 1 }]);
//Rotas treinador
router.get('/trainer/:id', trainerController.index);
router.get('/trainers', trainerController.findAll);
router.get('/private/details', authController.getDetails);
router.post('/trainer/create', allUploads, trainerController.createTrainer);
router.post('/login', authController.login);
router.put('/private/trainer/update', allUploads, trainerController.updateTrainer);
router.delete('/private/trainer/delete', trainerController.deleteTrainer);

//Rotas itens
router.get('/item/:id', itemController.index);
router.get('/items', itemController.findAll);
router.post('/item/create', upload.single('photo'), itemController.createItem);
router.put('/item/update/:id', upload.single('photo'), itemController.updateItem);
router.delete('/item/delete/:id', itemController.deleteItem);

//Rotas pokemons
router.get('/pokemon/:id', pokemonController.index);
router.get('/pokemons', pokemonController.findAll);
router.post('/pokemon/create', upload.single('photo'), pokemonController.createPokemon);
router.put('/pokemon/update/:id', upload.single('photo'), pokemonController.updatePokemon);
router.delete('/pokemon/delete/:id', pokemonController.deletePokemon);

//rotas de relacionamento
router.put('/private/pokemon/:pokemonId', trainerController.chooseFavoritePokemon);
router.put('/private/pokemons/:pokemonId', trainerController.catchPokemon);
router.put('/private/rival/:rivalId', trainerController.chooseRival);
router.put('private/item/:itemId', trainerController.buyItem);
router.delete('/private/item/:itemId', trainerController.useItem);
router.delete('/private/pokemon/:pokemonId', trainerController.transferToProfessor);


export default router;
