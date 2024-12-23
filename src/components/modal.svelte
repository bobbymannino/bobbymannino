<script lang="ts">
  import type { Snippet } from "svelte";

  let isMetaKeyPressed = $state(false);
  let dialog: HTMLDialogElement;

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Meta") isMetaKeyPressed = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Meta") isMetaKeyPressed = true;

    if (isMetaKeyPressed && event.key === "k") {
      dialog.showModal();

      onopen?.();
    }
  }

  export function close() {
    dialog.close();
  }

  type Props = {
    children: Snippet;
    onopen?: () => void;
    onclose?: () => void;
  };

  let { children, onopen, onclose }: Props = $props();
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<dialog
  {onclose}
  bind:this={dialog}
  class="w-full max-w-full bg-transparent pt-6 backdrop:bg-black/50"
>
  <div class="mx-auto w-full max-w-prose bg-zinc-50 p-6 dark:bg-zinc-800">
    {@render children()}
  </div>
</dialog>
