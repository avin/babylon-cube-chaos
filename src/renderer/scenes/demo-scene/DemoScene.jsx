import BasicScene from '../BasicScene';

import PlayerCamera from './cameras/PlayerCamera';
import MainLight from './lights/MainLight';
import CameraLight from './lights/CameraLight';

//Models
import Box from './models/Box';


export default class extends BasicScene {


    constructor(engine) {

        super(engine);

        this.name = 'demo';

        this._init();
    }

    _init() {
        //Цвет фона
        this.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

        //this.optimizeFPS();

        this._initCameras();
        this._initLights();
        this._initControl();

        //Загружаем 3д модели
        this.loader.onFinish = () => {

            this.executeWhenReady(() => {
                this.renderer.setActiveScene(this.name);
            });

            this._initContent();

        };

        this.loader.load();

        this.disableControl();
    }

    /**
     * Инициализация камер
     * @private
     */
    _initCameras() {
        //Главная камера
        let playerCameraOptions = {};
        this.playerCamera = new PlayerCamera('PlayerCamera', new BABYLON.Vector3(0.0, 0.0, 0.0), this, playerCameraOptions);
        this.activeCameras.push(this.playerCamera);

        //Привязываем управление к камере
        this.playerCamera.attachControl(this.getEngine().getRenderingCanvas(), false);

        //Через эту камеру будут производиться действия с элементами
        this.cameraToUseForPointers = this.playerCamera;
    }

    /**
     * Инициализация светильников
     * @private
     */
    _initLights() {
        let mainLightOptions = {};
        this.mainLight = new MainLight('MainLight', new BABYLON.Vector3(-1, -1, 1), this, mainLightOptions);

        let cameraLightOptions = {};
        this.cameraLight = new CameraLight('cameraLight', new BABYLON.Vector3(1, 10, 1), this, cameraLightOptions);
    }

    /**
     * Инициализация содержимого сцены
     * @private
     */
    _initContent() {

        //Создаем объекты сцены
        this.models.push(new Box('box', this));


        this.beforeRender = () => {
            let delta = this.getEngine().getDeltaTime() / 1000.0;
            this.time += delta;

            this._update(delta, this.time);
        };
    }

    /**
     * Инициализация управления
     * @private
     */
    _initControl() {
        //this.control = new Control(this);
    }


    /**
     * Отключить управление камеры
     */
    disableControl() {
        this.activeCamera.detachControl(this.getEngine().getRenderingCanvas());
    }

    /**
     * Включить управление камеры
     */
    enableControl() {
        this.activeCamera.attachControl(this.getEngine().getRenderingCanvas(), false);
    }


    /**
     * Функция отвечающая за инициализацию покадровых действий
     * @param delta
     * @param time
     * @private
     */
    _update(delta, time) {

        _.each(this.models, (model) => {
            model.update(delta, time);
        });

        this.clearColor.r = Math.cos(time/2 + 0)/3 + 0.6;
        this.clearColor.g = Math.cos(time/2 + 2)/3 + 0.6;
        this.clearColor.b = Math.cos(time/2 + 4)/3 + 0.6;

        this.playerCamera.position.x = Math.cos(time/10)*10;
        this.playerCamera.position.z = Math.sin(time/10)*10;
        this.playerCamera.position.y = Math.cos(time/5)*5 + 7;

        this.playerCamera.setTarget(new BABYLON.Vector3(0,0,0));
    }


}