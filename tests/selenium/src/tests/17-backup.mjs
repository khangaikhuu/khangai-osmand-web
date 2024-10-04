import actionOpenMap from '../actions/actionOpenMap.mjs';
import actionLogIn from '../actions/actionLogIn.mjs';
import { clickBy, waitBy, waitByRemoved } from '../lib.mjs';
import { By } from 'selenium-webdriver';
import actionFinish from '../actions/actionFinish.mjs';

export default async function test() {
    await actionOpenMap();
    await actionLogIn();

    await waitBy(By.id('se-logout-button'));
    await clickBy(By.id('se-logout-button'));

    await waitBy(By.id('se-download-backup'));
    await clickBy(By.id('se-download-backup'));

    await waitBy(By.id('se-download-backup-dialog'));
    await clickBy(By.id('se-download-backup-btn'));
    await waitBy(By.id('se-download-backup-progress'));
    await waitByRemoved(By.id('se-download-backup-progress'));
    await waitByRemoved(By.id('se-download-backup-error'));

    await actionFinish();
}
