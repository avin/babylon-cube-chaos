import Renderer from './renderer/Renderer'

//WS hack
global.BABYLON = BABYLON;

let app = global.app = {};

app.renderer = new Renderer('canvas');
