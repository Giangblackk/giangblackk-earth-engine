import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

import { Message } from '@lumino/messaging';

class APOWidget extends Widget {
  readonly img: HTMLImageElement;
  readonly summary: HTMLParagraphElement;

  constructor() {
    super();
    this.addClass('imgWidget');
    this.img = document.createElement('img');
    this.node.appendChild(this.img);
    this.summary = document.createElement('p');
    this.node.appendChild(this.summary);
  }

  async onUpdateRequest(msg: Message): Promise<void> {
    this.img.src = "https://apod.nasa.gov/apod/image/1012/M78LoopLDN1622_andreoHaLRGBh600.jpg";
    this.img.title = "Decorating the Sky";
    this.summary.innerText = "Decorating the Sky";
  }
}

/**
 * Initialization data for the giangblackk_earth_extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'giangblackk_earth_extension:plugin',
  autoStart: true,
  optional: [ICommandPalette],
  activate: async (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension giangblackk_earth_extension is activated!');
    console.log('ICommandPalette:', palette);

    const command: string = 'giangblackk_earth_extension:open';
    app.commands.addCommand(command, {
      label: 'Random Astronoy Picture',
      execute: () => {
        // create widget
        const content = new APOWidget();
        const widget = new MainAreaWidget({ content });
        widget.id = 'widget-id';
        widget.title.label = 'Astronomy Picture';
        widget.title.closable = true;

        // add widget to app
        if (!widget.isAttached) {
          app.shell.add(widget, 'main');
        }

        // update widget content
        content.update();
        app.shell.activateById(widget.id);
      }
    });
    palette.addItem({ command, category: 'Tutorial' });
  }
};

export default plugin;
