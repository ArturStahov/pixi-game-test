import * as PIXI from 'pixi.js';
import app from '../appConfig.js'
import generateRandomInt from '../../utils/generateRandomInt.js'

const TextureCache = PIXI.utils.TextureCache;

export default class GameScene {
    constructor() {
        this.gameSceneContainer = null;
        this.gameItem = null;
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
        this.gameSceneContainer.visible = false;
    }

    generateGameArea() {
        const gameAreaContainer = new PIXI.Container();
        this.gameItems = [];
        const SYMBOL_SIZE = 100;
        const ANIM_SYMBOL_SIZE = 130;

         for (let i = 0; i < 5; i += 1) {
                const itemContainer= new PIXI.Container();
                const symbol = new PIXI.Sprite.from(TextureCache["doggy.png"]);
                symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
                symbol.anchor.set(0.5);

                const animateTexture = [
                    TextureCache["circle_1.png"],
                    TextureCache["circle_2.png"],
                    TextureCache["circle_3.png"],
                    TextureCache["circle_4.png"],
                    TextureCache["circle_5.png"],
                    TextureCache["circle_6.png"],
                    TextureCache["circle_7.png"],
                    TextureCache["circle_8.png"],
                   ];

                const animSymbol = new PIXI.AnimatedSprite(animateTexture);
                animSymbol.scale.x = animSymbol.scale.y = Math.min(ANIM_SYMBOL_SIZE / animSymbol.width, ANIM_SYMBOL_SIZE / animSymbol.height);
                animSymbol.anchor.set(0.5);
                animSymbol.animationSpeed = 0.3;
                animSymbol.loop = false;
                animSymbol.visible=false;

                if(i == 1){
                    symbol.scale.x *= -1;
                }

                if(i == 4){
                    symbol.scale.x *= -1;
                }
                               
                itemContainer.addChild(symbol);
                itemContainer.addChild(animSymbol);
                itemContainer.x =generateRandomInt(0, app.screen.width / 2);
                itemContainer.y =generateRandomInt(0, app.screen.height / 2);

                const item = {
                    isCheck: false,
                    container: itemContainer,
                    skin: symbol,
                    animSymbol,                  
                    animate(){
                       this.animSymbol.visible = true;
                       this.animSymbol.play();
                    }
                }    

                this.gameItems.push(item);
                gameAreaContainer.addChild(itemContainer);
          }
       
        gameAreaContainer.y = app.screen.height / 2;
        gameAreaContainer.x = app.screen.width / 2 - 100;
        gameAreaContainer.pivot.set(gameAreaContainer.width / 2, gameAreaContainer.height / 2);
        this.gameSceneContainer.addChild(gameAreaContainer);
    }


    getGameSceneContainer() {
        return this.gameSceneContainer;
    }

    getGameItems() {
        return this.gameItems;
    }
 
    visibleGameScene() {
        this.gameSceneContainer.visible = true;
    }

    hiddenGameScene() {
        this.gameSceneContainer.visible = false;
    }

}