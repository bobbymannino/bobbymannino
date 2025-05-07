<script lang="ts">
  type Props = {
    title: string;
    publishedOn: Date;
    readingTime: number;
  };

  let { title, publishedOn, readingTime }: Props = $props();
</script>

<div
  style="width: 738px; text-align: right; height: 360px; background-color: white; border-bottom: 36px solid #0675ff; display: flex; flex-direction: column; align-items: flex-end; justify-content: flex-end; gap: 8px; padding: 16px;"
>
  <div
    style="display: flex; color: #0675ff; position: absolute; left: 8px; top: 8px;"
  >
    {@render note("bobman.dev")}
  </div>
  {@render heading1(title)}
  {@render paragraph(`${publishedOn.toLocaleDateString()} • ${readingTime} min read • By Bobby Mannino`)}
</div>

{#snippet heading1(text: string)}
  <span style="font-weight: 800; font-size: 50px; color: #0675ff;">
    {text}
  </span>
{/snippet}

{#snippet paragraph(text: string)}
  <span style="font-size: 20px;">
    {text}
  </span>
{/snippet}

{#snippet note(text: string)}
  <span style="font-size: 15px;">
    {text}
  </span>
{/snippet}
