<script lang="ts">
  import World from "$lib/3d-models/world.svelte";
  import { T, useTask } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";

  let rotationX = 0,
    rotationY = 0;

  useTask((delta) => {
    rotationX += delta * 0.1;
    rotationY += delta * 0.05;
  });
</script>

<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
  <OrbitControls enableDamping enableZoom={false} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={3} />
<T.DirectionalLight intensity={3} position={[100, 100, -100]} />

<T.Group scale={4} rotation.x={rotationX} rotation.y={rotationY}>
  <World />
</T.Group>
