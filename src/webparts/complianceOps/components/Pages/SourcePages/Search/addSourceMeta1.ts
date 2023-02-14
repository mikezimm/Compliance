// import { ISourceProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems";
// import { IAnySourceItem } from "../../../../fpsReferences";
// import { ISourceSearch } from "./ISourceSearch";

// export function addDateTimeFileInfoSearch ( item: IAnySourceItem ): IAnySourceItem {

//   //https://stackoverflow.com/a/15191245
//   if ( item.Created ) {
//     item.createdMS = Date.parse(item.Created);
//     item.createdLoc = item.Created.toLocaleString();
//   }

//   if ( item.Modified ) {
//     item.modifiedMS = Date.parse(item.Modified);
//     item.modifiedLoc = item.Modified.toLocaleString();
//   }

//   if ( item.FirstPublishedDate ) { 
//     item.publishedMS = Date.parse(item.FirstPublishedDate); 
//     item.publishedLoc = item.publishedMS.toLocaleString();
//   }

//   //Added this to flatten file url for easier use
//   if ( item.File && item.File.ServerRelativeUrl ) { item['File/ServerRelativeUrl'] = item.File.ServerRelativeUrl ; }

//   item.searchText = '';
//   item.searchTextLC = '';

//   // Create empty search arrays
//   item.leftSearch = [];
//   item.leftSearchLC = [];

//   item.topSearch = [];
//   item.topSearchLC = [];

//   item.sourceSearch = [];
//   item.sourceSearchLC = [];

//   return item;

// }

// export function addSearchMeta1 ( items: IAnySourceItem[], sourceProps: ISourceProps, search: ISourceSearch ): IAnySourceItem[] {

//   //searchNest will be an array of prop key arrays... so [ 'Author/Title' ] => [ ["Author","Title"] ]
//   const searchNest: string[][] = [];  
//   sourceProps.searchProps.map( prop => {
//     if ( prop.indexOf('.') > -1 || prop.indexOf('/') > -1) {
//       searchNest.push( prop.trim().replace(' ','' ).split(/[./]/gm) ) ;
//     } else {
//       searchNest.push( [prop.trim().replace(' ','' )] ) ;
//     }
//   });

//   // debugger;

//   items.map ( ( item: IAnySourceItem ) => {
//     let searchTitle = '';
//     let searchDesc = '';
//     const searchHref = '';

//     item = addDateTimeFileInfoSearch( item );

//     if ( item.ReportingSections ) { item.Reporting = item.ReportingSections ; }

//     const meta: string[] = [];

//     //This is for display purposes so user can see what property the search criteria is found in
//     const searchText : string = searchNest.map( ( propArray: string[], idx: number)  => {

//       if ( propArray.length === 1 ) {
//         item[ sourceProps.searchProps[ idx ] ] = item[ propArray[0] ]; //Add flattened value - item["Author/Title"]= item.Author.Title
//         if ( Array.isArray( item[ propArray[0] ] )) {
//           return `${sourceProps.searchProps[ idx ]}=${item[ propArray[0] ].join(';')}`;

//         } else {
//           return `${sourceProps.searchProps[ idx ]}=${item[ propArray[0] ]}`;
//         }

//       } else if ( propArray.length === 2 ) {

//         //Add flatened value for people/expanded columns

//         let hasError: boolean = false;

//         try {
//           if ( Array.isArray( item[ propArray[0] ] )) {
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             item[ sourceProps.searchProps[ idx ] ] = item[ propArray[0] ].map( ( itemX: any ) => { return itemX[ propArray[1] ] ; }); //Add flattened value - item["Author/Title"]= [ item.Author[0].Title, item.Author[1].Title]

