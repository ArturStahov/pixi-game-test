import soundsClick from '../assets/sound/click.mp3';
import soundBg from '../assets/sound/sound_bg.mp3';
import Loader from '../utils/loader.js';
import ButtonPlay from './components/ButtonPlay.js';
import GameScene from './scenes/GameScene.js';
import WinScenes from './scenes/WinScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import app from './appConfig.js'
import  gameProperty  from "./gameProperty.js";

export class Game {
    constructor() {
        //scenes
        this.gameScene = null;
        this.preloadScene = null;
        this.winScene = null;
       
        this.buttonPlay = null; 
        //props     
        this.isLoadingGame = true;
        this.isWinGame = false;
        this.winCount = 0;
        this.timeLoadingGame = gameProperty.TIME_SCENE_PRELOAD;
        this.timeStartWinSceneAnim = gameProperty.WIN_SCENE_START_ANIM;
        this.timeWinSceneView = gameProperty.WIN_SCENE_VIEW_TIME;
        this.triggerStartAnim = false;
        this.triggerStartWin = false;
        this.state = null;
        //sound
        this.soundClick = new Audio(soundsClick);
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
        this.gameScene.generateGameArea();
        
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

        //add event on items
        const arrayGameItems=this.gameScene.getGameItems();
        arrayGameItems.forEach(item =>{
            item.container.interactive = true;
            item.container.buttonMode = true;
            item.container.on('pointerdown', this.eventClickedItem.bind(this));
            item.container.refItem=item;
        });
 
        app.stage.addChild(gameSceneContainer);
        app.stage.addChild(winSceneContainer);
        app.stage.addChild(preloadSceneContainer);
      
        this.soundBg.play();
        this.soundBg.loop = true;

        this.state = this.update;
        app.ticker.add(delta => this.gameLoop(delta));
    }

    eventClickedItem(event) {
       const item = event.currentTarget;

       if(!item.refItem.isCheck) {
        item.refItem.animate();     
        this.soundClick.play();
        this.winCount += 1;
        item.refItem.isCheck = true;
       }

       if(this.winCount == gameProperty.WIN_COUNT) {
         this.isWinGame = true;
       }
    }

    //game event preloading 
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
            if(!this.triggerStartWin){
                this.timeWinSceneView -= 1;
            }

            if(this.timeWinSceneView == 0){
                this.gameScene.hiddenGameScene();
                this.winScene.visibleScene();
                this.triggerStartWin = true;
            }
            
            this.timeStartWinSceneAnim -= 1;

            if(this.timeStartWinSceneAnim == 0){
                this.triggerStartAnim = true;
            }

            if(this.triggerStartAnim){
                this.winScene.animateButtonPlay();
            }
        }
    }
    handlerClick(){
        this.soundClick.play();
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

