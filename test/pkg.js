jest.mock('request-promise-native');
const FEEDy = require('../lib/pkg');

describe('pkg', () => {
    it('config', () => {
        FEEDy.init({
            UA: 'mock',
        });
        const config = require('../lib/config').value;
        expect(config.ua).toBe('mock');
    });

    it('request', (done) => {
        FEEDy.request('/test/1').then((data) => {
            expect(data).toMatchObject({
                atomlink: 'http:///test/1',
                title: 'Test 1',
                itunes_author: null,
                link: 'https://github.com/khulnasoft-lab/feedy',
                item: [
                    {
                        title: 'Title1',
                        description: 'Description1',
                        pubDate: 'Mon, 31 Dec 2018 15:59:50 GMT',
                        link: 'https://github.com/khulnasoft-lab/feedy/issues/1',
                        author: 'khulnasoft-lab1',
                    },
                    {
                        title: 'Title2',
                        description: 'Description2',
                        pubDate: 'Mon, 31 Dec 2018 15:59:40 GMT',
                        link: 'https://github.com/khulnasoft-lab/feedy/issues/2',
                        author: 'khulnasoft-lab2',
                    },
                    {
                        title: 'Title3',
                        description: 'Description3',
                        pubDate: 'Mon, 31 Dec 2018 15:59:30 GMT',
                        link: 'https://github.com/khulnasoft-lab/feedy/issues/3',
                        author: 'khulnasoft-lab3',
                    },
                    {
                        title: 'Title4',
                        description: 'Description4',
                        pubDate: 'Mon, 31 Dec 2018 15:59:20 GMT',
                        link: 'https://github.com/khulnasoft-lab/feedy/issues/4',
                        author: 'khulnasoft-lab4',
                    },
                    {
                        title: 'Title5',
                        description: 'Description5',
                        pubDate: 'Mon, 31 Dec 2018 15:59:10 GMT',
                        link: 'https://github.com/khulnasoft-lab/feedy/issues/5',
                        author: 'khulnasoft-lab5',
                    },
                ],
                allowEmpty: false,
            });
            done();
        });
    });

    it('error', (done) => {
        FEEDy.request('/test/error')
            .then(() => {
                done();
            })
            .catch((e) => {
                expect(e).toBe('Error test');
                done();
            });
    });
});
