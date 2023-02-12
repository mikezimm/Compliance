import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { ITabMain } from '../../IComplianceOpsProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import FadeCarousel from '@mikezimm/fps-library-v2/lib/components/molecules/FadeCarousel/component'

import styles from './page.module.scss';
// import stylesT from './tour.module.scss';
import { IAnySourceItem } from '../../../fpsReferences';
// import { IPagesContent } from '../INTERFACES/IPagesContent';
// import { SampleSitePages } from '../MockData/SitePages';
// import { AppLinks } from '../MockData/AppLinks';
import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
import { AllTeachBubbles } from '../Teaching/bubbles';

// import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
// import { Icon, } from 'office-ui-fabric-react/lib/Icon';

export interface IHomePageProps {
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
  // appLinks: IAnySourceItemFM[];
  // news: IPagesContent[];
  refreshID: string;

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
  const bannerImage: any = `https://www.tenant.com/sites/default/files/2022-04/background%402x.jpg`.replace(`tenant`,'vilotua'.split("").reverse().join(''));
  const backgroundImage: string = `url("${bannerImage}")`;
  // console.log('backgroundImage', backgroundImage );

  // const links: JSX.Element[] = [];
  // appLinks.map( link => {
  //   if ( link.LinkColumn ) links.push( 
  //     //https://github.com/mikezimm/ALVFinMan/issues/186
  //     <div><span className={ styles.commonLinkLink }onClick={ 
  //       () => { window.open( `${link.LinkColumn.Url.replaceAll(`tenant`,'vilotua'.split("").reverse().join(''))}` , '_blank')}}>
  //       {`${link.LinkColumn.Description}`}
  //     </span></div> );
  // });

  // const showNews = news.filter( n => n.Title );
  // const NewsCarousel: JSX.Element = showNews.length === 0 ? null :<FadeCarousel 
  //   carouselProps={{
  //     items: showNews,
  //     firstXItems: 5,
  //     noImage: true,
  //     hrefField: 'File/ServerRelativeUrl',
  //     showCreated: true,
  //     showModified: true,
  //     showPublished: true,
  //     constainerStyles: {
  //       // maxWidth: '550px',
  //       // height: '300px',
  //       // background: 'green',
  //     }
  //   }}
  // />
  const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles , '', 'MainPivot' ), updateTour, closeTour );

  const HomePageElement: JSX.Element = mainPivotKey !== 'Home' ? null : <div className = { styles.page } style={ null }>
    {/* <div className={ styles.homeBanner } style={{ backgroundImage: backgroundImage }} onClick={ () => { updateTour( lastBubble ); } } id='ComplHomeBanner'> */}
    <div className={ styles.homeBanner } style={{ backgroundImage: backgroundImage }} id='ComplHomeBanner'>
      {/* <img src='https://png.pngtree.com/back_origin_pic/00/01/50/d365b272b0e2127046411b5f93c750c6.jpg'/> */}
      <div className={ styles.homeTitle } onClick={ () => { updateTour( lastBubble ); } } id='ComplHomeBanner'>
          <div style={{ marginRight: '50px' }}>Start Tour</div>
          <div id={ 'ComplHomeStartTour' } ><Icon iconName={ 'MapPin' }/></div>
      </div>
      {/* Based on sample here:  https://codepen.io/kathykato/pen/rZRaNe */}
      {/* <div id="homeLearnMore" onClick={ () => { updateTour( lastBubble ); } } >
          <button className={stylesT.learnMore}>
            <span className={stylesT.circle} aria-hidden="true">
              <span className={[ stylesT.icon, stylesT.arrow ].join(' ')}></span>
            </span>
            <span className={stylesT.buttonText}>Learn More</span>
          </button>
        </div> */}
    </div>

    <div className={ styles.keyButtons }>
      <div id='ComplHomeSummary' >Summary</div>
      <div id='ComplHomeSummary' >Committee</div>
      <div id='ComplHomeSummary' >Coordinators</div>
      <div id='ComplHomeSummary' >Summary</div>
      <div id='ComplHomeReporting' >Maps</div>
      <div id='ComplHomeTopics' >Forms</div>
      <div id='ComplHomeLinkButton' >Tips</div>
      <div id='ComplHomeHelp' >Committee</div>
    </div>
    {/* <div className={ styles.newsBanner } id='ComplHomeNews' >
      { NewsCarousel }
    </div>
    <div className={ styles.variousLinks } id='ComplHomeLinks' >
      <h3>Common links</h3>
      { links }
    </div> */}
    { TeachMe }
  </div>;

  return ( HomePageElement );

}

export default HomePageHook;