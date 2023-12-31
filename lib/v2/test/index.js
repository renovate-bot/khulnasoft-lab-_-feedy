const config = require('@/config').value;
const got = require('@/utils/got');
const wait = require('@/utils/wait');

let cacheIndex = 0;

module.exports = async (ctx) => {
    if (ctx.params.id === 'error') {
        throw Error('Error test');
    }
    if (ctx.params.id === 'httperror') {
        await got({
            method: 'get',
            url: 'https://httpbingo.org/status/404',
        });
    }
    let item = [];
    if (ctx.params.id === 'filter') {
        item = [
            {
                title: 'Filter Title1',
                description: 'Description1',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                link: `https://github.com/khulnasoft-lab/feedy/issues/-1`,
                author: `khulnasoft-lab0`,
                category: ['Category0', 'Category1'],
            },
            {
                title: 'Filter Title2',
                description: 'Description2',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                link: `https://github.com/khulnasoft-lab/feedy/issues/0`,
                author: `khulnasoft-lab0`,
                category: ['Category0', 'Category1', 'Category2'],
            },
            {
                title: 'Filter Title3',
                description: 'Description3',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                link: `https://github.com/khulnasoft-lab/feedy/issues/1`,
                author: `khulnasoft-lab0`,
                category: 'Category3',
            },
        ];
    } else if (ctx.params.id === 'filter-illegal-category') {
        item.push({
            title: 'TitleIllegal',
            description: 'DescriptionIllegal',
            pubDate: new Date(`2019-3-1`).toUTCString(),
            link: `https://github.com/khulnasoft-lab/feedy/issues/1`,
            author: `khulnasoft-lab0`,
            category: [1, 'CategoryIllegal', true, null, undefined, { type: 'object' }],
        });
    } else if (ctx.params.id === 'long') {
        item.push({
            title: `Long Title `.repeat(50),
            description: `Long Description `.repeat(10),
            pubDate: new Date(`2019-3-1`).toUTCString(),
            link: `https://github.com/khulnasoft-lab/feedy/issues/0`,
            author: `khulnasoft-lab0`,
        });
    } else if (ctx.params.id === 'cache') {
        const description = await ctx.cache.tryGet(
            'test',
            () => ({
                text: `Cache${++cacheIndex}`,
            }),
            config.cache.routeExpire * 2
        );
        item.push({
            title: 'Cache Title',
            description: description.text,
            pubDate: new Date(`2019-3-1`).toUTCString(),
            link: `https://github.com/khulnasoft-lab/feedy/issues/0`,
            author: `khulnasoft-lab0`,
        });
    } else if (ctx.params.id === 'refreshCache') {
        let refresh = await ctx.cache.get('refreshCache');
        let noRefresh = await ctx.cache.get('noRefreshCache', false);
        if (!refresh) {
            refresh = '0';
            await ctx.cache.set('refreshCache', '1');
        }
        if (!noRefresh) {
            noRefresh = '0';
            await ctx.cache.set('noRefreshCache', '1', undefined);
        }
        item.push({
            title: 'Cache Title',
            description: refresh + ' ' + noRefresh,
            pubDate: new Date(`2019-3-1`).toUTCString(),
            link: `https://github.com/khulnasoft-lab/feedy/issues/0`,
            author: `khulnasoft-lab0`,
        });
    } else if (ctx.params.id === 'cacheUrlKey') {
        const description = await ctx.cache.tryGet(
            new URL('https://rsshub.app'),
            () => ({
                text: `Cache${++cacheIndex}`,
            }),
            config.cache.routeExpire * 2
        );
        item.push({
            title: 'Cache Title',
            description: description.text,
            pubDate: new Date(`2019-3-1`).toUTCString(),
            link: `https://github.com/khulnasoft-lab/feedy/issues/0`,
            author: `khulnasoft-lab0`,
        });
    } else if (ctx.params.id === 'complicated') {
        item.push({
            title: `Complicated Title`,
            description: `<a href="/khulnasoft-lab/feedy"></a>
<img src="/khulnasoft-lab/feedy.jpg">
<script>alert(1);</script>
<a href="http://mock.com/khulnasoft-lab/feedy"></a>
<img src="/khulnasoft-lab/feedy.jpg" data-src="/khulnasoft-lab/feedy0.jpg">
<img data-src="/khulnasoft-lab/feedy.jpg">
<img data-mock="/khulnasoft-lab/feedy.png">
<img mock="/khulnasoft-lab/feedy.gif">
<img src="http://mock.com/khulnasoft-lab/khulnasoft-lab/feedy">
<img src="/khulnasoft-lab/feedy.jpg" onclick="alert(1);" onerror="alert(1);" onload="alert(1);">`,
            pubDate: new Date(`2019-3-1`).toUTCString(),
            link: `//mock.com/khulnasoft-lab/feedy`,
            author: `khulnasoft-lab`,
        });
        item.push({
            title: `Complicated Title`,
            description: `<a href="/khulnasoft-lab/feedy"></a>
<img src="/khulnasoft-lab/feedy.jpg">`,
            pubDate: new Date(`2019-3-1`).toUTCString(),
            link: `https://mock.com/khulnasoft-lab/feedy`,
            author: `khulnasoft-lab`,
        });
    } else if (ctx.params.id === 'multimedia') {
        item.push({
            title: `Multimedia Title`,
            description: `<img src="/khulnasoft-lab/feedy.jpg">
<video src="/khulnasoft-lab/feedy.mp4"></video>
<video poster="/khulnasoft-lab/feedy.jpg">
<source src="/khulnasoft-lab/feedy.mp4" type="video/mp4">
<source src="/khulnasoft-lab/feedy.webm" type="video/webm">
</video>
<audio src="/khulnasoft-lab/feedy.mp3"></audio>
<iframe src="/khulnasoft-lab/feedy.html"></iframe>`,
            pubDate: new Date(`2019-3-1`).toUTCString(),
            link: `https://mock.com/khulnasoft-lab/feedy`,
            author: `khulnasoft-lab`,
        });
    } else if (ctx.params.id === 'sort') {
        item.push({
            title: `Sort Title 0`,
            link: `https://github.com/khulnasoft-lab/feedy/issues/s1`,
            author: `khulnasoft-lab0`,
        });
        item.push({
            title: `Sort Title 1`,
            link: `https://github.com/khulnasoft-lab/feedy/issues/s1`,
            author: `khulnasoft-lab0`,
        });
        item.push({
            title: `Sort Title 2`,
            link: `https://github.com/khulnasoft-lab/feedy/issues/s2`,
            pubDate: new Date(1546272000000 - 10 * 10 * 1000).toUTCString(),
            author: `khulnasoft-lab0`,
        });
        item.push({
            title: `Sort Title 3`,
            link: `https://github.com/khulnasoft-lab/feedy/issues/s3`,
            pubDate: new Date(1546272000000).toUTCString(),
            author: `khulnasoft-lab0`,
        });
    } else if (ctx.params.id === 'mess') {
        item.push({
            title: `Mess Title`,
            link: `/khulnasoft-lab/feedy/issues/0`,
            pubDate: 1546272000000,
            author: `khulnasoft-lab0`,
        });
    } else if (ctx.params.id === 'opencc') {
        item.push({
            title: '小可愛',
            description: '宇宙無敵',
            link: `/khulnasoft-lab/feedy/issues/0`,
            pubDate: new Date(1546272000000).toUTCString(),
            author: `khulnasoft-lab0`,
        });
    } else if (ctx.params.id === 'json') {
        item.push(
            {
                title: 'Title0',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                link: `https://github.com/khulnasoft-lab/feedy/issues/-3`,
            },
            {
                title: 'Title1',
                description: 'Description1',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                link: `https://github.com/khulnasoft-lab/feedy/issues/-2`,
                author: `khulnasoft-lab0 `,
                category: 'Category0',
            },
            {
                title: 'Title2 HTML in description',
                description: '<a href="https://github.com/khulnasoft-lab/feedy">FEEDy</a>',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                updated: new Date(`2019-3-2`).toUTCString(),
                link: `https://github.com/khulnasoft-lab/feedy/issues/-1`,
                author: [{ name: ' khulnasoft-lab1' }, { name: 'khulnasoft-lab2 ' }],
                category: ['Category0', 'Category1'],
            },
            {
                title: 'Title3 HTML in content',
                content: {
                    html: '<a href="https://github.com/khulnasoft-lab/feedy">khulnasoft-lab/feedy</a>',
                },
                pubDate: new Date(`2019-3-1`).toUTCString(),
                updated: new Date(`2019-3-2`).toUTCString(),
                link: `https://github.com/khulnasoft-lab/feedy/issues/0`,
                author: [{ name: '   khulnasoft-lab3' }, { name: 'khulnasoft-lab4   ' }, { name: 'khulnasoft-lab5   ' }],
                category: ['Category1'],
                enclosure_url: 'https://github.com/khulnasoft-lab/feedy/issues/0',
                enclosure_type: 'image/jpeg',
                enclosure_length: 3661,
                itunes_duration: 36610,
            },
            {
                title: 'Title4 author is null',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                link: `https://github.com/khulnasoft-lab/feedy/pull/11555`,
                author: null,
            }
        );
    } else if (ctx.params.id === 'gpt') {
        item.push(
            {
                title: 'Title0',
                description: 'Description0',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                link: 'https://github.com/khulnasoft-lab/feedy/issues/0',
            },
            {
                title: 'Title1',
                description:
                    '快速开始\n' +
                    '如果您在使用 FEEDy 过程中遇到了问题或者有建议改进，我们很乐意听取您的意见！您可以通过 Pull Request 来提交您的修改。无论您对 Pull Request 的使用是否熟悉，我们都欢迎不同经验水平的开发者参与贡献。如果您不懂编程，也可以通过 报告错误 的方式来帮助我们。\n' +
                    '\n' +
                    '参与讨论\n' +
                    'Telegram 群组 GitHub Issues GitHub 讨论\n' +
                    '\n' +
                    '开始之前\n' +
                    '要制作一个 RSS 订阅，您需要结合使用 Git、HTML、JavaScript、jQuery 和 Node.js。\n' +
                    '\n' +
                    '如果您对它们不是很了解，但想要学习它们，以下是一些好的资源：\n' +
                    '\n' +
                    'MDN Web Docs 上的 JavaScript 指南\n' +
                    'W3Schools\n' +
                    'Codecademy 上的 Git 课程\n' +
                    '如果您想查看其他开发人员如何使用这些技术来制作 RSS 订阅的示例，您可以查看 我们的代码库 中的一些代码。\n' +
                    '\n' +
                    '提交新的 FEEDy 规则\n' +
                    '如果您发现一个网站没有提供 RSS 订阅，您可以使用 FEEDy 制作一个 RSS 规则。RSS 规则是一个短小的 Node.js 程序代码（以下简称 “路由”），它告诉 FEEDy 如何从网站中提取内容并生成 RSS 订阅。通过制作新的 RSS 路由，您可以帮助让您喜爱的网站的内容被更容易访问和关注。\n' +
                    '\n' +
                    '在您开始编写 RSS 路由之前，请确保源站点没有提供 RSS。一些网页会在 HTML 头部中包含一个 type 为 application/atom+xml 或 application/rss+xml 的 link 元素来指示 RSS 链接。\n' +
                    '\n' +
                    '这是在 HTML 头部中看到 RSS 链接可能会长成这样：<link rel="alternate" type="application/rss+xml" href="http://example.com/rss.xml" />。如果您看到这样的链接，这意味着这个网站已经有了一个 RSS 订阅，您不需要为它制作一个新的 RSS 路由。',
                pubDate: new Date(`2019-3-1`).toUTCString(),
                link: 'https://github.com/khulnasoft-lab/feedy/issues/1',
            }
        );
    }

    for (let i = 1; i < 6; i++) {
        item.push({
            title: `Title${i}`,
            description: `Description${i}`,
            pubDate: new Date((ctx.params.id === 'current_time' ? new Date() : 1546272000000) - i * 10 * 1000).toUTCString(),
            link: `https://github.com/khulnasoft-lab/feedy/issues/${i}`,
            author: `khulnasoft-lab${i}`,
        });
    }

    if (ctx.params.id === 'empty') {
        item = null;
    }

    if (ctx.params.id === 'allow_empty') {
        item = null;
    }

    if (ctx.params.id === 'enclosure') {
        item = [
            {
                title: '',
                link: 'https://github.com/khulnasoft-lab/feedy/issues/1',
                enclosure_url: 'https://github.com/khulnasoft-lab/feedy/issues/1',
                enclosure_length: 3661,
                itunes_duration: 36610,
            },
        ];
    }

    if (ctx.params.id === 'slow') {
        await wait(1000);
    }

    if (ctx.query.mode === 'fulltext') {
        item = [
            {
                title: '',
                link: 'https://m.thepaper.cn/newsDetail_forward_4059298',
            },
        ];
    }

    ctx.state.data = {
        title: `Test ${ctx.params.id}`,
        itunes_author: ctx.params.id === 'enclosure' ? 'khulnasoft-lab' : null,
        link: 'https://github.com/khulnasoft-lab/feedy',
        item,
        allowEmpty: ctx.params.id === 'allow_empty',
        description: ctx.params.id === 'complicated' ? '<img src="http://mock.com/khulnasoft-lab/khulnasoft-lab/feedy">' : ctx.params.id === 'multimedia' ? '<video src="http://mock.com/khulnasoft-lab/khulnasoft-lab/feedy"></video>' : 'A test route for FEEDy',
    };
};
