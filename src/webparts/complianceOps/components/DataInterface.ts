
// //Interfaces
// import { ISourcePropsFM, ISourceInfo, IFMSearchType, IFMSearchTypes } from './DataInterface';

import { ISourceProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface";
import { ISeriesSort } from "../fpsReferences";
// import { IAppFormat } from "./INTERFACES/ILayoutsPage";

export type IAppFormat = 'committee' | 'coordinators' | 'maps' | 'forms' | 'tips' | 'history';


//Modern Financial Manual
export const IntraNetRecs = ['/sites','/lif','enet','_reco','rds_','hom/']; //Just so this is not searchable easily
export const IntraNetHome: string =`${IntraNetRecs.join('')}`;

// export const ModernSitePagesColumns: string[] = ['ID','Title','Description','Author/Title','Editor/Title','File/ServerRelativeUrl','BannerImageUrl/Url','FileSystemObjectType','FirstPublishedDate','PromotedState','FileSizeDisplay','OData__UIVersion','OData__UIVersionString','DocIcon'];
export const ModernSitePagesColumns: string[] = ['ID','Title','Description','Author/Title','Editor/Title','File/ServerRelativeUrl','BannerImageUrl', 
    'FileSystemObjectType','Modified','Created','FirstPublishedDate','PromotedState','FileSizeDisplay','OData__UIVersion','OData__UIVersionString','DocIcon',
    'OData__OriginalSourceUrl' ]; //Added this for news links

export const ModernSitePagesSearch: string[] = ['Title','Description','Author/Title','Editor/Title','FirstPublishedDate','PromotedState',];

//sitePagesColumns was used for the classic pages.
// export const sitePagesColumns: string[] = [ "ID", "Title0", "Author/Title", "Editor/Title", "File/ServerRelativeUrl", "FileRef","FileLeafRef", "Created", "Modified" ]; //Do not exist on old SitePages library:   "Descritpion","BannerImageUrl.Url", "ServerRelativeUrl"
export const libraryColumns: string[] = [ 'ID','FileRef','FileLeafRef','ServerRedirectedEmbedUrl','Author/Title','Editor/Title','Author/Name','Editor/Name','Modified','Created','CheckoutUserId','HasUniqueRoleAssignments','Title','FileSystemObjectType','FileSizeDisplay','File_x0020_Type','FileLeafRef','LinkFilename','OData__UIVersion','OData__UIVersionString','DocIcon'];

//ClassicSitePageColumns was used for the classic pages.
// export const ClassicSitePageColumns: string [] = [ ...sitePagesColumns, ...LookupColumns, ...[ 'DocumentType/Title' ] ];

export const ExtraFetchModernPage = ['WikiField','CanvasContent1','LayoutsWebpartsContent','BannerImageUrl' ]; // Added for fetching bannerImage

export type IDefSourceType = 'committee' | 'coordinators' | 'maps' | 'forms' | 'tips' | 'history';

export type ISearchSource = 'Committee' | 'Coordinators' | 'Maps' | 'Forms' | 'Tips' | 'History';

/**
 * Added  { prop: string; asc: boolean; } to fix the orderBy? Lint Error.
 * 
 * SUGGESTION:   Maybe refactor orderBy to use ISeriesSortObject
 */
export interface ISourcePropsFM extends ISourceProps {
    key: IAppFormat;
    defType: IDefSourceType;        //Used in Search Meta function

    searchSource: ISearchSource;
    searchSourceDesc: string;

    orderBy?: {
        prop: string;
        order: ISeriesSort;
        asc: boolean;
    };
    defSearchButtons: string[];  //These are default buttons always on that source page.  Use case for Manual:  Policy, Instruction etc...

}

export interface ISourceInfo {
  committee: ISourcePropsFM;
  coordinators: ISourcePropsFM;
  maps: ISourcePropsFM;
  forms: ISourcePropsFM;
  tips: ISourcePropsFM;
  history: ISourcePropsFM;
}

export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];
export const MapsColumns: string[] = [ 'ID','Region', 'Facility', ];

export const CommitteeColumns: string[] = [ 'ID','Title', 'Name/Title', 'MemberPosition' ];
export const CommitteeSearch: string[] = [ 'Corporate', 'Global', 'Divisional', 'Quality', 'Legal', 'IT', 'Data Privacy' ];

export const Divisions: string[] = [ 'AAM','AEU','AJA','ASA','Global','TCH', 'TKR','TND' ];


