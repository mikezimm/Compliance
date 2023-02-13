import { ISourceInfo, ISourcePropsCOP } from "../../DataInterface";
import { IAnySourceItem } from "../../../fpsReferences";
// import { ICanvasContentOptions } from "../INTERFACES/IModernPage";
// import { IFinManSearch } from "../INTERFACES/IFinManSearch";
import { IMinPageArrowsState, IPageArrowsParentProps } from '@mikezimm/fps-library-v2/lib/components/molecules/Arrows/PageArrows';
import { ISourceRowRender } from "./GenericItem/Row";
import { IStateSource } from "../../IComplianceOpsProps";

export interface ISourcePagesProps extends IPageArrowsParentProps {
  // refreshId: string;

  resetArrows?: string; //unique Id used to reset arrows to starting position

  startQty: number;  //Number of items to show for paging

  showItemType: boolean; // was previously - search: IFinManSearch ;

  // source: ISourceInfo;
  primarySource: ISourcePropsCOP;
  topButtons: string[];

  pageWidth: number;

  deepProps: string[];

  // bumpDeepLinks: any;
  // jumpToDeepLink?: any;

  stateSource: IStateSource;
  renderRow( props: ISourceRowRender ): JSX.Element;

  // fetchTime: number;

  // canvasOptions: ICanvasContentOptions;

  debugMode?: boolean; //Option to display visual ques in app like special color coding and text

}

export type ISort = 'asc' | 'dec' | '-';

export interface ISourcePagesState extends IMinPageArrowsState {
  // description: string;

  resetArrows?: string; //unique Id used to reset arrows to starting position

  filtered: any[];
  topSearch: string[];

  showItemPanel: boolean;
  showThisItem: IAnySourceItem;
  showCanvasContent1: boolean;
  showPanelJSON: boolean;

  sortNum: ISort;
  sortName: ISort;
  sortGroup: ISort;

  searchText: string;
  searchTime: number;
  refreshId: string;

  detailToggle: boolean;

  // firstVisible: number; //Index of item to start showing ( for paging )
  // lastVisible: number; //Index of item to start showing ( for paging )

}
