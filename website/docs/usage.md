# Getting Started

## Generate an RSS Feed

To subscribe to a Twitter user's timeline, first look at the route document of [Twitter User Timeline](/routes/social-media#twitter-user-timeline).

`/twitter/user/:id` is the route where `:id` is the actual Twitter username you need to replace. For instance, `/twitter/user/khulnasoft-lab` with a prefix domain name will give you the timeline of Twitter user khulnasoft-lab.

The demo instance will generate an RSS feed at `https://rsshub.app/twitter/user/khulnasoft-lab`, use your own domain name when applicable. This feed should work with all RSS readers conforming to the RSS Standard.

You can replace the domain name `https://rsshub.app` with your [self-hosted instance](/install) or any [public instance](/instances).

FEEDy supports additional parameters such as content filtering and full-text extraction, refer to [Parameters](/parameter) for details.

## Contribute a New Route

Our thriving community is the key to FEEDy's success, we invite everyone to join us and [contribute new routes](/joinus/quick-start) for all kinds of interesting sources.

## Use as a npm Package

Apart from serving as an information source hub, FEEDy is also made compatible with all Node.js projects as an npm Package.

### Install

<Tabs>
<TabItem value="pnpm" label="pnpm" default>

```bash
pnpm add rsshub
```

</TabItem>
<TabItem value="yarn" label="yarnv1">

```bash
yarn add rsshub
```

</TabItem>
<TabItem value="npm" label="npm">

```bash
npm install rsshub --save
```

</TabItem>
</Tabs>

### Usage

```js
const FEEDy = require('rsshub');

FEEDy.init({
    // config
});

FEEDy.request('/youtube/user/JFlaMusic')
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });
```

For supported configs please refer to the [Configuration Section](/install/config).

A short example for disabling caching can be written as:

```js
{
    CACHE_TYPE: null,
}
```

## Radar

In addition to the two functions of generating RSS and obtaining data, FEEDy also provides a Radar function, which is used to map website addresses to FEEDy addresses.

### Configuration file

Radar has two types of configuration files, one is a full-featured [js file](https://github.com/khulnasoft-lab/feedy/blob/gh-pages/build/radar-rules.js), and the other is a simplified [json file]((https://github.com/khulnasoft-lab/feedy/blob/gh-pages/build/radar-rules.json)).

### Usage

You need to use supported browser extensions, mobile apps, RSS readers, or other tools to use the Radar feature. Please refer to the documentation of the corresponding tool for specific usage instructions.

- Browser extension: [FEEDy Radar](https://github.com/khulnasoft-lab/feedy-Radar)

- iOS app: [RSSBud](https://github.com/Cay-Zhang/RSSBud)

- Android app: [RSSAid](https://github.com/LeetaoGoooo/RSSAid)

- RSS Reader: Coming soon
