<script lang="ts">
  import Meta from "$components/meta.svelte";
  import World from "./world.svelte";
  import { Canvas } from "@threlte/core";
</script>

<Meta title="World | Bobby Mannino" description="A very simple 3d world" />

<Canvas>
  <World />
</Canvas>
