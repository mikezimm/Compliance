import { IMinTeachBubble, ReplaceWpId } from "@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/IMinTeachBubble";

export type ITeachGroups = 'MainPivot' | 'Contacts' | 'Site';

const MainPivot: ITeachGroups = 'MainPivot';
const Contacts: ITeachGroups = 'Contacts';

const defaultMessage: string = `Click for more information`;

export const AllTeachBubbles: IMinTeachBubble[] =     [
  {
    // step: 0,
    // target: `#ComplHomeBanner${wpId}`,
    target: `#${MainPivot}Home${ReplaceWpId}`,
    headline: `Webpart landing page`,
    message: `Explains the big picture of what this webpart does.`,
  }, {
    // step: 0,
    target: `#${MainPivot}Instructions${ReplaceWpId}`,
    headline: `Get instructions`,
    message: `Step by step instructions and video on how to set records retention on your libraries.`,
    // message: `${defaultMessage}`,
  }, {
    // step: 0,
    target: `#${MainPivot}Tips${ReplaceWpId}`,
    headline: `Get some tips`,
    // message: ``,
    message: `${defaultMessage}`,
  }, {
    // step: 0,
    target: `#${MainPivot}Labels${ReplaceWpId}`,
    headline: `Search the Retention Schedule`,
    message: `Search (AS-303) Labels and determine what types of records you might have.`,
    // message: `${defaultMessage}`,
  }, {
    // step: 0,
    // target: `#ComplHomeBanner${wpId}`,
    target: `#${MainPivot}Site${ReplaceWpId}`,
    headline: `Quick summary of your site`,
    message: `This provides a quick overview of what a recent audit found on your site.`,
  }, {
    // step: 0,
    target: `#${MainPivot}Details${ReplaceWpId}`,
    headline: `'Details' Tab`,
    message: `In depth real time analysis of your current site.`,
    // message: `${defaultMessage}`,


  }, {
    // step: 0,
    target: `#${MainPivot}${Contacts}${ReplaceWpId}`,
    headline: `'${Contacts}' Tab`,
    message: `Have questions?  Contact a Records or SharePoint expert here`,
    // message: `${defaultMessage}`,
  }, {
    // step: 0,
    target: `#${Contacts}Committee${ReplaceWpId}`,
    headline: `'Committee' tab`,
    message: ``,
    // message: `${defaultMessage}`,
  }, {
    // step: 1,
    target: `#${Contacts}Coordinators${ReplaceWpId}`,
    headline: `'Coordinators' tab`,
    message: ``,
    // message: `${defaultMessage}`,
  },{

    // step: 0,
    target: `#${MainPivot}Maps${ReplaceWpId}`,
    headline: `Facility Record Maps`,
    // message: ``,
    message: `${defaultMessage}`,
  }, {
    // step: 0,
    target: `#${MainPivot}Forms${ReplaceWpId}`,
    headline: `Appendices to AS303 and Commonly Used Forms`,
    // message: ``,
    message: `${defaultMessage}`,
  }
]
