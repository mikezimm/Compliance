// import { ISeriesSort } from "../../logic/Arrays/sorting/Interfaces";
// import { sortStringArrayCollator } from "../../logic/Arrays/sorting/strings";
import { ISeriesSort } from "@mikezimm/fps-library-v2/lib/logic/Arrays/sorting/Interfaces";
import { sortStringArrayCollator } from "@mikezimm/fps-library-v2/lib/logic/Arrays/sorting/strings";

/**
 * 
 * Originally used in Compliance to get list of words from a string
 * 
 * @param str 
 * @param removeDigits 
 * @returns array of words found
 */

export function mergeArrayOfWordsFromString( str: string, intoThese: string[], removeDigits: boolean, removeDups: boolean, ignoreCase: boolean, order: ISeriesSort, localLanguage: string = 'en' ): string[] {

  if ( !str ) return [];
  const theseWords: string[] = getArrayOfWordsFromString( str, removeDigits, removeDups, ignoreCase, order, localLanguage );
  const results: string[] = mergeWordArrays( theseWords, intoThese, ignoreCase, order, localLanguage );
  return results;

}


export function getArrayOfWordsFromString( str: string, removeDigits: boolean, removeDups: boolean, ignoreCase: boolean, order: ISeriesSort, localLanguage: string = 'en' ): string[] {
  const results: string[] = [];
  if ( !str ) return results;
  let baseStr = `${str}`;
  if ( removeDigits === true ) baseStr = baseStr.replace(/[0-9]/g, ' ');
  baseStr = baseStr.replace( /[-_,&[\]]+/g, ' ' ); // Replace most common special characters
  baseStr = baseStr.replace( /[()]+/g, ' ' ); // Replace most common special characters
  baseStr = baseStr.replace( /[/\\]+/g, ' ' ); // Replace most common special characters
  baseStr = baseStr.replace( /[']+/g, ' ' ); // Replace most common special characters

  baseStr = baseStr.replace(/\s\s+/g, ' '); // Replace multiple spaces with just one

  // get array of original trimmed words and exclude empties
  const originalWords: string[] = baseStr.split(/\b([a-z]+)\b/gi).map( word => { return word.trim() } ).filter( word => { return word } );

  // Correct case of compare array of strings from str
  let originalCompareWords: string[] = ignoreCase === true ? originalWords.map( item => { return item.toLocaleLowerCase() } ) : originalWords;
  originalCompareWords = removeDups === true ? originalCompareWords.filter( item => { return item.toLocaleLowerCase() } ) : originalCompareWords;

  let finalVals: string[] = [];

  // finalCompare is used as a comparison for when case is important
  // const finalCompare: string[] = ignoreCase === true ? finalVals.map( item => { return item.toLowerCase() } ) : finalVals;

  if ( removeDups !== true ) { 
    // NOTE:  If you do not remove dups, it currently does not check for ignoreCase
    finalVals = [ ...finalVals, ...originalWords ] ;

  } else {

    const filteredCompareWords: string[] = [];  // These are the same words but in lower case for comparison for duplicates

    // only save unique words found in this str
    originalWords.map( ( item: string, index: number ) => { 
        const itemTest = originalCompareWords[ index ];
        // First see if it's a duplicate in the original string str
        if ( filteredCompareWords.indexOf( itemTest ) === -1 ) {
          finalVals.push( item ) ;
          filteredCompareWords.push( itemTest );
        }
    });

  }

  if ( order !== 'asis' ) finalVals = sortStringArrayCollator( finalVals, order, false, localLanguage );

  return finalVals;
}

export function mergeWordArrays( mergeThese: string[], intoThese:string[], ignoreCase: boolean, order: ISeriesSort, localLanguage: string = 'en') : string[] {
  let finalWords: string[] = intoThese;
  const finalCompareWords: string[] = ignoreCase === true ? finalWords.map( item => { return item.toLocaleLowerCase() } ) : finalWords;
  const mergeTheseCompare: string[] = ignoreCase === true ? mergeThese.map( item => { return item.toLocaleLowerCase() } ) : mergeThese;

    // Now compare the filteredNewWords with the finalWords and only add ones that are not a duplicate.
    mergeTheseCompare.map( ( compareWord: string, index: number ) => {
      if ( finalCompareWords.indexOf( compareWord ) === -1 ) {
        finalWords.push( mergeThese[ index ] );
        finalCompareWords.push( compareWord )
      }
    });

    if ( order !== 'asis' ) finalWords = sortStringArrayCollator( finalWords, order, false, localLanguage );

  return finalWords;

}