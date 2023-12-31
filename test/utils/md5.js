const md5 = require('../../lib/utils/md5');

describe('md5', () => {
    it('md5 FEEDy', () => {
        expect(md5('FEEDy')).toBe('3187d745ec5983413e4f0dce3900d92d');
    });
});
