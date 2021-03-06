import BasicModel from './BasicModel';

export default class extends BasicModel {

    constructor(name, scene) {
        super(name, scene);

        this.rUp = 0;
        this.gUp = 1;
        this.bUp = 0;

        this.mainMesh = BABYLON.Mesh.CreateBox(name, 1, scene);
        this.mainMesh.scaling = new BABYLON.Vector3.Zero();
        this.mainMesh.material = new BABYLON.StandardMaterial('meterial', this.scene);
        this.mainMesh.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1);

        this.mainMesh.material.specularColor = new BABYLON.Color4(1, 1, 1, 1);
        this.mainMesh.material.useGlossinessFromSpecularMapAlpha = true;

        this.meshes = [];
        let index = 0;
        for(let x = -20; x<20; x+=0.8) {
            for(let z = -20; z<20; z+=0.8) {

                let iMesh = this.mainMesh.createInstance('foo');
                iMesh.position.x = x;
                iMesh.position.z = z;
                iMesh.position.y = (Math.abs(x) + Math.abs(z))/10;
                console.log(iMesh.position.y);

                iMesh.scaling = new BABYLON.Vector3(1, 1, 1);
                iMesh.rotation.x += index/500;
                this.meshes.push(iMesh);

                index++;
            }
        }

    }

    update(delta, time) {

        this.mainMesh.material.diffuseColor.r = Math.sin(time + 0)/3 + 0.3;
        this.mainMesh.material.diffuseColor.g = Math.sin(time + 2)/3 + 0.3;
        this.mainMesh.material.diffuseColor.b = Math.sin(time + 4)/3 + 0.3;


        _.each(this.meshes, (mesh, index) => {
            //mesh.rotation.x += delta/2;
            //mesh.rotation.y += delta/5;

            mesh.rotation.x += (Math.sin(time + 4)/3)/10;
            mesh.rotation.y += (Math.sin(time + 4)/3)/10;


            mesh.scaling.y = Math.cos(index)/2 + 0.5;
            mesh.scaling.x = Math.sin(index)/2 + 0.5;

            delta += 0.000005;
        })
    }
}