//           } else {
//             if ( item[ propArray[0] ] ) {
//               item[ sourceProps.searchProps[ idx ] ] = item[ propArray[0] ][ propArray[1] ]; //Add flattened value - item["Author/Title"]= item.Author.Title
//             } else {
//               // Need to add this in if the value was not found.  Like the column had no value and was undefined or null... aka Acronyms Standards lookup
//               item[ sourceProps.searchProps[ idx ] ] = 'UNK';
//               hasError = true;
//             }
//           }

//         /**
//          * This section was specific to ALVFM columns
//          */
//           //Manually copy ReportingSections/Title over to Reporting/Title
//           // if ( sourceProps.searchProps[ idx ] === 'ReportingSections/Title' ) { item[ 'Reporting/Title'] = item[ sourceProps.searchProps[ idx ] ]; }

//         } catch (e) {
//           // alert('Error doing search props');
//           const lastPart = item[propArray[0] ] ? item[propArray[0] ][ propArray[1] ] : 'UNK';
//           item[ sourceProps.searchProps[ idx ] ] = lastPart;
//           console.log( 'Search Error: ~ `77', item, sourceProps.searchProps, idx, item[propArray[0] ] , lastPart  );
//           hasError = true;
//         }

//         if ( hasError === true ) {
//           return `${sourceProps.searchProps[ idx ]}=UNK`;
//         } else {

//           //This first loop never gets triggered with multi-select lookups because the array is really item [ propArray[0] ]
//           if ( Array.isArray( item[ propArray[0] ][ propArray[1] ]  )) {
//             let result = `${sourceProps.searchProps[ idx ]}=${item[ propArray[0] ][ propArray[1] ] .join(';')}`;
//             if ( sourceProps.searchProps[ idx ] === 'ReportingSections/Title' ) { 
//               result += ` || Reporting/Title=${item[ propArray[0] ][ propArray[1] ] .join(';')}`; }
//             return result;

//           } else if ( Array.isArray( item[ propArray[0] ] )  ) { //As in Controller2/Title

//             /**
//              * NEED TO ADD LOOP HERE TO CHECK FOR MULTI-SELECT Lookups like ReportingSections/Titles.
//              * They don't get caught in the above one because the logic does not work that way
//              */

//             if ( item[ sourceProps.searchProps[ idx ] ] ) {
//               const result = `${sourceProps.searchProps[ idx ]}=${item[ sourceProps.searchProps[ idx ] ] .join(';')}`;
//               return result;
//             }

//           } else {

//             let result = `${sourceProps.searchProps[ idx ]}=${item[ propArray[0] ][ propArray[1] ] }`;
//             if ( sourceProps.searchProps[ idx ] === 'ReportingSections/Title' ) { 
//               result += ` || Reporting/Title=${item[ propArray[0] ][ propArray[1] ] }`; }

//             return result;
//           }
//         }

//       }

//     }).join(' || ');

//     //Get rid of any empty strings
//     searchText.split(' || ' ).map( text => {
//       if ( text ) { meta.push( text ); }
//     });

//     //searchTextLC is used for actual search function - removes Column Titles from searchable text
//     const searchTextLC : string = sourceProps.searchProps.map( prop => {
//       if ( Array.isArray( item[ prop ] )) {
//         return `${item[ prop ].join(';')}`;

//       } else {
//         return `${item[ prop ]}`;
//       }
//     }).join(' || ');

//     item.searchText = searchText;
//     item.searchTextLC = searchTextLC.toLocaleLowerCase();

//     //update item's left search string arrays
//     if ( search && search.left && search.left.Search ) {
//       search.left.Search.map( ( keyWord: string, idx: number ) => {
//         const keyWordLC = search.left.SearchLC[ idx ];
//         if ( item.searchTextLC.indexOf( keyWordLC ) > - 1 ) {
//           item.leftSearch.push( keyWord );
//           item.leftSearchLC.push( keyWordLC );
//         }
//       });
//     }

