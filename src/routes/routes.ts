import { Router } from 'express';
import trainerController from '../controllers/trainerController';
import itemController from '../controllers/itemController';
import pokemonController from '../controllers/pokemonController';
//import example from '../middlewares/example';
const router = Router();
//exemplo de middleware
//router.use('/trainer', example);

//Rotas treinador
router.get('/trainer/:id', trainerController.index);
router.get('/trainers', trainerController.findAll);
router.post('/trainer/create', trainerController.createTrainer);
router.put('/trainer/update/:id', trainerController.updateTrainer);
router.delete('/trainer/delete/:id', trainerController.deleteTrainer);

//Rotas itens
router.get('/item/:id', itemController.index);
router.get('/items', itemController.findAll);
router.post('/item/create', itemController.createItem);
router.put('/item/update/:id', itemController.updateItem);
router.delete('/item/delete/:id', itemController.deleteItem);

//Rotas pokemons
router.get('/pokemon/:id', pokemonController.index);
router.get('/pokemons', pokemonController.findAll);
router.post('/pokemon/create', pokemonController.createPokemon);
router.put('/pokemon/update/:id', pokemonController.updatePokemon);
router.delete('/pokemon/delete/:id', pokemonController.deletePokemon);

//rotas de relacionamento
router.put('/trainer/pokemon/:trainerId/:pokemonId', trainerController.chooseFavoritePokemon);
router.put('/trainer/pokemons/:trainerId/:pokemonId', trainerController.catchPokemon);
router.put('/trainer/rival/:trainerId/:rivalId', trainerController.chooseRival);
router.put('trainer/item/:trainerId/:itemId', trainerController.buyItem);
router.delete('/trainer/item/:trainerId/:itemId', trainerController.useItem);
router.delete('/trainer/poekmon/:trainerId/:pokemonId', trainerController.transferToProfessor);


export default router;
