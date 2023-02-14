import { IAnySourceItem } from '../../../fpsReferences';

export interface ISourceRowRender {
  // onClick : ( item : IAnySourceItem, searchText: string, onClick: void , details: boolean, showItemType: boolean ) => JSX.Element;
  item: IAnySourceItem;
  searchText: string;

  // When clicking row, do something on SourcePages component
  onClick: (Id: number, type: string, item: IAnySourceItem) => void;

  // onOpenPanel will open the panel with the item.
  onOpenPanel?: (Id: number, type: string, item: IAnySourceItem) => void;

  // onParentCall is a pass down from the parent web part component and SHOULD look for this signature.
  onParentCall?:  (command: string, Id: number, type: string, item: IAnySourceItem) => void;

  details: boolean;
  showItemType: boolean;
}
