# aka
A simple open-source URL shortener

Aka exposes a useful API for quickly generate a URL, even through terminal. Here's how you should use aka:

```
curl -d slug=google -d url=https://google.com http://udnmg.com/aka
```

It will return:

```js
{ error: false, aka: 'http://udnmg.com/aka/google' }
```

Or...

```js
{ error: true, aka: null }
```

That simple.
