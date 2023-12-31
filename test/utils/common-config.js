const configUtils = require('../../lib/utils/common-config');
const nock = require('nock');

describe('index', () => {
    it('transElemText', () => {
        const $ = () => 'FEEDy';
        expect(configUtils.transElemText($, '$()')).toBe('FEEDy');
    });

    it('replaceParams', () => {
        const $ = () => 'FEEDy';
        const data = {
            params: {
                title: 'FEEDy',
            },
            title: '%title%',
        };
        expect(configUtils.replaceParams(data, data.title, $)).toBe('FEEDy');
    });

    it('getProp', () => {
        const $ = () => 'FEEDy';
        const data = {
            title: 'FEEDy',
        };
        expect(configUtils.getProp(data, ['title'], $)).toBe('FEEDy');
        expect(configUtils.getProp(data, 'title', $)).toBe('FEEDy');
    });

    it('all', () => {
        const $ = () => 'FEEDy';
        const data = {
            params: {
                title: '$()',
            },
            title: '%title%',
        };
        expect(configUtils.getProp(data, ['title'], $)).toBe('FEEDy');
    });

    it('buildData', async () => {
        nock('http://rsshub.test')
            .get('/buildData')
            .reply(() => [
                200,
                `<div class="content">
                <ul>
                    <li>
                        <a href="/1">1</a>
                        <div class="description">FEEDy1</div>
                    </li>
                    <li>
                        <a href="/2">2</a>
                        <div class="description">FEEDy2</div>
                    </li>
                </ul>
            </div>`,
            ]);
        const data = await configUtils({
            link: 'http://rsshub.test/buildData',
            url: 'http://rsshub.test/buildData',
            title: `%title%`,
            params: {
                title: 'buildData',
            },
            item: {
                item: '.content li',
                title: `$('a').text() + ' - %title%'`,
                link: `$('a').attr('href')`,
                description: `$('.description').html()`,
            },
        });

        expect(data).toMatchObject({
            link: 'http://rsshub.test/buildData',
            title: 'buildData',
            item: [
                {
                    description: 'FEEDy1',
                    guid: undefined,
                    link: '/1',
                    pubDate: undefined,
                    title: '1 - buildData',
                },
                {
                    description: 'FEEDy2',
                    guid: undefined,
                    link: '/2',
                    pubDate: undefined,
                    title: '2 - buildData',
                },
            ],
        });
    });
});
