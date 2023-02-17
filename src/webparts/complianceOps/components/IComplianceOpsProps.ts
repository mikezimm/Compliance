
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';

import { IAnySourceItem } from '../fpsReferences';
import { IFpsItemsReturn } from '../fpsReferences';

import { ILoadPerformance } from '../fpsReferences';
import { ISearchSource } from './DataInterface';
import { IUserProperties } from './PersonaCard/IUserProperties';

export interface IComplianceOpsProps  extends IFPSCoreReactComponentProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  performance: ILoadPerformance;

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

/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
export interface IComplianceOpsState extends IFPSCorePinMeReactComponentState {

  mainPivotKey: ITabMain;
  contactPivotKey: ITabContactPivots;

  targetSite: string;
  targetStatus: string;

  fullAnalyticsSaved: boolean;

  experts: IUserProperties[];

  admins : IStateSource;
  site : IStateSource;
  committee : IStateSource;
  coordinators : IStateSource;
  maps : IStateSource;
  forms : IStateSource;
  tips : IStateSource;

}

