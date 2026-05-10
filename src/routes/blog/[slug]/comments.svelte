<script lang="ts">
  import Giscus from "@giscus/svelte";
</script>

<!-- <script
    src="https://giscus.app/client.js"
    data-repo="bobbymannino/bobbymannino"
    data-repo-id="R_kgDOMjo6Dg"
    data-category="General"
    data-category-id="DIC_kwDOMjo6Ds4CsLF7"
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="bottom"
    data-theme="preferred_color_scheme"
    data-lang="en"
    data-loading="lazy"
    crossorigin="anonymous"
    async
  >
  </script> -->

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
  />
</section>