export const SourceInfo: ISourceInfo = {

  committee: {
      key: 'committee',
      defType: 'committee',
      webUrl: `${IntraNetHome}`,
      listTitle: "RIG Committee",
      webRelativeLink: "lists/RIG Committee",
      searchSource: 'Committee',
      searchSourceDesc:  'RIG Committee in LifeNET',
      columns: [ ...CommitteeColumns ],
      itemFetchCol: [],
      searchProps: [ ...CommitteeColumns ],
      selectThese: [ ...['*'], ...CommitteeColumns ],
      isModern: true,
      restFilter: "",
      defSearchButtons: CommitteeSearch,
      orderBy: { //Including even though it does not seem to do anything
        prop: 'Title',
        order: 'asc',
        asc: true,
      },
      fetchCount: 500,
    },

    coordinators: {
      key: 'coordinators',
      defType: 'coordinators',
      webUrl: `${IntraNetHome}`,
      listTitle: "Facility Records Coordinators",
      webRelativeLink: "lists/Facility%20Records%20Coordinators",
      searchSource: 'Coordinators',
      searchSourceDesc:  'Facility Records Coordinators in LifeNET',
      columns: CoordinatorColumns,
      itemFetchCol: [],
      searchProps: CoordinatorColumns,
      selectThese: [ ...['*'], ...CoordinatorColumns, ],
      isModern: true,
      restFilter: '',
      defSearchButtons: Divisions,
      orderBy: { //Including even though it does not seem to do anything
        prop: 'Title',
        order: 'asc',
        asc: true,
      },
      fetchCount: 5000,
    },

    maps: {
      key: 'maps',
      defType: 'maps',
      webUrl: `${IntraNetHome}`,
      listTitle: "Facility Record Maps",
      webRelativeLink: "Facility Record Maps",
      searchSource: 'Maps',
      searchSourceDesc:  'Facility Record Maps in LifeNET',
      columns: MapsColumns,
      searchProps: Divisions,
      selectThese: [ ...libraryColumns, ...MapsColumns ],

      itemFetchCol: [],
      isModern: true,
      restFilter: "",
      defSearchButtons: Divisions,
      orderBy: { //Including even though it does not seem to do anything
        prop: 'Name',
        order: 'asc',
        asc: true,
      },
      fetchCount: 5000,
  },

    forms: {
        key: 'forms',
        defType: 'forms',
        webUrl: `${IntraNetHome}`,
        listTitle: "Appendices toAS303 and Commonly Used Forms",
        webRelativeLink: "lists/Commonly Used Forms",
        viewItemLink: `${IntraNetHome}Manual/lists/Commonly Used Forms/DispForm.aspx?ID={{item.ID}}`,
        searchSource: 'Forms',
        searchSourceDesc:  'List in Manual Subsite',
        columns: [ ...libraryColumns, ...[ 'Status' ]  ],
        searchProps: [ 'Title', 'FileLeafRef', 'Status',  ],
        selectThese: [ ...libraryColumns, ...[ 'Status' ] ],
        itemFetchCol: [],
        isModern: true,
        restFilter: "",
        defSearchButtons: [ 'Active','Historical' ],
        fetchCount: 5000,
    },

    tips: {
        key: 'tips',
        defType: 'tips',
        webUrl: `${IntraNetHome}`,
        listTitle: "Site Pages",
        webRelativeLink: "SitePages",
        searchSource: 'Tips',
        searchSourceDesc:  'Site Pages library in Help Subsite',
        columns: ModernSitePagesColumns,
        searchProps: ModernSitePagesSearch,
        selectThese: [ ...ModernSitePagesColumns ],
        itemFetchCol: ExtraFetchModernPage,
        isModern: true,
        restFilter: "Id ne 'X' and ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159' and Title ne 'Home'",
        defSearchButtons: [],
        orderBy: { //Including even though it does not seem to do anything
          prop: 'Title',
          order: 'asc',
          asc: true,
        },
        fetchCount: 5000,
    },

    history: {
        key: 'history',
        defType: 'history',
        webUrl: `${IntraNetHome}/`,
        webRelativeLink: "",
        searchSource: 'History',
        searchSourceDesc:  'History of your current session',
        listTitle: "History",
        columns: [ ], //,'StandardDocuments/Title'
        searchProps: [ ], //'StandardDocuments/Title'
        selectThese: [ ],
        orderBy: { prop: 'Title', order: 'asc', asc: false },
        isModern: true,
        defSearchButtons: [],
        fetchCount: 5000,
    },
};


