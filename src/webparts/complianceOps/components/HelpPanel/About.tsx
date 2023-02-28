import { IHelpTable, } from '@mikezimm/fps-library-v2/lib/banner/components/SingleHelpPage/ISinglePageProps';
// import { convertIssuesMarkdownStringToSpan } from '../../fpsReferences';

import { createAboutRow } from '@mikezimm/fps-library-v2/lib/banner/components/Panel/createAboutRow';
import { IWebpartBannerProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/IWebpartBannerProps';

export const panelVersionNumber = '2023-02-27 -  1.0.0.10'; //Added to show in panel

export function aboutTable( bannerProps: IWebpartBannerProps ): { table: IHelpTable } {

    const table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

    /**
     * Security update log
     *
     * converting all links and cdns to lower case so casing does miss a flag
     * standardizing all cdn links to start with /sites/ if on tenant
     * standardinzing all tag lings to start with /sites/ if on tenant
     * removing any extra // from both cdns and file links so you cant add extra slash in a url and slip by
     *
     * Does NOT find files without extensions (like images and also script files.)
     *
     * WARNING:  DO NOT add any CDNs to Global Warn or Approve unless you want it to apply to JS as well.
     */

    table.rows.push( createAboutRow('2023-02-27',"1.0.0.11","#52, #53, #54, ", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-02-27',"1.0.0.10","#25, #46, #47, #48, #49, #50 - Issues, Improvements", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('',"","#29, #30, #31, #32, #34, - Page text", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );

    table.rows.push( createAboutRow('2023-02-23',"1.0.0.09","#43, #44, #45", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-02-22',"1.0.0.08","#7, #28, #33, #36, #39, #40, #41", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );

    table.rows.push( createAboutRow('2023-02-17',"1.0.0.07","#37", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-02-17',"1.0.0.06","#7, #11, #19, #20, #21", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-02-17',"1.0.0.05","#15, #17, #18", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-02-17',"1.0.0.04","#12, #13, #14, #16", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-02-16',"1.0.0.03","#10", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-02-15',"1.0.0.02","#1, #2, E3, #4, #5, #6", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-02-08',"1.0.0.01","Initial Build", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );

    return { table: table };

}

