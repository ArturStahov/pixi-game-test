// import { GlowFilter } from 'pixi-filters';
import soundPlay from '../assets/sound/runPlay.mp3';
import soundsWin from '../assets/sound/won.mp3';
import soundsClick from '../assets/sound/click.mp3';
import soundBg from '../assets/sound/Sound_fon.mp3';

import Loader from '../utils/loader.js';

import ButtonPlay from './components/ButtonPlay.js';
import GameScene from './scenes/GameScene.js';
import WinScenes from './scenes/WinScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import app from './appConfig.js'
import { gameProperty } from "./gameProperty.js";

// const filterGlow = new GlowFilter({ innerStrength: 3, outerStrength: 10, color: 0xffffff });


export class Game {
    constructor() {
        //scenes
        this.gameScene = null;
        this.preloadScene = null;
        this.winScene = null;
       
        this.buttonPlay = null; 
        //props     
        this.isLoadingGame = true;
        this.isWinGame = true;
        this.timeLoadingGame = gameProperty.TIME_SCENE_PRELOAD;
        this.timeWinGame = gameProperty.TIME_SCENE_WIN;
        
        this.state = null;
        //sound
        this.soundWin = new Audio(soundsWin);
        this.soundClick = new Audio(soundsClick);
        this.soundPlay = new Audio(soundPlay);
        this.soundBg = new Audio(soundBg);

        this.load();
    }

    load() {
        Loader.loadAllTextures(() => {
            this.start();
        });
    }

    init(){
        const pixiCanvas=document.querySelector('#pixi-canvas');

        if(pixiCanvas){
            pixiCanvas.appendChild(app.view);
        }
    }

    start() {
        this.init();
                
        //initialize game scene
        this.gameScene = new GameScene();
        const gameSceneContainer = this.gameScene.getGameSceneContainer();
        
        //initialize button Play
        this.buttonPlay = new ButtonPlay();
        const buttonPlayContainer = this.buttonPlay.getButtonPlayContainer();
        buttonPlayContainer.x=(app.screen.width / 2)-(buttonPlayContainer.width / 2);
        buttonPlayContainer.y=app.screen.height - 150;
        buttonPlayContainer.on('pointerdown', this.handlerClickPlay.bind(this));
        gameSceneContainer.addChild(buttonPlayContainer);

        //initialize win scene
        this.winScene = new WinScenes();
        const winSceneContainer = this.winScene.getSceneContainer();   
        this.winScene.hiddenScene();

        //initialize preloadScene
        this.preloadScene = new PreloadScene();
        const preloadSceneContainer = this.preloadScene.getPreloadSceneContainer();
        this.preloadScene.visiblePreloadingScene();

        this.gameScene.hiddenGameScene();
      
        app.stage.addChild(gameSceneContainer);
        app.stage.addChild(winSceneContainer);
        app.stage.addChild(preloadSceneContainer);

        this.soundBg.play();
        this.soundBg.loop = true;

        this.state = this.update;
        app.ticker.add(delta => this.gameLoop(delta));
    }

    //game event preloading event
    eventPreloadingGame() {
        if (this.isLoadingGame) {
            this.timeLoadingGame -= 1;
        } else {
            return;
        }

        if (this.timeLoadingGame == 0) {
            this.isLoadingGame = false;
            this.preloadScene.hiddenPreloadingScene();
            this.gameScene.visibleGameScene();
        }
    }


     //game event Win
     eventWinGame() {
        if (this.isWinGame) {
            this.gameScene.hiddenGameScene();
            this.winScene.visibleScene();
        }
    }

    //Button Play handler
    handlerClickPlay() {
            window.location = gameProperty.REDIRECT_URL;
    }
   
    gameLoop(delta) {
        this.state(delta);
    }

    update() {
        this.eventPreloadingGame();
        this.eventWinGame();
    } 
}

