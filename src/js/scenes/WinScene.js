import * as PIXI from 'pixi.js';
import app from '../appConfig.js'

export default class WinScene {

    constructor() {
        this.winSceneContainer = null;
        this.winSalaryText = null;
        this._createWinScene();
    }

    _createWinScene() {
        this.winSceneContainer = new PIXI.Container();
        //background panel
        const Box = new PIXI.Graphics();
        Box.lineStyle(2, 0x061639, 1);
        Box.beginFill(0x061639, 0.45);
        Box.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width - app.screen.width / 3, app.screen.height - app.screen.height / 3, 16);
        Box.pivot.set(Box.width / 2, Box.height / 2);
        Box.endFill();
        this.winSceneContainer.addChild(Box);

        //text info You Won
        const winText = new PIXI.Text("YOU WON!", {
            fontFamily: "Arial",
            fontSize: 36,
            fill: "yellow",
            stroke: 'black',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#ffffff",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        winText.anchor.set(0.5);
        winText.position.set(app.screen.width / 2, app.screen.height / 2);
        this.winSceneContainer.addChild(winText);

        this.winSalaryText = new PIXI.Text(`WIN`, {
            fontFamily: "Arial",
            fontSize: 36,
            fill: "yellow",
            dropShadow: true,
            dropShadowColor: "#ffffff",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 3,
            dropShadowDistance: 3,
        });
        this.winSalaryText.anchor.set(0.5);
        this.winSalaryText.position.set(app.screen.width / 2, app.screen.height / 2 + 50);
        this.winSceneContainer.addChild(this.winSalaryText);
    }

    visibleWinScene(winValue) {
        this.winSceneContainer.visible = true;
        this.winSalaryText.text = `${winValue}$`
    }

    hiddenWinScene() {
        this.winSceneContainer.visible = false;
    }

    getWinSceneContainer() {
        return this.winSceneContainer
    }

}