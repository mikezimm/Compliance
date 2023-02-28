
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { ITabMain } from '../IComplianceOpsProps';
// import { Icon  } from 'office-ui-fabric-react/lib/Icon';
// import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';
import { getSiteInfo } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/getSiteInfo';
import { IFpsGetSiteReturn } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/IFpsGetSiteReturn';
import styles from './webInput.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import ReactJson from 'react-json-view';
import { fetchLables, IFpsHttpInfo } from '../HTTPFetch';
import { BasicAuth } from '../../storedSecrets/CorpAPIs';
import { IHttpClientOptions } from '@microsoft/sp-http-base';
// import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
// import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
// import { AllTeachBubbles } from '../Teaching/bubbles';
export const HTTPApiIsValidMessage: string = `API is valid`;
export interface IHTTPApiProps {
  showComponent: boolean;
  inputLabel?: string;
  textInput: string;
  description: string;
  httpClient: HttpClient;
  updateInputCallback( url: string, siteInfo: IFpsHttpInfo ) : void;
  callBackOnError: boolean;
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
  headers?: IHttpClientOptions;
}
const HTTPApiHook: React.FC<IHTTPApiProps> = ( props ) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, wpID, showComponent, textInput, updateInputCallback, httpClient, description, callBackOnError, headers } = props; //appLinks, news 
  const [ currentUrl, setCurrentUrl ] = useState<string>( textInput );
  const [ webURLStatus, setWebURLStatus ] = useState<string>( 'Untested' );
  // const [ validUrl, setValidUrl ] = useState<string>( '' );
  const [ response, setResponse ] = useState< IFpsHttpInfo >( null );
  // const [ lastBubble, setLastBubble ] = useState<number>( 0 );
  // useEffect(() => {
  //   setExpandedState( easyPagesExpanded )
  // }, [ debugMode ] );
  // const closeTour = ( ): void => {
  //   const saveBubble = teachBubble + 0;
  //   setLastBubble( saveBubble );
  //   setTeachBubble( null );
  // }
  const delayOnHTTPApiChange = (input: any, forceRun: boolean ): void => {
    const NewValue = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';
    setTimeout(async () => {
      if ( currentUrl !== NewValue || forceRun === true ) {
        const responseInfo: IFpsHttpInfo = await fetchLables( NewValue, httpClient, description, headers );
        if ( responseInfo.status === 'Success' ) {
          // setValidUrl( NewValue );
          setCurrentUrl( NewValue );
          if ( updateInputCallback ) updateInputCallback( NewValue, responseInfo,  );
          setWebURLStatus( HTTPApiIsValidMessage );
          setResponse( responseInfo );
        } else {
          // setValidUrl( '' );
          setCurrentUrl( NewValue );
          if ( callBackOnError === true && updateInputCallback ) updateInputCallback( NewValue, responseInfo, );
          setWebURLStatus( responseInfo.errorInfo.friendly );
          setResponse( responseInfo );
        }
      }
    }, 1000);
    // }
  }

  useEffect(() => {
    delayOnHTTPApiChange( textInput, true );
  }, [ ] );  // Only trigger on first load

  useEffect(() => {
    delayOnHTTPApiChange( textInput, false );
  }, [ textInput ] );  // When textInput changes


  // const MainContent: JSX.Element = <div style={{ cursor: 'default' }}>
  //   <ul>
  //     <li>These are NOT google maps {`:)`}</li>
  //     <li style={{ padding: '10px 0px', fontSize: 'x-large', color: 'red', fontWeight: 600 }}>Terri to provide further description here</li>
  //   </ul>
  // </div>
  // const InfoElement: JSX.Element = <Accordion 
  //   title = { 'More information about this tab'}
  //   defaultIcon = 'Help'
  //   showAccordion = { true }
  //   content = { MainContent }
  //   contentStyles = { { height: '100px' } }
  // />;
  const InputLabel : string = props.inputLabel ? props.inputLabel : `API Endpoint`;
  const HTTPApiElement: JSX.Element = showComponent !== true ? null : 
  <div><div style={{ display: 'inline-table', paddingBottom: '20px', paddingTop: '20px', width: '100%' }}>
    <span style={{ paddingLeft: '20px', paddingRight: '20px', fontSize: 'larger', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'default' }}>{ InputLabel }</span>
    <TextField
      className={ styles.textField }
      styles={ { fieldGroup: [ { width: '75%', maxWidth: '700px' }, ] } } //this.getReportingStyles
      // defaultValue={ textInput }
      value={ currentUrl }
      label={ null }
      autoComplete='off'
      // onChange={ this._onHTTPApiChange.bind(this) }
      onChange={ delayOnHTTPApiChange.bind(this) }
      onGetErrorMessage= { (value: string | Date) : string => { return "";} }
      validateOnFocusIn
      validateOnFocusOut
      multiline= { false }
      autoAdjustHeight= { true }
      // onKeyDown={(ev)=> { this.onHTTPApiKeyDown( ev ) ; } }
    />{ 
      <span style={{ color: webURLStatus === HTTPApiIsValidMessage ? 'green' : 'red', whiteSpace: 'nowrap', marginRight: '40px', fontSize: 'larger', fontWeight: 'bolder', cursor: 'default' }}>
         { webURLStatus }
      </span> }
    </div>
    { !response ? <div>{webURLStatus}</div> :
        <ReactJson src={ response } name={ 'Response Details' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false }
        enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
    }
    </div>;
  return ( HTTPApiElement );
}
export default HTTPApiHook;
