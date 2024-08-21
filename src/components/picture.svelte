<script lang="ts">
    type Props = {
        /**
         * Do not include the extension
         * @example /images/lego-me
         */
        src: string;
        alt: string;
        /**
         * @default ""
         */
        class?: string;
    };
    let { src, alt, class: classname = "" }: Props = $props();
</script>

<!--
@component
This picutre components uses the src prop to
server the best img format for the browser.
-->

<picture class="block">
    <source srcset="{src}.avif" />
    <source srcset="{src}.webp" />
    <source srcset="{src}.heic" />
    <source srcset="{src}.jpg" />
    <img src="{src}.jpg" {alt} class={classname} loading="lazy" />
</picture>
