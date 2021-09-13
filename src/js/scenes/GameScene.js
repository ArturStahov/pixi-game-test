import * as PIXI from 'pixi.js';
import app from '../appConfig.js'

const TextureCache = PIXI.utils.TextureCache;

export default class GameScene {
    constructor() {
        this.gameSceneContainer = null;
        this._createGameSceneContainer()   
    }

    _createGameSceneContainer() {
        this.gameSceneContainer = new PIXI.Container();
        this.gameSceneContainer.width = app.screen.width;
        this.gameSceneContainer.height = app.screen.height;
        this.gameSceneContainer.x = app.screen.width / 2;
        this.gameSceneContainer.y = app.screen.height / 2;
        this.gameSceneContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);
        //add background
        const bg = new PIXI.Sprite.from(TextureCache["back_five_dogs.jpg"]);
        bg.position.set(app.screen.width / 2, app.screen.height / 2);
        bg.anchor.set(0.5);
        bg.scale.x = Math.min(app.screen.width / bg.width);
        bg.scale.y = Math.min(app.screen.height / bg.height);
        this.gameSceneContainer.addChild(bg);
        this.gameSceneContainer.visible = false
    }

    getGameSceneContainer() {
        return this.gameSceneContainer;
    }
 
    visibleGameScene() {
        this.gameSceneContainer.visible = true;
    }

    hiddenGameScene() {
        this.gameSceneContainer.visible = false;
    }

}