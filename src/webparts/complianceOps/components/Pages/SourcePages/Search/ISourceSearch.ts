// /**
//  * Originally copied from ALVFM, just removed specific source item keys.
//  * Those can be added when extending the main search.
//  */

// import { IAnySourceItem } from "../../../../fpsReferences";

// /**
//  * Used to create Search Buttons ( aka ALV Fin Man source search page )
//  */
// export interface ISearchObject {
//   Search: string;
//   SearchLC: string;
//   SearchCount: number;
// }


// export interface ISearchBucket {
//   SearchFixed: boolean;
//   SearchStr: string;
//   Search: string[];
//   SearchLC: string[];
//   SearchCount: number[];

//   Objects: ISearchObject[];

//   items: IAnySourceItem[];
//   // appLinks: IAnySourceItemFM[];
//   // entities: IAnySourceItemFM[];
//   // general: IPagesContent[];
//   // manual: IAnySourceItemFM[];
//   // // docs: IAnySourceItemFM[];
//   // // stds: IAnySourceItemFM[]; //This is currently not used.... Originally considered it as Standards since the library was 'Standard Docs'.  Maybe could be list of relavant standards in the future?
//   // sups: IAnySourceItemFM[];
//   // accounts: IAnySourceItemFM[];
//   // news: IPagesContent[];
//   // help: IPagesContent[];
//   // acronyms: IAnySourceItemFM[];
//   // forms: IFormContent[];

// }

// export interface ISourceSearch {
//   left: ISearchBucket;
//   top: ISearchBucket;
//   type: ISearchBucket;

//   searchPlural: boolean; //Future use, basically search for the keywords specified in props but also look for ones with an s after it.
//   searchType: boolean; //Choose to also filter on type of content:
//   showDetails: boolean;

//   // general: string[];
//   // manual: string[];
//   // news: string[];
//   // help: string[];
//   // appLinks: string[];
//   // entities: string[];
//   // acronyms: string[];
//   // history: string[];
//   // sups: string[];
//   // accounts: string[];

//   // forms: string[];

//   itemsPerPage: number;
//   showItemType: boolean; //When True will show type label next to text
// }
