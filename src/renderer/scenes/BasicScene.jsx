export default class extends BABYLON.Scene {


    constructor(engine) {

        super(engine);

        this.renderer = engine.renderer;

        //Объект управления
        this.control = null;

        //Каталог загружаемых моделей
        this.models = [];

        //Загрузчик ресурсов
        this.loader = new BABYLON.AssetsManager(this);

        //Внутренее время сцены
        this.time = 0.0;

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
     * Показать дебаг-панель BABYLON
     */
    showDebug(){
        this.debugLayer.show();
    }

    /**
     * Спрятать дебаг-панель BABYLON
     */
    hideDebug(){
        this.debugLayer.hide();
    }


    /**
     * Оптимизация ФПС
     */
    optimizeFPS() {
        BABYLON.SceneOptimizer.OptimizeAsync(this, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(50),
            () => {
                console.log('Optimized ModerateDegradation');
            },
            () => {
                BABYLON.SceneOptimizer.OptimizeAsync(this, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(40),
                    () => {
                        console.log('Optimized by HighDegradation');
                    },
                    () => {
                        console.log('Bad FPS!!!');
                    });
            });
    }

}