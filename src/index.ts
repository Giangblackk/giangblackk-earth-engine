import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the giangblackk_earth_extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'giangblackk_earth_extension:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension giangblackk_earth_extension is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('giangblackk_earth_extension settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for giangblackk_earth_extension.', reason);
        });
    }

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The giangblackk_earth_extension server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