//     //update item's top search string arrays
//     if ( search && search.top && search.top.Search ) {
//       search.top.Search.map( ( keyWord: string, idx: number ) => {
//         const keyWordLC = search.top.SearchLC[ idx ];
//         if ( item.searchTextLC.indexOf( keyWordLC ) > - 1 ) {
//           item.topSearch.push( keyWord );
//           item.topSearchLC.push( keyWordLC );
//         }
//       });
//     }

//     //update item's top search string arrays
//     if ( search && search.type && search.type.Search ) {
//       search.type.Search.map( ( keyWord: string, idx: number ) => {
//         const keyWordLC = search.type.SearchLC[ idx ];
//         if ( item.searchTextLC.indexOf( keyWordLC ) > - 1 ) {
//           item.typeSearch.push( keyWord );
//           item.typeSearchLC.push( keyWordLC );
//         }
//       });
//     }

//     item.meta = [...meta, ...item.leftSearch, ...item.topSearch ];

//     item.fileDisplayName = ''; //Basically the file name but without extension

//     const extIdx = item.FileRef ? item.FileRef.lastIndexOf('.') : -1;
//     if ( item['File_x0020_Type'] ) {  // eslint-disable-line dot-notation
//       item.type = item['File_x0020_Type'] ;  // eslint-disable-line dot-notation
//       searchTitle = item['FileLeafRef'] ? item['FileLeafRef'] : 'No Filename to show';  // eslint-disable-line dot-notation
//       item.fileDisplayName = item['FileLeafRef'].replace(`.${item.type}`,'');  // eslint-disable-line dot-notation
//       searchDesc = '';

//     } else if ( extIdx > -1 ) {
//       item.type = item.FileRef.substring( extIdx + 1 );
//       if ( item.type === 'aspx' ) { 
//         item.type = 'page';
//         searchTitle = item.Title;
//         item.fileDisplayName = item['FileLeafRef'].replace(`.aspx`,'');  // eslint-disable-line dot-notation
//         searchDesc = item.Description;
//       }

//     } else {
//       item.type = sourceProps.defType;
//       searchTitle = item.Title;
//       searchDesc = 'Other Type Search Desc';

//     }

//     item.searchTitle = `${searchTitle}`;
//     item.searchDesc = `${searchDesc}`;
//     item.searchHref = `${searchHref}`;






//     /**
//      * This section was specific to ALVFM columns
//      */

//     // if ( sourceProps.key === 'manual' ||  sourceProps.key === 'help' || sourceProps.key === 'news' ) {
//     //   item.searchTitle = item.Title;
//     // }

//     item.format = sourceProps.key;

//     // if ( item.Tab && item.LinkColumn ) {
//     //   console.log('DataFetch.ts ~ 493');
//     // }

//     /**
//      * This section was specific to ALVFM columns
//      */

//     // if ( !searchDesc && item.SearchWords ) { searchDesc = item.SearchWords; }
//     // if ( !searchHref && item.LinkColumn ) { 
//     //   searchHref = item.LinkColumn.Url;
//     //   if ( !searchDesc && item.SearchWords ) { searchDesc = item.LinkColumn.Description; }
//     // }

//     // //Just add this prop to everything for ease of use.
//     // if ( item.ReportingForms ) {
//     //   if ( Array.isArray( item.ReportingForms) === true ) {
//     //     item.ReportingFormsStr = item.ReportingForms.map( ( form: any ) => { return form.Title ; } ).join('; ');
//     //   } else { item.ReportingFormsStr = item.ReportingForms; }
//     // } else {
//     //   item.ReportingForms = [];
//     //   item.ReportingFormsStr = '';
//     // }

//     // if ( item.type === 'account' ) {
//     //   searchTitle = '';
//     //   searchDesc = [ item.type, item.ReportingForms.Title, item.SubCategory, item.Name1, item.Description ] .join ('<>');
//     //   if ( item.Description && ( item.Description.indexOf('&quot;') > -1 || item.Description.indexOf('</') > -1 ) ) { item.descIsHTML = true ; }
//     //   searchHref = '';
//     // }


