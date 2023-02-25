import { ISuggestion } from "./LabelSuggestions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function getSuggestionsFromStrings( strings: string[], suggestions: ISuggestion[], max: number = 1000 ): ISuggestion[] {
  const results: ISuggestion[] = getSuggestionsByKeys( { key: strings.join(';') }, ['key'], suggestions );
  return results;
}

export function getSuggestionsByKeys(item: any, keys: string[], suggestions: ISuggestion[], max: number = 1000 ): ISuggestion[] {

  if (!keys || keys.length === 0)
    return [];
  else if (!suggestions || suggestions.length === 0)
    return [];
  else if (max === 0)
    return [];

  const results: ISuggestion[] = [];

  keys.map(key => {
    //Exclude empty keys, if results is more than max, if the item[key] is not a string or is empty
    if ( key && results.length < max && item[key] && typeof item[key] === 'string') {

      // get array of strings only (aka words) from the item proprty
      const keyVals: string[] = item[key].replace(/[0-9]/g, " ").split(/\b([a-z]+)\b/gi);

      keyVals.map(keyval => {
        let found: boolean = false;
        suggestions.map((suggestion: ISuggestion) => {
          if (results.length < max && found === false)
            suggestion.findsLC.map((find: string) => {
              if (keyval.toLowerCase() === find) {
                results.push(suggestion);
                found = true;
              }
            });
        });
      });
    }
  });

  return results;

}
