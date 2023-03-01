
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';

import { IAnySourceItem, IPerformanceOp } from '../fpsReferences';
import { IFpsItemsReturn } from '../fpsReferences';

import { ILoadPerformance } from '../fpsReferences';
import { ISearchSource } from './DataInterface';
import { IUserProperties } from './PersonaCard/IUserProperties';
import { IFPSResultStatus } from '@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus';
import { HttpClient, } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { ISuggestion } from './Suggestions/LabelSuggestions';
import { IFpsGetSiteReturn } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/IFpsGetSiteReturn';

export interface IComplianceOpsProps  extends IFPSCoreReactComponentProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  performance: ILoadPerformance;


  httpClient: HttpClient;
  GroupId: string;  // Need Site Level ( that web part is on )to determine if this is a team or not, not subsite
  GroupIdStatus: IFPSResultStatus;

}

export interface IStateSource extends IFpsItemsReturn {
  items: IAnySourceItem[];
  index: string[]; // All unsorted items key values in array for easy 'indexOf' search
  misc1?: string[]; // Optional array used for RigItems indicating which ones are NOT found as a record

}

export type ITabHome = `Home`;

export type ITabSite = `Site`;
export type ITabMaps = `Maps`;
export type ITabForms = `Forms`;
export type ITabTips = `Tips`;
export type ITabRigItems = `RigItems`;
export type ITabLabels = `Labels`;
export type ITabInstructions = `Instructions`;
export type ITabContacts = `Contacts`;
export type ITabDetails = `Details`;
export type ITabCommittee = `Committee`;
export type ITabCoordinators = `Coordinators`;
export type ITabSharePoint = `SharePoint`;
export type ITabExperts = `Experts`;
export type ITabAdmins = `Admins`;
export type ITabTesting = `Testing`;
export type ITabAllLists = `AllLists`;


export type ITabMain = ITabHome | ISearchSource | ITabInstructions | ITabContacts | ITabDetails | ITabRigItems | ITabLabels | ITabAdmins | ITabTesting | ITabAllLists ;
export type ITabContactPivots = ITabCommittee | ITabCoordinators | ITabSharePoint | ITabExperts;
export type ITabTestingPivots = 'Prod Titles' | 'QA Titles' | 'Prod Sales' | 'QA Sales' | 'RIG Items NA' | 'Prod Titles NA' | 'na' | 'Instructions';
export type ITabSecondary = ITabContactPivots | ITabTestingPivots;

export interface IStateUser extends IFpsItemsReturn {
  item: MicrosoftGraph.User;
}

export interface IStateSuggestions {
  performance: IPerformanceOp;
  all: ISuggestion[];
  user: ISuggestion[];
  libraries: ISuggestion[];
  web: ISuggestion[];
  site: ISuggestion[];

}
/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
export interface IComplianceOpsState extends IFPSCorePinMeReactComponentState {

  mainPivotKey: ITabMain;
  contactPivotKey: ITabContactPivots;

  targetSiteUrl: string;
  targetWebUrl: string;
  targetInfo: IFpsGetSiteReturn;
  targetStatus: string;

  targetGroupId: string; // Need Site Level of targetWeb to determine if this is a team or not, not subsite)
  targetGroupIdStatus: IFPSResultStatus;

  fullAnalyticsSaved: boolean;

  experts: IUserProperties[];

  user: IStateUser;

  labels : IStateSource;
  rigItems: IStateSource;
  admins : IStateSource;
  allLists: IStateSource;
  site : IStateSource;
  committee : IStateSource;
  coordinators : IStateSource;
  maps : IStateSource;
  forms : IStateSource;
  tips : IStateSource;

  suggestions: IStateSuggestions;

}
