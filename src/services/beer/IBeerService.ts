import BeerModel from '../../models/BeerModel.ts';
import ICrudService from '../ICrudService.ts';

interface IBeerService extends ICrudService<BeerModel>{}

export default IBeerService;