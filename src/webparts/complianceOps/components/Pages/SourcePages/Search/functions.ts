
// import { IAnySourceItemFM } from "../INTERFACES/IAnySource";

import { IAnySourceItem } from "../../../../fpsReferences";
import { SearchTypesCOP } from "../../../DataInterface";

// import { IFMSearchType, SearchTypesFM } from '../DataInterface';  // eslint-disable-line @typescript-eslint/no-unused-vars

  export function getFilteredItems( startingItems: IAnySourceItem[], text: string, top: string[], left: string[], type: string[], searchStrings: string[], ): IAnySourceItem[] {

    const filteredItems : IAnySourceItem[] = [];

    startingItems.map( item => {

      let passMe = true;

      if ( left.length > 0 ) { 
        let passThis: boolean = false;
        item.leftSearch.map( test => {
          if ( left.indexOf( test ) > -1 ) { passThis = true ; }
        });
        if ( passThis === false ) { passMe = false; }
      }

      if ( top.length > 0 && passMe === true ) {
        let passThis: boolean = false;
        item.topSearch.map( test => {
          if ( top.indexOf( test ) > -1 ) { passThis = true ; }
        });
        if ( passThis === false ) { passMe = false; }
      }

      if ( type.length > 0 && passMe === true ) { 
        // Close https://github.com/mikezimm/ALVFinMan/issues/122
        const typeObj = SearchTypesCOP.objs[item.typeIdx];
        if ( type.indexOf( typeObj.key ) < 0 ) { passMe = false; }

      }

      //Separate logic from SearchPage.tsx search... this looks at the searchTextLC for simpler execution
      if ( passMe === true ) { 


        // let passThis: any = false;
        // searchStrings.map( searchObjectFull => {
        //   const searchSplits = searchObjectFull.split('==');
        //   const searchTest = searchSplits[0];
        //   const searchTestLC = searchTest.toLowerCase();
        //   if ( searchSplits.length === 1 ) {
        //     if ( item.searchTextLC.indexOf( searchTestLC ) > -1 ) { passThis = true ; }

        //   } else {
        //     if ( searchSplits[1].toLowerCase() === 'proper' || searchSplits[1].toLowerCase() === 'exact' ) {
        //       if ( item.searchText.indexOf( searchTest ) > -1 ) { passThis = true ; }

        //     } else if ( searchSplits[1].indexOf('/') === 0 ) {
        //       const regexParams = searchSplits[1].split('/');
        //       if ( regexParams.length < 3 ) { console.log('INVALID SEARCH REGEX:  ', searchObjectFull ) ; }
        //       else {
        //         // const regexParams = searchSplits[1].substring(nextSlash + 1);
        //         const regex = new RegExp( regexParams[1], regexParams[2] );
        //         const matches = item.searchText.match( regex );
        //         if ( matches?.length > 0 ) { passThis = true ; }
        //       }

        //     } else if ( searchSplits[1].indexOf('item.') === 0 ) {
        //       //This will Target the property of the item, not case sensitive
        //       const itemColumn = searchSplits[1].substring( 5 );
        //       const columnValue = item[itemColumn] ? item[itemColumn] : '';
        //       if ( columnValue && typeof columnValue === 'string' && columnValue.toLowerCase().indexOf( searchTestLC ) > -1 ) { passThis = true ; }

        //     } else {
        //       //default to string search if no paramter was provided
        //       if ( item.searchTextLC.indexOf( searchTestLC ) > -1 ) { passThis = true ; }
        //     }
        //   }
        // });

        const passThis = doesPassButtonSearch( item, searchStrings );
        if ( passThis === false ) { passMe = false; }


      }

      if ( passMe === true && text && text.length > 0 ) { 
        if ( item.searchTextLC.indexOf( text.toLowerCase() ) < 0 ) { passMe = false; }

      }

      if ( passMe === true ) { filteredItems.push ( item ) ; }
    });

    console.log(' filteredItems: ', filteredItems );
    return filteredItems;
  }


  export function doesPassButtonSearch( item: IAnySourceItem, searchStrings: string[], ): boolean {

    if ( !searchStrings || searchStrings.length === 0 ) {
      return true;

    }

    let passThis: boolean = false;

    searchStrings.map( searchObjectFull => {

      const searchSplits: string[] = searchObjectFull.split('==');
      const searchTest: string = searchSplits[0];
      const searchTestLC: string = searchTest.toLowerCase();

      if ( searchSplits.length === 1 ) { //First test if it is simple search
        if ( item.searchTextLC.indexOf( searchTestLC ) > -1 ) { passThis = true ; }

      } else { //If not simple, proceed to more complex search

        if ( searchSplits[1].toLowerCase() === 'proper' || searchSplits[1].toLowerCase() === 'exact' ) {
          if ( item.searchText.indexOf( searchTest ) > -1 ) { passThis = true ; }

        } else if ( searchSplits[1].indexOf('/') === 0 ) {
          const regexParams = searchSplits[1].split('/');

          if ( regexParams.length < 3 ) { console.log('INVALID SEARCH REGEX:  ', searchObjectFull ) ; }
          else {
            // const regexParams = searchSplits[1].substring(nextSlash + 1);
            const regex = new RegExp( regexParams[1], regexParams[2] ); // eslint-disable-line @rushstack/security/no-unsafe-regexp
            const matches = item.searchText.match( regex );
            if ( matches?.length > 0 ) { passThis = true ; }
          }

        } else if ( searchSplits[1].indexOf('item.') === 0 ) {
          //This will Target the property of the item, not case sensitive
          const itemColumn = searchSplits[1].substring( 5 );
          const columnValue = item[itemColumn] ? item[itemColumn] : '';
          if ( columnValue && typeof columnValue === 'string' && columnValue.toLowerCase().indexOf( searchTestLC ) > -1 ) { passThis = true ; }

        } else {
          //default to string search if no paramter was provided
          if ( item.searchTextLC.indexOf( searchTestLC ) > -1 ) { passThis = true ; }
        }

      } // End if basic Search or Complex Search

    }); // End map Search Strings

    return passThis;

  }