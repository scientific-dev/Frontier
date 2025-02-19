import * as THREE from "three";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare";
import {
    GodRaysEffect,
    EffectComposer,
    EffectPass,
    RenderPass,
    KernelSize,
    BlendFunction,
    BloomEffect,
} from "postprocessing";

export default class SUN {

    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.name = "sun";
        this.camera = camera;
        this.renderer = renderer;
        this.composer = new EffectComposer(renderer);
        this.symbol = "☉";
        this.color = 0xfff93e;
    }

    get zaxis() {
        return 3200;
    }

    init() {
        let sunGeometry = new THREE.SphereGeometry(10, 32, 32);
        let sunMaterial = new THREE.MeshPhongMaterial({
            color: 0xfff93e,
            emissive: 0xfff93e,
            map: new THREE.TextureLoader().load(window.location.pathname + "assets/sun_main.jpg"),
        });

        let sunSphere = new THREE.Mesh(sunGeometry, sunMaterial);
        let godRaysEffect = new GodRaysEffect(this.camera, sunSphere, {
            resolutionScale: 0.75,
            kernelSize: KernelSize.SMALL,
            density: 0.96,
            decay: 0.93,
            weight: 0.8,
            exposure: 0.55,
            samples: 60,
            clampMax: 1.0,
            blendFunction: BlendFunction.SCREEN,
        });
        
        godRaysEffect.dithering = true;
        let bloomEffect = new BloomEffect({
            blendFunction: BlendFunction.SCREEN,
            kernelSize: KernelSize.MEDIUM,
            resolutionScale: 0.5,
            distinction: 3.8,
        });

        bloomEffect.blendMode.opacity.value = 2.5;
        let effectPass = new EffectPass(this.camera, bloomEffect, godrayseffect);
        effectPass.renderToScreen = true;
    
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        this.composer.addPass(effectPass);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    
        let focuslight = new THREE.PointLight(0xffffff, 1, 0);
        focuslight.position.set(0, 0, 0);

        let textureLoader = new THREE.TextureLoader();
        let textureFlare3 = textureLoader.load("assets/lensflare3.png");
        let lensflare = new Lensflare();
    
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));

        focuslight.add(lensflare);
        focuslight.add(sunSphere);
    
        this.scene.add(focuslight);
        this.sunSphere = sunSphere;
        this.composer.render(this.scene, this.camera);

        return this;
    }

    render() {
        // this.renderer.render(this.scene,this.camera)
        this.composer.render(this.scene, this.camera);
    }

}