export const thisSelect = ['*','ID','FileRef','FileLeafRef','Author/Title','Editor/Title','Author/Name','Editor/Name','Modified','Created','CheckoutUserId','HasUniqueRoleAssignments','Title','FileSystemObjectType','FileSizeDisplay','FileLeafRef','LinkFilename','OData__UIVersion','OData__UIVersionString','DocIcon'];

export interface IFMSearchType {
    key: string;
    title: string;
    icon: string;
    style: string;
    count: number;
    adjust?: number; //Use to adjust the index to get a common one like all Excel files;
}

export interface IFMSearchTypes {
    keys: string[];
    objs: IFMSearchType[];
}

export const SearchTypes:IFMSearchTypes  = {
    keys: [ "general", "account", "doc", "docx", "acronym",
        "link",    "msg",
        "page",
        "pdf",    "ppt",    "pptx",
        "rtf",
        "manual",
        "xls", "xlsm",  "xlsx",
        "news", "help",
        "entity",
        "forms",
        "unknown" ],
    objs:
        [
        //NOTE:  key must be exact match to strings in keys array above.
        { key: "general", title: "general", icon: "Info", style: "", count: 0 }, 
        { key: "account", title: "account", icon: "Bank", style: "", count: 0 }, 
        { key: "doc", title: "doc", icon: "WordDocument", style: "", count: 0 }, 
        { key: "docx", title: "doc", icon: "WordDocument", style: "", count: 0, adjust: -1 }, 
        { key: "acronym", title: "acronym", icon: "FontColor", style: "", count: 0 }, 

        { key: "link", title: "Link", icon: "Link12", style: "", count: 0 }, 
        { key: "msg", title: "msg", icon: "Read", style: "", count: 0 }, 

        { key: "page", title: "page", icon: "KnowledgeArticle", style: "", count: 0 }, 

        { key: "pdf", title: "pdf", icon: "PDF", style: "", count: 0 }, 
        { key: "ppt", title: "ppt", icon: "PowerPointDocument", style: "", count: 0 }, 
        { key: "pptx", title: "ppt", icon: "PowerPointDocument", style: "", count: 0, adjust: -1 }, 

        { key: "rtf", title: "rtf", icon: "AlignLeft", style: "", count: 0 }, 
        { key: "manual", title: "manual", icon: "BookAnswers", style: "", count: 0 }, 

        { key: "xls", title: "xls", icon: "ExcelDocument", style: "", count: 0 }, 
        { key: "xlsm", title: "xls", icon: "ExcelDocument", style: "", count: 0, adjust: -1 }, 
        { key: "xlsx", title: "xls", icon: "ExcelDocument", style: "", count: 0, adjust: -2 }, 

        { key: "news", title: "news", icon: "News", style: "", count: 0 },
        { key: "help", title: "help", icon: "Help", style: "", count: 0 },

        { key: "entity", title: "entity", icon: "JoinOnlineMeeting", style: "", count: 0 }, 
        { key: "forms", title: "forms", icon: "BulletedList2", style: "", count: 0 }, 

        { key: "unknown", title: "unkown", icon: "Help", style: "", count: 0 }, 
    ]
};

// function deleteMe() {

//   //In this function, you pass in an object, and the props and it returns a semi-colon separated string of all the props combined
//   function getTheseExpandedValues( item: any, props: string[] ){
//     let expandedValues : string[]= [];
//     props.map( prop => {
//       // For this example, it's my function and I know it will always have expanded column/property
//       // I know for this function propKeys will always be an array of 2 strings
//       const propKeys = prop.split('/');
//       // This is where I would use dot.notation if it was always the same prop,
//       // but that defeats the point of having a function
//       const tempValue : any = item[propKeys[0]][propKeys[1]];
//       expandedValues.push( tempValue );
//     });
//     return expandedValues;
//   }

//   const item: any = {} ;// Lets say this is a list item with a lot of properties
//   const peopleKeys = ['Author/Title','Editor/Title'];
//   const allPeopleTitles = getTheseExpandedValues( item, peopleKeys );
//   console.log(allPeopleTitles.join(';')); // would display:  Mike.Zimmerman;Andrew.Connell

//   const LinkKeys = ['LinkCol1/Url','LinkCol1/Url'];
//   const allLinkUrls = getTheseExpandedValues( item, LinkKeys );
//   console.log(allLinkUrls.join(';')); // would display:  www.google.com;www.bing.com

// }

