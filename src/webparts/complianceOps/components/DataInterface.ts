
// //Interfaces
// import { ISourcePropsFM, ISourceInfo, ISearchType, ISearchTypes } from './DataInterface';

import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { getSiteCollectionUrlFromLink } from '@mikezimm/fps-library-v2/lib/logic/Strings/urlServices';
import { libraryColumns } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/FileInterface';
import { ModernSitePagesColumns, ModernSitePagesSearch, ExtraFetchModernPage } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/SitePages/ModernSitePagesColumns';
import { ISearchType, ISearchTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/ISearchTypes';
import { StdFileKeys, StdFileSearchTypes, StdSharePointKeys, StdSharePointSearchTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/StandardTypes';
import { DisplayMode } from '@microsoft/sp-core-library';
import { RIG_API_PROD, LABEL_Page_Search_PROD, GetTitlesApi, GetItemApi } from '../storedSecrets/CorpAPIs';

// import { ISeriesSort } from '../fpsReferences';
// import { IAppFormat } from './INTERFACES/ILayoutsPage';

// NOTE:  IAppFormat must be very similar to StdComplianceKeys... except history vs unknown
export type IAppFormat = 'site' | 'allLists' | 'committee' | 'coordinators' | 'maps' | 'forms' | 'tips' | 'history' | 'admins' | 'labels' | 'rigItems';

export const IntraNetRecs = ['/sites','/SP_Glob','alPpqRec','ords']; //Just so this is not searchable easily
export const IntraNetHome: string =`${IntraNetRecs.join('')}`;

export type IDefSourceType = 'site' | 'allLists' | 'committee' | 'coordinators' | 'maps' | 'forms' | 'tips' | 'admins' | 'history' | 'labels' | 'rigItems' | 'user' | 'targetInfo' | 'unknown' | '*';

export type ISearchSource = 'Site' | 'AllLists' | 'Committee' | 'Coordinators' | 'Maps' | 'Forms' | 'Tips' | 'Admins' | 'Labels' | 'RigItems' | 'History';

/**
 * Added  { prop: string; asc: boolean; } to fix the orderBy? Lint Error.
 * 
 * SUGGESTION:   Maybe refactor orderBy to use ISeriesSortObject
 */
export interface ISourcePropsCOP extends ISourceProps {
    key: IAppFormat;
    defType: IDefSourceType;        //Used in Search Meta function

    searchSource: ISearchSource;
    indexKey: string;

    apiUrl?: string;
    // searchSourceDesc: string;

    // orderBy?: {
    //     prop: string;
    //     order: ISeriesSort;
    //     asc: boolean;
    // };
    // defSearchButtons: string[];  //These are default buttons always on that source page.  Use case for Manual:  Policy, Instruction etc...

}

export interface ISourceInfo {
  site: ISourcePropsCOP;
  committee: ISourcePropsCOP;
  coordinators: ISourcePropsCOP;
  maps: ISourcePropsCOP;
  forms: ISourcePropsCOP;
  tips: ISourcePropsCOP;
  admins: ISourcePropsCOP;
  labels: ISourcePropsCOP;
  rigItems: ISourcePropsCOP;
  allLists: ISourcePropsCOP;
  history: ISourcePropsCOP;
}

export const RecordsSitePagesColumns: string[] = [ 'Status', 'WebPartTab', 'SortOrder' ];

export const EnforcementColumns: string[] = [ 'ID', 'Title', 'URL', 'Subsite', 'SubTitle', 'SPOwner', 'NoRecordsDeclared', 'DocumentsHosted', 'JSONLists' ];
export const EnforcementColumnsAllLists: string[] = [ 'ID', 'Title', 'URL', 'Subsite', 'SubTitle', 'NoRecordsDeclared', 'DocumentsHosted' ];

export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];
export const MapsColumns: string[] = [ 'ID','Region', 'Facility', ];

export const CommitteeColumns: string[] = [ 'ID','Title', 'Name/Title', 'Contact/Title', 'Contact/Name', 'Contact/JobTitle', 'ExpertContact', 'MemberPosition' ];
export const CommitteeSearch: string[] = [ 'Corporate', 'Global', 'Divisional', 'Quality', 'Legal', 'IT', 'Data Privacy' ];

export const Divisions: string[] = [ 'AAM','AEU','AJA','ASA','Global','TCH', 'TKR','TND' ];

export const collectionUrl: string = getSiteCollectionUrlFromLink( window.location.pathname );
console.log( collectionUrl );

// {
//   "Country": "",
//   "RecordCode": "FAC-20",
//   "RecordTitle": "Security Plans, Vulnerability Assessments and Compliance Reporting",
//   "Description": "Records documenting security plans and vulnerability assessments for chemical and other facilities including, for example, facility security plans and assessments, vessel security plans and assessments, compliance reporting and top screens.  ",
//   "CT_Group": "_ALV Facilities, Equipment and Fleet - FAC-2 Physical Security",
//   "Published": "No",
//   "TargetPath": "",
//   "RetentionType": "Fixed",
//   "RetentionNumber": "10",
//   "RetentionUnit": "Years",
//   "RetentionTrigger": "Creation",
//   "RecordFunction": "Facilities, Equipment and Fleet",
//   "RecordCategory": "FAC-2 Physical Security",
//   "ModifiedDate": "2021-11-18T15:06:50Z",
//   "Status": "Active",
//   "FunctionCode": "",
//   "CategoryCode": ""
// },

export const LabelSearchColumns: string[] = [
  'Country', // Searchable
  'RecordCode', // Searchable   : "FAC-20",
  'RecordTitle', // Searchable  : "Security Plans, Vulnerability Assessments and Compliance Reporting",
  'Description', // Searchable  : "Records documenting security plans and vulnerability assessments for chemical and other facilities including, for example, facility security plans and assessments, vessel security plans and assessments, compliance reporting and top screens.  ",
  'CT_Group', // Searchable     : "_ALV Facilities, Equipment and Fleet - FAC-2 Physical Security",
  'TargetPath', // Searchable
  'RecordFunction', // Searchable : "Facilities, Equipment and Fleet",
  'RecordCategory', // Searchable : "FAC-2 Physical Security",
  'Status', // Searchable         : "Active",
  'ItemNamesStr', // From RigItemNames         : ,
 ];

 export const RigItemSearchColumns: string[] = [
  'Status', //  : string;
  'ItemId', //  : string; // This is added when it is fetched so it can be processed easier.
  'ItemName', //  : string;
  'ItemType', //  : string;
  'ItemDescription', //  : string;
  'FunctionCode', //  : string;
  'FunctionName', //  : string;
  'CategoryCode', //  : string;
  'CategoryName', //  : string;
  'RecordCode', //  : string;
  'RecordTitle', //  : string;
  'Classification', //  : string;
  'GlobalDataPrivacy', //  : string;
 ];

export const LabelOtherColumns: string[] = [
  'Published', // DETAILS TAB       : "No",
  'RetentionType', // DETAILS TAB   : "Fixed",
  'RetentionNumber', // DETAILS TAB : "10",
  'RetentionUnit', // DETAILS TAB   : "Years",
  'RetentionTrigger', // DETAILS TAB: "Creation",
  'ModifiedDate', // DETAILS TAB    : "2021-11-18T15:06:50Z",
  'FunctionCode',
  'CategoryCode',
 ];


/**
 * NOTE ABOUT ADDING SOURCES:
 * Be sure to include here, component did mount fetch AND this._missingFetches in main react component
 */

export const SourceInfo: ISourceInfo = {

  labels: {
    key: `labels`,
    defType: `labels`,
    performanceSettings: {  label: 'labels', updateMiliseconds: true, includeMsStr: true, op: 'fetch7'  },
    indexKey: `RecordCode`,
    webUrl: RIG_API_PROD,
    listTitle: `Labels`,
    webRelativeLink: `/RetentionSchedule.aspx`,
    apiUrl: `${ RIG_API_PROD }${ GetTitlesApi }`,
    // absoluteWebUrl?: string;
    // sitesWebUrls?: string;
    // selectThese?: string[];
    // expandThese?: string[];
    // restFilter?: string;
    // orderBy?: ISeriesSortObject;
    // webRelativeLink: string;
    viewItemLink: ``,
    searchSource: `Labels`,
    searchSourceDesc: `Labels`,
    columns: [],
    searchProps: LabelSearchColumns,
    // evalFilter?: string;
    // itemFetchCol?: string[];
    // isModern?: boolean;
    // OverflowTab?: string;
    // meta0?: string[];
    // meta1?: string[];
    // meta2?: string[];
    // meta3?: string[];
    // metaX?: string[];
    defSearchButtons: ['China', 'Engineering', 'Contracts', 'FAC' ],
    fetchCount: 5000,
  },

  rigItems: {
    key: `rigItems`,
    defType: `rigItems`,
    indexKey: `ItemName`, //ItemId 
    performanceSettings: {  label: 'RigItems', updateMiliseconds: true, includeMsStr: true, op: 'fetch8'  },
    webUrl: RIG_API_PROD,
    listTitle: `Examples`,
    webRelativeLink: `/ItemGovernance.aspx`,
    apiUrl: `${ RIG_API_PROD }${ GetItemApi }`,
    // absoluteWebUrl?: string;
    // sitesWebUrls?: string;
    // selectThese?: string[];
    // expandThese?: string[];
    // restFilter?: string;
    // orderBy?: ISeriesSortObject;
    // webRelativeLink: string;
    viewItemLink: ``,
    searchSource: `RigItems`,
    searchSourceDesc: `Examples`,
    columns: [],
    searchProps: RigItemSearchColumns,

    // evalFilter?: string;
    // itemFetchCol?: string[];
    // isModern?: boolean;
    // OverflowTab?: string;
    // meta0?: string[];
    // meta1?: string[];
    // meta2?: string[];
    // meta3?: string[];
    // metaX?: string[];
    defSearchButtons: [ 'Current', 'China', 'Contracts', 'FAC', 'Personal Data', 'Sensitive Personal Data', 'Confidential', 'Secret' ],
    fetchCount: 5000,
  },

  admins: {
    key: 'admins',
    defType: 'admins',
    indexKey: `ID`,
    performanceSettings: {  label: 'admins', updateMiliseconds: true, includeMsStr: true, op: 'fetch6'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Site Pages',
    webRelativeLink: '/SitePages',
    searchSource: 'Admins',
    searchSourceDesc:  'Site Pages library in Help Subsite',
    columns: [ ...ModernSitePagesColumns, ...RecordsSitePagesColumns ],
    searchProps: [ ...ModernSitePagesSearch, ...RecordsSitePagesColumns ],
    selectThese: [ ...ModernSitePagesColumns, ...RecordsSitePagesColumns ],
    itemFetchCol: ExtraFetchModernPage,
    isModern: true,
    restFilter: `Status eq 'Public'`,

    defSearchButtons: [ 'Home', 'Instructions', 'Admin', 'Contents', 'Others', ],
    // meta1 should be same as defSearchButtons and is used to build Admins tab
    meta1:            [ 'Home', 'Instructions', 'Admin', 'Contents', 'Others', ],

    orderBy: { //Including even though it does not seem to do anything
      prop: 'Title',
      order: 'asc',
      asc: true,
    },
    fetchCount: 5000,
  },

  site: {
    key: 'site',
    defType: 'site',
    indexKey: `ID`,
    performanceSettings: {  label: 'site', updateMiliseconds: true, includeMsStr: true, op: 'fetch0' },
    webUrl: `/sites/alvsiteprovisioning`,
    listTitle: 'SPORetentionLabelsEnforcement',
    webRelativeLink: '/lists/SPORetentionLabelsEnforcement',
    searchSource: 'Site',
    searchSourceDesc:  'Site Collection Retention Label Status',
    columns: [ ...EnforcementColumns ],
    itemFetchCol: [],
    searchProps: [ ...EnforcementColumns ],
    selectThese: [ ...['*'], ...EnforcementColumns ],
    isModern: true,
    restFilter: `URL eq '${collectionUrl}'`,
    defSearchButtons: [ 'Collection','Current' ],
    orderBy: { //Including even though it does not seem to do anything
      prop: 'Title',
      order: 'asc',
      asc: true,
    },
    fetchCount: 500,
  },

  allLists: {
    key: 'allLists',
    defType: 'allLists',
    indexKey: `ID`,
    performanceSettings: {  label: 'allLists', updateMiliseconds: true, includeMsStr: true, op: 'fetch9' },
    webUrl: `/sites/alvsiteprovisioning`,
    listTitle: 'SPORetentionLabelsEnforcement',
    webRelativeLink: '/lists/SPORetentionLabelsEnforcement',
    searchSource: 'Site',
    searchSourceDesc:  'Site Collection Retention Label Status',
    columns: [ ...EnforcementColumnsAllLists ],
    itemFetchCol: [],
    searchProps: [ ...EnforcementColumnsAllLists ],
    selectThese: [ ...EnforcementColumnsAllLists ],
    isModern: true,
    restFilter: ``,
    defSearchButtons: [ '' ],
    // orderBy: { //Including even though it does not seem to do anything
    //   prop: 'Title',
    //   order: 'asc',
    //   asc: true,
    // },
    fetchCount: 5000,
  },

  committee: {
    key: 'committee',
    defType: 'committee',
    indexKey: `ID`,
    performanceSettings: {  label: 'committee', updateMiliseconds: true, includeMsStr: true, op: 'fetch1' },
    webUrl: `${IntraNetHome}`,
    listTitle: 'RIG Committee',
    webRelativeLink: '/lists/RIG Committee',
    searchSource: 'Committee',
    searchSourceDesc:  'RIG Committee in LifeNET',
    columns: [ ...CommitteeColumns ],
    itemFetchCol: [],
    searchProps: [ ...CommitteeColumns ],
    selectThese: [ ...['*'], ...CommitteeColumns ],
    expandThese: [ 'Name', 'Contact' ],
    isModern: true,
    restFilter: '',
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
    indexKey: `ID`,
    performanceSettings: {  label: 'coordinators', updateMiliseconds: true, includeMsStr: true, op: 'fetch2'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Facility Records Coordinators',
    webRelativeLink: '/lists/Facility%20Records%20Coordinators',
    searchSource: 'Coordinators',
    searchSourceDesc:  'Facility Records Coordinators in LifeNET',
    columns: CoordinatorColumns,
    itemFetchCol: [],
    searchProps: CoordinatorColumns,
    selectThese: [ ...['*'], ...CoordinatorColumns, ],
    expandThese: [ 'Name', 'AlternateContact' ],
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
    indexKey: `ID`,
    performanceSettings: {  label: 'maps', updateMiliseconds: true, includeMsStr: true, op: 'fetch3'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Facility Record Maps',
    webRelativeLink: '/Facility Record Maps',
    searchSource: 'Maps',
    searchSourceDesc:  'Facility Record Maps in LifeNET',
    columns: MapsColumns,
    searchProps: [ ...[ 'FileLeafRef'], ...MapsColumns, ],
    selectThese: [ ...libraryColumns, ...MapsColumns ],
    expandThese: [ 'Author', 'Editor' ],
    itemFetchCol: [],
    isModern: true,
    restFilter: '',
    defSearchButtons: Divisions,
    orderBy: { //Including even though it does not seem to do anything
      prop: 'FileLeafRef',
      order: 'asc',
      asc: true,
    },
    fetchCount: 5000,
  },

  forms: {
    key: 'forms',
    defType: 'forms',
    indexKey: `ID`,
    performanceSettings: {  label: 'forms', updateMiliseconds: true, includeMsStr: true, op: 'fetch4'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Appendices toAS303 and Commonly Used Forms',
    webRelativeLink: '/Commonly%20Used%20Forms',
    viewItemLink: `${IntraNetHome}/Commonly%20Used%20Forms/DispForm.aspx?ID={{item.ID}}`,
    searchSource: 'Forms',
    searchSourceDesc:  'Facility Record Forms',
    columns: [ ...libraryColumns, ...[ 'Status' ]  ],
    searchProps: [ 'Title', 'FileLeafRef', 'Status',  ],
    selectThese: [ ...libraryColumns, ...[ 'Status' ] ],
    itemFetchCol: [],
    isModern: true,
    restFilter: '',
    defSearchButtons: [ 'Active','Historical' ],
    fetchCount: 5000,
  },

  tips: {
    key: 'tips',
    defType: 'tips',
    indexKey: `ID`,
    performanceSettings: {  label: 'tips', updateMiliseconds: true, includeMsStr: true, op: 'fetch5'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Tip of the Day',
    webRelativeLink: '/lists/Tip%20of%20the%20Day',
    searchSource: 'Tips',
    searchSourceDesc:  'Tips',
    columns: ['*'],
    searchProps: ['Tip'],
    selectThese: [ '*' ],
    itemFetchCol: [],
    isModern: true,
    restFilter: `Id ne 'X' and ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159' and Title ne 'Home'`,
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
    indexKey: `ID`,
    webUrl: `${IntraNetHome}/`,
    webRelativeLink: '',
    searchSource: 'History',
    searchSourceDesc:  'History of your current session',
    listTitle: 'History',
    columns: [ ], //,'StandardDocuments/Title'
    searchProps: [ ], //'StandardDocuments/Title'
    selectThese: [ ],
    orderBy: { prop: 'Title', order: 'asc', asc: false },
    isModern: true,
    defSearchButtons: [],
    fetchCount: 5000,
  },
};

export interface ISearchTypeCOP extends ISearchType { }

export interface ISearchTypesCOP extends ISearchTypes { }

// MUST MATCH THE keys order in StdComplianceSearchTypes
export const StdComplianceKeys: IDefSourceType[] = [ 'committee' , 'coordinators' , 'maps' , 'forms' , 'tips' , 'admins', 'history', 'unknown' ];

export const StdComplianceSearchTypes: ISearchTypeCOP[] = [
  //NOTE:  key must be exact match to strings in keys array above.
  { key: 'committee', title: 'committee', icon: 'Info', style: '', count: 0 },
  { key: 'coordinators', title: 'coordinators', icon: 'Bank', style: '', count: 0 },

  { key: 'maps', title: 'maps', icon: 'FontColor', style: '', count: 0 },
  { key: 'forms', title: 'forms', icon: 'Link12', style: '', count: 0 },
  { key: 'tips', title: 'tips', icon: 'BookAnswers', style: '', count: 0 },

  { key: 'admins', title: 'admins', icon: 'Badge', style: '', count: 0 },

  { key: 'unknown', title: 'unkown', icon: 'Help', style: '', count: 0 },
];

// Merges common SharePoint and File Search Types with COP ones, commonize from ALVFinMan
export const SearchTypesCOP:ISearchTypesCOP  = {
    keys: [
      ...StdComplianceKeys,
      ...StdSharePointKeys,
      ...StdFileKeys,
    ],
    objs: [
      ...StdComplianceSearchTypes,
      ...StdSharePointSearchTypes,
      ...StdFileSearchTypes,
    ]
};

export function buildCurrentSourceInfo( editMode: DisplayMode, getsAdmin: boolean, webUrl: string ) : ISourceInfo {

  SourceInfo.site.performanceSettings.editMode = editMode;
  SourceInfo.committee.performanceSettings.editMode = editMode;
  SourceInfo.coordinators.performanceSettings.editMode = editMode;
  SourceInfo.maps.performanceSettings.editMode = editMode;
  SourceInfo.forms.performanceSettings.editMode = editMode;
  SourceInfo.tips.performanceSettings.editMode = editMode;
  SourceInfo.admins.performanceSettings.editMode = editMode;
  SourceInfo.labels.performanceSettings.editMode = editMode;

  // Give Admins of Records site and Tricky Users the Admins tab and Admins pages
  if ( getsAdmin === true ) { SourceInfo.admins.restFilter = ''; }
  if ( webUrl ) { SourceInfo.site.restFilter =`URL eq '${ webUrl }'`; }

  return SourceInfo;
}

/**
 * NOTE USE THIS FROM fps-library-v2.... THIS IS JUST FOR LOCAL TESTING
 * Use SearchTypes for addSearchMeta1 && addSearchMeta2 function
 *   -- if you do not have a consolidated search page (with multiple sources)
 */
export const SearchTypes: ISearchTypes = {
  keys: [
    ...StdSharePointKeys,
    ...StdFileKeys,
  ],
  objs: [
    ...StdSharePointSearchTypes,
    ...StdFileSearchTypes,
  ]
}