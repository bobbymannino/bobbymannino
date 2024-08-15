<script lang="ts">
    import AboutSection from "./sections.about.svelte";
    import TechSection from "./sections.tech.svelte";
    import ProjectsSection from "./sections.projects.svelte";
    import ContactSection from "./sections.contact.svelte";
    import Meta from "$components/meta.svelte";
    import { onMount } from "svelte";

    onMount(() => {
         console.info("%c bobman.dev", "font-weight:900;font-size:2.5rem;color:white;background-color:blue")
         console.warn("%c i dont think you should be here!", "font-size:1.2rem;background-color:amber")
    })
</script>

<Meta title="Bobby Mannino" description="Software Engineering Undergraduate" />

<AboutSection />
<TechSection />
<ProjectsSection />
<ContactSection />
