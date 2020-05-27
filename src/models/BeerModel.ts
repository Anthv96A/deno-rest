import BaseModel from './BaseModel.ts';

class BeerModel extends BaseModel { 
    name: string = '';
    origin: string = '';
}

export default BeerModel;