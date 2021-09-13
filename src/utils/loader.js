import * as PIXI from "pixi.js";
import '../assets/spriteSheet.json';
import '../assets/spriteMap.png';

class Loader {
    static loadAllTextures(callback) {
        const loaders = new PIXI.Loader();
        loaders.add('./assets/spriteSheet.json')
        loaders.load(() => {
            callback();
        });
    }

}

export default Loader;