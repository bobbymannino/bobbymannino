---
title: "Why use a VPS?"
publishedOn: 2024-12-30
slug: "why-use-a-vps"
tagline: "Why you should use a VPS"
tags: ["vps", "hosting", "postgres"]
---

# Why use a VPS?

Before I was aware of VPS's I used netlify and Vercel to host any sites, I also
used things like Supabase and Firebase for databases. It didn't cost much
because I wasn't actually using a lot, bandwidth wasn't a worry, storage was not
a worry, nor was speed.

Once I had started using more resources up it was clear to me I needed a
solution that works for me, not too expensive as i'm still not using that much
but more then the free version, and with more freedom to do what I want.

And then I stumbled upon [Digital Ocean
Droplets](https://www.digitalocean.com/products/droplets). They seemed to solve
all the issues I was having. A Virtual Private Server (VPS) is essentially a
computer that you have access to, but it is stored elsewhere (like cloud
storage). You can then access the computer via ssh and do with it as you please.
Depending on the provider you can have a linux OS or a window OS - usually
costing a bit more for windows.

Once I had my linux VPS spun up I installed [Coolify](https://coolify.io) and
from there it was as easy a 3 clicks to get a new postgres instance, or connect
my GitHub account to build and deploy a SvelteKit application on each repo push.

The bandwidth is more then enough, it costs next to nothing, and I am not
limited to a certain vendor. I have the choice to install whatever software I
would like, if analytics are what i'm after, I can start a
[Umami](https://umami.is) and there are no limits, even docker containers can be
ran. A VPS is exactly what I need.
