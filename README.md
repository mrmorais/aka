# aka
A simple open-source (of course) URL shortener

This is a "why not" personal, special, project created because I become upseted by not been allowed to use https://aka.ms Microsoft URL shortener. So, I found suitable create my own aka. Here it is.

That aka expose a useful API for quickly generate a URL, even through terminal. Here's how you should use my aka:

```
curl -d slug=google -d url=https://google.com http://udnmg.com/aka
```

It will responde wit:

```json
{ error: false, aka: 'http://udnmg.com/aka/google' }
```

Or...

```json
{ error: true, aka: null }
```

That simple.