import BeerModel from '../../models/Beer-Model.ts';
import ICrudService from '../ICrudService.ts';

interface IBeerService extends ICrudService<BeerModel>{}

export default IBeerService;