<script lang="ts">
  import Giscus from "@giscus/svelte";

  let theme = $state<"light" | "dark">("light");

  $effect(() => {
    const root = document.documentElement;
    const update = () => {
      theme = root.classList.contains("dark") ? "dark" : "light";
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  });
</script>

<section class="card space-y-4">
  <h2 id="comments"><a href="#comments" class="hover:underline">Comments</a></h2>

  <Giscus
    id="giscus-comments"
    term="Comments"
    mapping="pathname"
    repo="bobbymannino/bobbymannino"
    category="Blog"
    loading="lazy"
    strict="0"
    emitMetadata="0"
    reactionsEnabled="0"
    categoryId="DIC_kwDOMjo6Ds4C8tmA"
    repoId="R_kgDOMjo6Dg"
    {theme}
  />
</section>
