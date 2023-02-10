
// //Interfaces
// import { ISourcePropsFM, ISourceInfo, ISearchType, ISearchTypes } from './DataInterface';

import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { libraryColumns } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/FileInterface';
import { ModernSitePagesColumns, ModernSitePagesSearch, ExtraFetchModernPage } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/SitePages/SitePagesSource';
import { ISearchType, ISearchTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/ISearchTypes';
import { StdFileKeys, StdFileSearchTypes, StdSharePointKeys, StdSharePointSearchTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/StandardTypes';

// import { ISeriesSort } from '../fpsReferences';
// import { IAppFormat } from './INTERFACES/ILayoutsPage';

// NOTE:  IAppFormat must be very similar to StdComplianceKeys... except history vs unknown
export type IAppFormat = 'committee' | 'coordinators' | 'maps' | 'forms' | 'tips' | 'history';

export const IntraNetRecs = ['/sites','/lif','enet','_reco','rds_','home/']; //Just so this is not searchable easily
export const IntraNetHome: string =`${IntraNetRecs.join('')}`;

export type IDefSourceType = 'committee' | 'coordinators' | 'maps' | 'forms' | 'tips' | 'history' | 'unknown' | '*';

export type ISearchSource = 'Committee' | 'Coordinators' | 'Maps' | 'Forms' | 'Tips' | 'History';

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
  committee: ISourcePropsCOP;
  coordinators: ISourcePropsCOP;
  maps: ISourcePropsCOP;
  forms: ISourcePropsCOP;
  tips: ISourcePropsCOP;
  history: ISourcePropsCOP;
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
    performanceSettings: {  label: 'committee', updateMiliseconds: true, includeMsStr: true, op: 'fetch0' },
    webUrl: `${IntraNetHome}`,
    listTitle: 'RIG Committee',
    webRelativeLink: 'lists/RIG Committee',
    searchSource: 'Committee',
    searchSourceDesc:  'RIG Committee in LifeNET',
    columns: [ ...CommitteeColumns ],
    itemFetchCol: [],
    searchProps: [ ...CommitteeColumns ],
    selectThese: [ ...['*'], ...CommitteeColumns ],
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
    performanceSettings: {  label: 'coordinators', updateMiliseconds: true, includeMsStr: true, op: 'fetch1'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Facility Records Coordinators',
    webRelativeLink: 'lists/Facility%20Records%20Coordinators',
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
    performanceSettings: {  label: 'maps', updateMiliseconds: true, includeMsStr: true, op: 'fetch2'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Facility Record Maps',
    webRelativeLink: 'Facility Record Maps',
    searchSource: 'Maps',
    searchSourceDesc:  'Facility Record Maps in LifeNET',
    columns: MapsColumns,
    searchProps: Divisions,
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
    performanceSettings: {  label: 'forms', updateMiliseconds: true, includeMsStr: true, op: 'fetch3'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Appendices toAS303 and Commonly Used Forms',
    webRelativeLink: 'lists/Commonly Used Forms',
    viewItemLink: `${IntraNetHome}Manual/lists/Commonly Used Forms/DispForm.aspx?ID={{item.ID}}`,
    searchSource: 'Forms',
    searchSourceDesc:  'List in Manual Subsite',
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
    performanceSettings: {  label: 'tips', updateMiliseconds: true, includeMsStr: true, op: 'fetch4'  },
    webUrl: `${IntraNetHome}`,
    listTitle: 'Site Pages',
    webRelativeLink: 'SitePages',
    searchSource: 'Tips',
    searchSourceDesc:  'Site Pages library in Help Subsite',
    columns: ModernSitePagesColumns,
    searchProps: ModernSitePagesSearch,
    selectThese: [ ...ModernSitePagesColumns ],
    itemFetchCol: ExtraFetchModernPage,
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
export const StdComplianceKeys: IDefSourceType[] = [ 'committee' , 'coordinators' , 'maps' , 'forms' , 'tips' , 'history', 'unknown' ];

export const StdComplianceSearchTypes: ISearchTypeCOP[] = [
  //NOTE:  key must be exact match to strings in keys array above.
  { key: 'committee', title: 'committee', icon: 'Info', style: '', count: 0 },
  { key: 'coordinators', title: 'coordinators', icon: 'Bank', style: '', count: 0 },

  { key: 'maps', title: 'maps', icon: 'FontColor', style: '', count: 0 },
  { key: 'forms', title: 'forms', icon: 'Link12', style: '', count: 0 },
  { key: 'tips', title: 'tips', icon: 'BookAnswers', style: '', count: 0 },

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


