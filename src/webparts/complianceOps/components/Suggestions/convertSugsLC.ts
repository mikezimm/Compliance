
import { ISuggestion } from "./LabelSuggestions";

/**
 * 
 * @param suggestions 
 * @param lowerCaseSuggestions - true will also convert the suggestions to suggestionsLC ( so buttons would show in lc )
 * @returns 
 */
export function convertSugsLC(suggestions: ISuggestion[], lowerCaseSuggestions: boolean): ISuggestion[] {
  suggestions.map(suggestion => {
    suggestion.findsLC = suggestion.finds.map(str => { return str.toLowerCase(); });
    if (suggestion.exclusions)
      suggestion.exclusionsLC = suggestion.exclusions.map(str => { return str.toLowerCase(); });
    if (lowerCaseSuggestions === true)
      suggestion.suggestionsLC = suggestion.suggestions.map(str => { return str.toLowerCase(); });
  });
  return suggestions;
}
