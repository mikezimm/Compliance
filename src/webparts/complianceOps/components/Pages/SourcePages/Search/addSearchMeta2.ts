// import { IAnySourceItem } from "../../../../fpsReferences";
// import { ISearchTypes } from "@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/ISearchTypes";

// /**
//  *
//  * @param items
//  * @param SearchTypes - Pass in
//  * @returns
//  */

// export function addSearchMeta2(items: IAnySourceItem[], SearchTypes: ISearchTypes): IAnySourceItem[] {

//   items.map((item: IAnySourceItem) => {

//     let { searchTitle, searchDesc, searchHref } = item;
//     /**
//      * This could be added as secondary function after adding custom search code to catch any loose ends.
//      */
//     //This if was added for the Standards Wiki Library where the title column is actually Title0
//     if (!searchTitle && item.Title0) { searchTitle = item.Title0; }
//     if (!searchTitle && item.FileLeafRef) { searchTitle = item.FileLeafRef.substr(0, item.FileLeafRef.lastIndexOf('.')); } //Added for Std #139 which does not have a Title value.
//     if (!searchDesc) { searchDesc = ''; }

//     if (!searchHref) {
//       if (item.ServerRedirectedEmbedUri) { searchHref = item.ServerRedirectedEmbedUri; }
//       else if (item.FileRef) { searchHref = item.FileRef; }
//       else if (item['File/ServerRelativeUrl']) { searchHref = item['File/ServerRelativeUrl']; }

//     }

//     let searchTypeIdx = SearchTypes.keys.indexOf(item.type);
//     if (searchTypeIdx === -1) {
//       console.log('Invalid searchTypeIdx not found:', item.type, SearchTypes.keys);
//     }

//     const adjustIdx = SearchTypes.objs[searchTypeIdx].adjust ? SearchTypes.objs[searchTypeIdx].adjust : 0;
//     searchTypeIdx = searchTypeIdx + adjustIdx;

//     // if ( item.type === 'entity' ) {
//     //   // console.log('found Entity:', item.type, item.typeIdx, item );
//     // }
//     item.typeIdx = searchTypeIdx > -1 ? searchTypeIdx : SearchTypes.keys.length - 1;

//     item.searchTitle = `${searchTitle}`;
//     item.searchDesc = `${searchDesc}`;
//     item.searchHref = `${searchHref}`;

//   });

//   return items;

// }
