// import * as React from 'react';

// import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

// import ItemPane from './ItemPane/component';

// import { ISourceInfo } from "../DataInterface";
// import { ICanvasContentOptions } from "../INTERFACES/IModernPage";
// import { IFinManSearch } from "../INTERFACES/IFinManSearch";


// import { IPagesContent } from "../INTERFACES/IPagesContent";
// import { IAnySourceItemFM } from "../INTERFACES/IAnySource";
// import { IAppFormat } from "../INTERFACES/ILayoutsPage";
// import SingleModernPage from '../ModernPages/SinglePage/SingleModernPage';

// import { ISourcePropsFM } from '../DataInterface';

// const ItemPaneKeys: IAppFormat[] = [ 'accounts', 'acronyms', 'appLinks', 'entities', 'forms', 'sups' ];

// export interface IContentPanel {

//   showItemPanel: boolean;
//   showThisItem: IAnySourceItemFM;
//   primarySource: ISourcePropsFM;
//   onClosePanel: any;
//   debugMode: boolean;
//   topButtons: string[];

//   refreshId: string;
//   search: IFinManSearch ;
//   source: ISourceInfo;
//   canvasOptions: ICanvasContentOptions;

// }

// export function ContentPanel( props: IContentPanel ): JSX.Element {

//   //Copied from ModernPages
//   const imageStyle: string = '';

//   let panelContent = null;

//   if ( !props.showThisItem ) {
//     panelContent = <div>Very strange indeed.... No item was detected...</div>;

//   } else if ( ItemPaneKeys.indexOf( props.primarySource.key ) > -1 ) {
//     console.log( 'ContentPanel', props );
//     panelContent = <ItemPane 
//         item= { props.showThisItem as IAnySourceItemFM }
//         showCanvasContent1= { true }  //Tried false for appLinks, still crash
//         source= { props.source }
//         primarySource= { props.primarySource }
//         refreshId= { props.refreshId  }
//         canvasOptions= { props.canvasOptions }
//         imageStyle= { imageStyle }
//         debugMode= { props.debugMode }
//         search= { props.search  }
//         topButtons= { props.topButtons }  //Tried ['x','y'] for appLinks, still crash
//       />;

//   } else if ( [ 'general', 'news','help', 'manual', 'std', ].indexOf( props.primarySource.defType ) > -1 ) {
//     panelContent = <SingleModernPage 
//       page= { props.showThisItem as IPagesContent }
//       showCanvasContent1= { true }
//       source= { props.primarySource }
//       refreshId= { props.refreshId  }
//       canvasOptions= { props.canvasOptions }
//       imageStyle= { imageStyle }
//       debugMode= { props.debugMode }
//       />;
//   // } else if ( primarySource.defType === 'account' ) {

//   }

//   const thePanel = <div><Panel
//     isOpen={ props.showItemPanel === true ? true : false }
//     // this prop makes the panel non-modal
//     isBlocking={true}
//     onDismiss={ props.onClosePanel }
//     closeButtonAriaLabel="Close"
//     type = { PanelType.large }
//     isLightDismiss = { true }
//     >
//     { panelContent }
//   </Panel></div>;

//   return thePanel

// }

