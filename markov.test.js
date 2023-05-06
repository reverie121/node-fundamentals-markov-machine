const MarkovMachine = require("./markov")

// Globally declaring variables
let mm;
let words;
let chains;

beforeAll(() => {
    mm = new MarkovMachine('the cat in the hat');
    words = Object.values(mm.words);
    chains = Object.keys(mm.chains);    
});

describe('looking for all words that should be in MarkovMachine.words and MarkovMachine.chains', () => {
    test('checking MarkovMachine.words for all expected words.',() => {
        expect(words).toContain('the');
        expect(words).toContain('cat');
        expect(words).toContain('in');
        expect(words).toContain('hat');
    })
    test('checking MarkovMachine.chains keys for all expected words.',() => {
        expect(chains).toContain('the');
        expect(chains).toContain('cat');
        expect(chains).toContain('in');
        expect(chains).toContain('hat');
    })
    test('checking MarkovMachine.chains values for all expected words',() => {
        expect(mm.chains['the']).toContain('cat');
        expect(mm.chains['the']).toContain('hat');
        expect(mm.chains['cat']).toContain('in');
        expect(mm.chains['in']).toContain('the');
        expect(mm.chains['hat']).toEqual([]);
    })
})

describe('',() => {
    let madeText;
    beforeEach(() => {
        madeText = mm.makeText(100);
    })
    test('makeText should create text with all valid words', () => {
        for (const word of words) {
            expect(madeText).toContain(word);
        }
    });
    test('',() => {
        expect(madeText.split(' ').length).toEqual(100);
    })
})

test('random value should be from input array', () => {
    const randomVal = mm.randomValue([2,4,6,8]);
    expect([2,4,6,8]).toContain(randomVal);
});

test('random property should be from constructor variable string', () => {
    const randomProperty = mm.randomProperty(mm.chains);
    expect('cat in the hat').toContain(randomProperty);
});