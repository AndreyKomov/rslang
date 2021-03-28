const urlAPI ='https://arcane-chamber-21175.herokuapp.com/';

 interface WordApiServiceValidator {
  getWordById(id:number):Promise<any>;
}

export class WordsApiService implements  WordApiServiceValidator{

async getWordById(id:number) {
  try {
    const response = await fetch(`${urlAPI}words/${id}`);
    if (response.status !== 200) {
      throw new Error('Failed to get word');
    }
    const word = await response.json();
    return word;
  } catch (error) {
    throw new Error(error);
  }
}

}

