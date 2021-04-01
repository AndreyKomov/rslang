import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class ElectronicTextbookService {
  getWordDetalization = async (pages: number, group: number): Promise<any> => {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/words?page=${pages}&group=${group}`,
    );

    const content = await rawResponse.json();

    console.log(content);
    return content;
  };
}
