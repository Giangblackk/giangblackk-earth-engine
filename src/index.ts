import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

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
  }
};

export default plugin;
