const uuidv1 = require('uuid/v1');

module.exports = {
  output: {
    chunkLoadingGlobal: 'cns-tissue-blocks-' + uuidv1(),
    library: 'elements',
  }
}
