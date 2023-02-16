
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';

import { IAnySourceItem } from '../fpsReferences';
import { IFpsItemsReturn } from '../fpsReferences';

import { ILoadPerformance } from '../fpsReferences';
import { ISearchSource } from './DataInterface';

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

export type ITabMain = ITabHome | ISearchSource | ITabInstructions | ITabContacts | ITabDetails | ITabLabels;
export type ITabContactPivots = ITabCommittee | ITabCoordinators | ITabSharePoint;

/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
export interface IComplianceOpsState extends IFPSCorePinMeReactComponentState {

  mainPivotKey: ITabMain;
  contactPivotKey: ITabContactPivots;

  fullAnalyticsSaved: boolean;

  site : IStateSource;
  committee : IStateSource;
  coordinators : IStateSource;
  maps : IStateSource;
  forms : IStateSource;
  tips : IStateSource;

}

