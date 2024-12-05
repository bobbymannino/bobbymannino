<script lang="ts">
    import AboutSection from "./sections.about.svelte";
    import TechSection from "./sections.tech.svelte";
    import ProjectsSection from "./sections.projects.svelte";
    import ContactSection from "./sections.contact.svelte";
    import Meta from "$components/meta.svelte";
    import { onMount } from "svelte";
    import { prefersReducedMotion } from "svelte/motion";
    import { inView, animate } from "motion";

    onMount(() => {
        console.log(
            "%cbobman.dev",
            "font-weight:900;font-size:2.5rem;color:#0675ff",
        );
        console.log("%cyou found me!", "font-size:1rem;color:green");
    });

    onMount(() => {
        inView("section", (info) => {
            animate(
                info.target,
                { scale: prefersReducedMotion.current ? 1 : [0.4, 1] },
                { ease: "circInOut" },
            );

            return () =>
                animate(
                    info.target,
                    { scale: prefersReducedMotion.current ? 1 : 0.4 },
                    { duration: 0 },
                );
        });
    });
</script>

<Meta title="Bobby Mannino" description="Software Engineering Undergraduate" />

<AboutSection />
<TechSection />
<ProjectsSection />
<ContactSection />

<style>
    :global(section) {
        @media (prefers-reduced-motion: no-preference) {
            transform: scale(0.4);
        }
    }
</style>
