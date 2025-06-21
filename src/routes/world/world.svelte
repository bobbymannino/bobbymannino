<script lang="ts">
  import World from "$lib/3d-models/world.svelte";
  import { T, useTask } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";

  let rotationX = $state(0),
    rotationY = $state(0);

  useTask((delta) => {
    rotationX += delta * 0.12;
    rotationY += delta * 0.07;
  });
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 10]}>
  <OrbitControls enableDamping enableZoom={false} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={3} />
<T.DirectionalLight intensity={3} position={[10, 10, 0]} />

<World rotation.x={rotationX} rotation.y={rotationY} />
