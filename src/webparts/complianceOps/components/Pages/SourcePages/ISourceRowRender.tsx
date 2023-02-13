import { IAnySourceItem } from '../../../fpsReferences';

export interface ISourceRowRender {
  // onClick : ( item : IAnySourceItem, searchText: string, onClick: void , details: boolean, showItemType: boolean ) => JSX.Element;
  item: IAnySourceItem;
  searchText: string;
  onClick: (Id: number, type: string, item: IAnySourceItem) => void;
  details: boolean;
  showItemType: boolean;
}
