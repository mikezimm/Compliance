
// //Interfaces
// import { ISourcePropsFM, ISourceInfo, ISearchType, ISearchTypes } from './DataInterface';

import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { getSiteCollectionUrlFromLink } from '@mikezimm/fps-library-v2/lib/logic/Strings/urlServices';
import { libraryColumns } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/FileInterface';
import { ModernSitePagesColumns, ModernSitePagesSearch, ExtraFetchModernPage } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/SitePages/ModernSitePagesColumns';
import { ISearchType, ISearchTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/ISearchTypes';
import { StdFileKeys, StdFileSearchTypes, StdSharePointKeys, StdSharePointSearchTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/StandardTypes';
import { DisplayMode } from '@microsoft/sp-core-library';

// import { ISeriesSort } from '../fpsReferences';
// import { IAppFormat } from './INTERFACES/ILayoutsPage';

// NOTE:  IAppFormat must be very similar to StdComplianceKeys... except history vs unknown
export type IAppFormat = 'site' | 'committee' | 'coordinators' | 'maps' | 'forms' | 'tips' | 'history' | 'admins';

export const IntraNetRecs = ['/sites','/SP_Glob','alPpqRec','ords']; //Just so this is not searchable easily
export const IntraNetHome: string =`${IntraNetRecs.join('')}`;

export type IDefSourceType = 'site' | 'committee' | 'coordinators' | 'maps' | 'forms' | 'tips' | 'admins' | 'history' | 'unknown' | '*';

export type ISearchSource = 'Site' | 'Committee' | 'Coordinators' | 'Maps' | 'Forms' | 'Tips' | 'Admins' | 'History';

/**
 * Added  { prop: string; asc: boolean; } to fix the orderBy? Lint Error.
 * 
 * SUGGESTION:   Maybe refactor orderBy to use ISeriesSortObject
 */
export interface ISourcePropsCOP extends ISourceProps {
    key: IAppFormat;
    defType: IDefSourceType;        //Used in Search Meta function

    searchSource: ISearchSource;
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
  history: ISourcePropsCOP;
}

export const RecordsSitePagesColumns: string[] = [ 'Active', 'WebPartTab', 'SortOrder' ];

export const EnforcementColumns: string[] = [ 'ID', 'Title', 'URL', 'Subsite', 'SubTitle', 'SPOwner', 'NoRecordsDeclared', 'DocumentsHosted', 'JSONLists' ];

export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];
export const MapsColumns: string[] = [ 'ID','Region', 'Facility', ];

export const CommitteeColumns: string[] = [ 'ID','Title', 'Name/Title', 'Contact/Title', 'ExpertContact', 'MemberPosition' ];
export const CommitteeSearch: string[] = [ 'Corporate', 'Global', 'Divisional', 'Quality', 'Legal', 'IT', 'Data Privacy' ];

export const Divisions: string[] = [ 'AAM','AEU','AJA','ASA','Global','TCH', 'TKR','TND' ];

export const collectionUrl: string = getSiteCollectionUrlFromLink( window.location.pathname );
console.log( collectionUrl );

/**
 * NOTE ABOUT ADDING SOURCES:
 * Be sure to include here, component did mount fetch AND this._missingFetches in main react component
 */

export const SourceInfo: ISourceInfo = {

  admins: {
    key: 'admins',
    defType: 'admins',
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
    restFilter: `Active eq 'Public'`,

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
  committee: {
    key: 'committee',
    defType: 'committee',
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
    performanceSettings: {  label: 'tips', updateMiliseconds: true, includeMsStr: true, op: 'fetch5'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Tip of the Day',
    webRelativeLink: '/lists/Tip%20of%20the%20Day',
    searchSource: 'Tips',
    searchSourceDesc:  'Tip of the day list',
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