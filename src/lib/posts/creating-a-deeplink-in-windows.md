---
title: "Creating a Deep-link in Windows"
publishedOn: 2025-07-29
tagline: "What is white/black/gray box testing?"
tags: ["deep-links"]
---

# Creating a Deep-link in Windows

## What is a Deep-link

A deep-link is a URL that allows you to navigate directly to a specific page or
resource within an application. You can use deep-links to access pages from a
browser such as typing `music://` in your browser will open your music app. That
is a deep-link. There are many built-in deep-links ot your device but you also
have the option to create your own.

You can also pass in data to your deep-link to open a certain page up or do a
certain action such as `music://quinn-xcii/straightjacket`.

## How to Create a Deep-link

To create a deep-link in **Windows**, you will need to add 2 values in the
registry.

The first one is to define the protocol handler for your deep-link.
This is done by creating a new key under `HKEY_CLASSES_ROOT` with the name of
your protocol (e.g., `yourapp://`). Inside this key, create a string value named
`URL Protocol` with an empty string as its data.

The second thing is to define the application path so that when the url is
called it opens the correct application. You can do this by settings a string in `\<your-app>\shell\open\command`. The strings key empty but value should be `"\path\to\your\app.exe" "%1"`.

In the end you should have a registry that includes these entries:

```reg
[HKEY_CURRENT_USER\Software\Classes\yourapp]
@="URL:yourapp"
"URL Protocol"=""

[HKEY_CURRENT_USER\Software\Classes\yourapp\shell]

[HKEY_CURRENT_USER\Software\Classes\yourapp\shell\open]

[HKEY_CURRENT_USER\Software\Classes\yourapp\shell\open\command]
@="\"C:\\Users\\me\\app.exe\" \"%1\""
```

Note: If you do not have access to `HKEY_CLASSES_ROOT`, you can use the
`HKEY_CURRENT_USER` and prepend each key with `\Software\Classes` like in the
example.

The `%1` is there as a placeholder for the URL that was passed to the
application (e.g. it would be `yourapp://quinn-xcii/straightjacket`).

---

## Resources

[Delphi Deep-links Demo
Repo](https://github.com/bobbymannino/delphi-vcl-deeplinks-demo)
