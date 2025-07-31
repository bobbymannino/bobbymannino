---
title: "Popular Open Source Licenses Explained"
publishedOn: 2025-07-31
tagline: "What are open source licenses and what are the differences?"
tags: ["licenses"]
---

# Popular Open Source Licenses Explained

## What is a License

A license (in the context of software) is a legal agreement that defines how a
piece of software can be used, modified or distributed. A license will tell you
what you are/are not allowed to do with the code as well as any obligations
(such as crediting).

## License Types

There are 2 different license types; **closed** and **open**.

Closed licenses often restrict usage, disallow modification and disallow
sharing, an example of this would be Microsoft Office or Adobe software.

Open source (OS) licenses generally allow users to use/modify/distribute the
code with few (if any) restrictions. Different OS licenses will impose different
restrictions at different levels.

## Common Open Source Licenses

### MIT License

The MIT license, created by the Massachusetts Institute of Technology (MIT), is
the most used license on GitHub by repository count. This license allows you do
anything (use, copy, modify, publish, distribute, sublicense, and/or sell copies
of the software) with only 2 conditions:

- You must include the original MIT license in your project
- You must include the original copyright notice in your project

Note: The MIT license is a very short license with only 3 small paragraphs.

### Apache License 2.0

The Apache 2.0 license, developed by Apache Software Foundation, is similar to
MIT but with a few added restrictions:

- You must include the original license in your project
- You must include the original copyright notice in your project
- If the original project has a NOTICE file you must include that too (if you
  make modifications you may add your own attribution to that file)

Apache 2.0 license also allows for patent grants which means that any patents
that are necessary for the software to function are granted to the user. For
example, if you are using a video encoding library that has a patented mp4
encoding algorithm, you are granted the right to use it without fear of patent
infringement.

Another strong reason for this license is the way it handles legally suing for
any patent infringement. If you try to sue someone for using software that is
under the Apache 2.0 license you will lose all rights to the software. This
allows for a high trust level in the community.

### GNU General Public License (GPL) v3

This license is slightly different, instead it is a **copyleft** license which
means it's designed to not just give you the freedoms to do what you wish but
ensure that any software made from it is also open source. This means that you
**cannot** use it in proprietary software. You may still sell something that
runs on top of the software but you cannot sell the software itself.

You must still credit the original authors and include the original license in
your project. If the original project has a NOTICE file you must include that
too.

Note: Sometimes this will put developers off using the software as it requires
there code to be open source.

## Which To Use When Creating Software

Use MIT when you are:

- Wanting your software to be adopted as quickly as possible (due to the low
  restrictions)

Use Apache 2.0 when you are:

- Creating software that has patented technology

Use GNU GPL v3 when you are:

- Building software and want to allow that software to only be used
  in open source projects
- Keeping the code open source forever
- Protect against any future patents and putting a price on the code