//     /**
//      * This could be added as secondary function after adding custom search code to catch any loose ends.
//      */
//     //This if was added for the Standards Wiki Library where the title column is actually Title0
//     // if ( !searchTitle && item.Title0 ) { searchTitle = item.Title0 ; } 
//     // if ( !searchTitle && item.FileLeafRef ) { searchTitle = item.FileLeafRef.substr(0, item.FileLeafRef.lastIndexOf('.') ) ; } //Added for Std #139 which does not have a Title value.
//     // if ( !searchDesc ) { searchDesc = '' ; }

//     // if ( !searchHref ) { 
//     //   if ( item.ServerRedirectedEmbedUri ) { searchHref = item.ServerRedirectedEmbedUri ;  }
//     //   else if ( item.FileRef ) { searchHref = item.FileRef ;  }
//     //   else if ( item[ 'File/ServerRelativeUrl' ] ) { searchHref = item[ 'File/ServerRelativeUrl' ] ;  }

//     // }

//     // let searchTypeIdx = SearchTypes.keys.indexOf( item.type ) ;
//     // if ( searchTypeIdx === -1 ) {
//     //   console.log('Invalid searchTypeIdx not found:', item.type, SearchTypes.keys );
//     // }


//     // const adjustIdx = SearchTypes.objs[ searchTypeIdx ].adjust ? SearchTypes.objs[ searchTypeIdx ].adjust : 0;
//     // searchTypeIdx = searchTypeIdx + adjustIdx;

//     // if ( item.type === 'entity' ) {
//     //   // console.log('found Entity:', item.type, item.typeIdx, item );
//     // }
//     // item.typeIdx = searchTypeIdx > -1 ? searchTypeIdx : SearchTypes.keys.length -1 ;

//     // item.searchTitle = `${searchTitle}`;
//     // item.searchDesc = `${searchDesc}`;
//     // item.searchHref = `${searchHref}`;

//   });

//   return items;

// }

// export function addStandardSearchArrays( item: IAnySourceItem, sourceProps: ISourceProps, search: ISourceSearch ): IAnySourceItem {

//   //update item's top search string arrays
//   if ( search && search.top && search.top.Search ) item = buildThisSearchArray( item, search.top.Search, search.top.SearchLC );
//   if ( search && search.left && search.left.Search ) item = buildThisSearchArray( item, search.left.Search, search.left.SearchLC );
//   if ( search && search.type && search.type.Search ) item = buildThisSearchArray( item, search.type.Search, search.type.SearchLC );

//   if ( sourceProps.meta0 && sourceProps.meta0.length > 0 ) item = buildThisSearchArray( item, sourceProps.meta0, [] );
//   if ( sourceProps.meta1 && sourceProps.meta1.length > 0 ) item = buildThisSearchArray( item, sourceProps.meta1, [] );
//   if ( sourceProps.meta2 && sourceProps.meta2.length > 0 ) item = buildThisSearchArray( item, sourceProps.meta2, [] );
//   if ( sourceProps.meta3 && sourceProps.meta3.length > 0 ) item = buildThisSearchArray( item, sourceProps.meta3, [] );
//   if ( sourceProps.metaX && sourceProps.metaX.length > 0 ) item = buildThisSearchArray( item, sourceProps.metaX, [] );

//   return item;

// }

// export function buildThisSearchArray( item: IAnySourceItem, keyWords: string[], keyWordsLC: string[] ): IAnySourceItem {

//   keyWords.map( ( keyWord: string, idx: number ) => {
//     const keyWordLC = keyWordsLC && keyWordsLC.length >= idx ? keyWordsLC[ idx ] : keyWord.toLocaleLowerCase();
//     if ( item.searchTextLC.indexOf( keyWordLC ) > - 1 ) {
//       item.typeSearch.push( keyWord );
//       item.typeSearchLC.push( keyWordLC );
//     }
//   });

//   return item;

// }
