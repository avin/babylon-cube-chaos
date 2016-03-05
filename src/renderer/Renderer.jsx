import _ from 'lodash';

//Scenes
import DemoScene from './scenes/demo-scene/DemoScene';

export default class {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.engine.renderer = this;

        //Сцены
        this.scenes = {};
        this.scenes.demo = new DemoScene(this.engine);

        this.activeScene = null;

        //Событие изменения размера канваса
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    /**
     * Запуск рендерлупа для сцены
     * @param scene
     * @private
     */
    _runRenderLoop(scene) {
        //Останавливаем рендер-луп для всех сцен
        this.engine.stopRenderLoop();

        //Включаем рендер-луп для заданной сцены
        if (scene) {
            this.engine.runRenderLoop(() => {
                scene.render();
            });
        }
    }

    /**
     * Назначение активной сцены
     * @param sceneName
     */
    setActiveScene(sceneName) {
        //Сначала отключаем управление всеми сценами
        _.each(this.scenes, (scene) => {
            scene.disableControl();
        });

        //Вешаем управление на сцену и запускаем её рендер-луп
        if (this.scenes[sceneName]) {
            this.activeScene = this.scenes[sceneName];
            this.activeScene.enableControl();
            this._runRenderLoop(this.activeScene);
        }
    }
}