import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { IStateSource, ITabMain } from '../../IComplianceOpsProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

// import FadeCarousel from '@mikezimm/fps-library-v2/lib/components/molecules/FadeCarousel/component';

import styles from './page.module.scss';

import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
import { easyLinkElement } from '@mikezimm/fps-library-v2/lib/banner/components/EasyPages/elements';
import { AllTeachBubbles } from '../Teaching/bubbles';
import { ISourcePropsCOP } from '../../DataInterface';

export interface IHomePageProps {
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
  refreshID: string;

  primarySource: ISourcePropsCOP;
  fpsItemsReturn : IStateSource;

}

/***
 *    .d8888. d888888b  .d8b.  d8888b. d888888b      db   db  .d88b.   .d88b.  db   dD 
 *    88'  YP `~~88~~' d8' `8b 88  `8D `~~88~~'      88   88 .8P  Y8. .8P  Y8. 88 ,8P' 
 *    `8bo.      88    88ooo88 88oobY'    88         88ooo88 88    88 88    88 88,8P   
 *      `Y8b.    88    88~~~88 88`8b      88         88~~~88 88    88 88    88 88`8b   
 *    db   8D    88    88   88 88 `88.    88         88   88 `8b  d8' `8b  d8' 88 `88. 
 *    `8888Y'    YP    YP   YP 88   YD    YP         YP   YP  `Y88P'   `Y88P'  YP   YD 
 *                                                                                     
 *                                                                                     
 */

const HomePageHook: React.FC<IHomePageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, wpID, } = props; //appLinks, news 

    const [ teachBubble, setTeachBubble ] = useState<number>( null );
    const [ lastBubble, setLastBubble ] = useState<number>( 0 );

  /***
 *     .d88b.  d8b   db       .o88b. db      d888888b  .o88b. db   dD .d8888. 
 *    .8P  Y8. 888o  88      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 88'  YP 
 *    88    88 88V8o 88      8P      88         88    8P      88,8P   `8bo.   
 *    88    88 88 V8o88      8b      88         88    8b      88`8b     `Y8b. 
 *    `8b  d8' 88  V888      Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. db   8D 
 *     `Y88P'  VP   V8P       `Y88P' Y88888P Y888888P  `Y88P' YP   YD `8888Y' 
 *                                                                            
 *                                                                            
 */

  // useEffect(() => {
  //   setExpandedState( easyPagesExpanded )
  // }, [ debugMode ] );

  const closeTour = ( ): void => {
    const saveBubble = teachBubble + 0;
    setLastBubble( saveBubble );
    setTeachBubble( null );
  }

  const updateTour = ( newBubble: number ): void => {
    const saveBubble = newBubble + 0;
    setLastBubble( saveBubble );
    setTeachBubble( saveBubble );
  }

  /***
 *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
 *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
 *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
 *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
 *    88.     88booo. 88.     88  88  88 88.     88  V888    88    
 *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
 *                                                                 
 *                                                                 
 */
  // const originalBannerImage: string = `https://www.tenant.com/sites/lifenet_Records_Home/SiteAssets/SitePages/lifenet_Records_Home/1209836016-LifeCycle.jpg`;
  const fullBannerImage: string = `https://tenant.sharepoint.com/_api/v2.1/sites/tenant.sharepoint.com,1559a4bd-ef22-4efa-9902-8914647da26e,5ee8b77b-b4a2-400d-aaa7-76cf05ec1712/lists/330921c3-6222-4640-b3f7-3b724f4a2680/items/1e80df9d-3d67-4262-ad94-57e6eec74ac4/driveItem/thumbnails/0/c960x99999/content?preferNoRedirect=true&prefer=extendCacheMaxAge&clientType=modernWebPart`;
  const bannerImage: string = fullBannerImage.replace(`tenant`,'vilotua'.split("").reverse().join(''));
  const backgroundImage: string = `url("${bannerImage}")`;

  const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles , '', 'MainPivot' ), updateTour, closeTour );

  const filtered = props.fpsItemsReturn.items.filter( item => { return item.WebPartTab === 'Home' && item.Active === 'Public' } ); //"Home"

  const InstructionsPageElement: JSX.Element = mainPivotKey !== 'Home' ? null : <div className = { styles.page } style={ null }>
    {/* { InfoElement} */}
    <div className = { 'easy-container' } style={ {} }>
      { filtered.map( link => { return easyLinkElement( link as any, '_blank'  ) } ) }
    </div>
    { TeachMe }
  </div>;

  const HomePageElement: JSX.Element = mainPivotKey !== 'Home' ? null : <div className = { styles.page } style={ null }>
    {/* <div className={ styles.homeBanner } style={{ backgroundImage: backgroundImage }} onClick={ () => { updateTour( lastBubble ); } } id='ComplHomeBanner'> */}
    <div className={ styles.homeBanner } style={{ backgroundImage: backgroundImage }} id='ComplHomeBanner'>
      {/* <img src='https://png.pngtree.com/back_origin_pic/00/01/50/d365b272b0e2127046411b5f93c750c6.jpg'/> */}
      <div className={ styles.homeTitle } onClick={ () => { updateTour( lastBubble ); } } id='ComplHomeBanner'>
          <div style={{ marginRight: '50px' }}>Start Tour</div>
          <div id={ 'ComplHomeStartTour' } ><Icon iconName={ 'MapPin' }/></div>
      </div>
    </div>

    { InstructionsPageElement }
    { TeachMe }
  </div>;

  return ( HomePageElement );

}

export default HomePageHook;