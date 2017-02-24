
describe('wordSplit', function() {

    it('takes a string and returns an array of words', function() {
      const testStr = 'pie cake icecream'

      expect(wordSpilt(testStr)).to.be.an('array')
      expect(wordSpilt(testStr)).to.have.length(3)
    })

    it('removes punctuation and extra spaces', function() {
      const testStr = 'Dessert : icecream, cake '

      expect(wordSpilt(testStr)).to.have.length(3)
      expect(wordSpilt(testStr)).to.include('icecream')
    })
})

describe('processText', function() {

  it('accepts a string', function() {
      const testStr = 'pie cake icecream'
      const testText = new ProcessText(testStr)

      expect(testText.text).to.be.a('string')
      expect(testText.text).to.equal(testStr)
    })

  it('calculates the number of words and characters', function() {
      const testStr = 'pie cake icecream'
      const testText = new ProcessText(testStr)

      expect(testText.wordCount).to.equal(3)
      expect(testText.text.length).to.equal(17)

    })


})
