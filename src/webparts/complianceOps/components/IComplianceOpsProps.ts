
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';

import { IAnySourceItem } from '../fpsReferences';
import { IFpsItemsReturn } from '../fpsReferences';

import { ILoadPerformance } from '../fpsReferences';
import { ISearchSource } from './DataInterface';
import { IUserProperties } from './PersonaCard/IUserProperties';
import { IFPSResultStatus } from '@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus';
import { HttpClient, } from '@microsoft/sp-http';

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
}

export type ITabHome = `Home`;

export type ITabSite = `Site`;
export type ITabMaps = `Maps`;
export type ITabForms = `Forms`;
export type ITabTips = `Tips`;
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


export type ITabMain = ITabHome | ISearchSource | ITabInstructions | ITabContacts | ITabDetails | ITabLabels | ITabAdmins | ITabTesting;
export type ITabContactPivots = ITabCommittee | ITabCoordinators | ITabSharePoint | ITabExperts;
export type ITabTestingPivots = 'Prod Titles' | 'QA Titles' | 'Prod Sales' | 'QA Sales' | 'na' | 'Instructions';

/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
export interface IComplianceOpsState extends IFPSCorePinMeReactComponentState {

  mainPivotKey: ITabMain;
  contactPivotKey: ITabContactPivots;

  targetSite: string;
  targetStatus: string;

  targetGroupId: string; // Need Site Level of targetWeb to determine if this is a team or not, not subsite)
  targetGroupIdStatus: IFPSResultStatus;

  fullAnalyticsSaved: boolean;

  experts: IUserProperties[];

  labels : IStateSource;
  admins : IStateSource;
  site : IStateSource;
  committee : IStateSource;
  coordinators : IStateSource;
  maps : IStateSource;
  forms : IStateSource;
  tips : IStateSource;

}

export interface ICorpLabels   {
  Country: string;
  RecordCode: string;
  RecordTitle: string;
  Description: string;
  CT_Group: string;
  Published: string;
  TargetPath: string;
  RetentionType: string;
  RetentionNumber: string;
  RetentionUnit: string;
  RetentionTrigger: string;
  RecordFunction: string;
  RecordCategory: string;
  ModifiedDate: string;
  Status: string;
  FunctionCode: string;
  CategoryCode: string;
}