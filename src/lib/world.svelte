<script lang="ts">
  import Meta from "$components/meta.svelte";
  import { onMount } from "svelte";
  import * as Three from "three";
  import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
  import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

  let div: HTMLDivElement;
  let world: Three.Group;
  let scene: Three.Scene;
  let camera: Three.PerspectiveCamera;
  let renderer: Three.WebGLRenderer;
  let controls: OrbitControls;

  onMount(() => {
    scene = new Three.Scene();

    camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    renderer = new Three.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    div.appendChild(renderer.domElement);

    const ambientLight = new Three.AmbientLight(0xffffff, 10);
    scene.add(ambientLight);

    const directionalLight = new Three.DirectionalLight(0xffffff, 0.67);
    directionalLight.position.set(100, 100, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    camera.position.z = 5;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;

    const mtlLoader = new MTLLoader();
    mtlLoader.load("models/world/world.mtl", (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load("models/world/world.obj", (loadedWorld) => {
        world = loadedWorld;

        calcWorldSize();

        scene.add(world);
      });
    });

    renderer.setAnimationLoop(animate);
  });

  function calcWorldSize() {
    if (!world) return;

    const vmin = Math.min(window.innerWidth, window.innerHeight);
    const targetSizeInPx = vmin * 0.7; // 70vmin

    const box = new Three.Box3().setFromObject(world);
    const size = box.getSize(new Three.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    const scale = targetSizeInPx / (maxDimension * 100);
    world.scale.set(scale, scale, scale);
  }

  function animate() {
    if (world) {
      world.rotation.x += 0.001;
      world.rotation.y += 0.0013;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  function onresize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
</script>

<Meta title="World | Bobby Mannino" description="A very simple 3d world" />

<div bind:this={div}></div>
<svelte:window {onresize} />

<!-- TODO make the light fixed on orbit -->
<!-- TODO make it responsive for all devices -->
<!-- TODO optimize -->
