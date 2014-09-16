
Trie = function(){
  this.characters = {};
  this.isWord = false;
};

Trie.prototype.learn = function(word, index){
  //setting index to 0 if none was passed in
  if (index === undefined) {
    index = 0;
  }
    //if at end of word
    if (word[index] === undefined) {
      this.isWord = true;
    }
    else {
      //recursive case
      if (this.characters[word[index]] === undefined) {
        this.characters[word[index]] = new Trie();
      }
      this.characters[word[index]].learn(word, index += 1);
    }
};

Trie.prototype.getWords = function(words, currentWord){
  var words = words || [];
  var currentWord = currentWord || "";

  if (this.isWord) {
    words.push(currentWord);
  }

  for (var letter in this.characters) {
      var nextWord = currentWord + letter;
      this.characters[letter].getWords(words, nextWord);

    }

  return words;
};

Trie.prototype.find = function(word, index){
  if (index === undefined) {
    index = 0;
  }
    if (word[index] === undefined) {
      return this;
    } else {
      for (key in this.characters) {
        if (key === word[index]) {
          return this.characters[word[index]].find(word, index += 1);
        }
      }
    }
};

Trie.prototype.autoComplete = function(prefix){
  var subTrie = this.find(prefix);
  console.log("THIS IS THE SUBTRIE", subTrie);
  if (subTrie) {
    return subTrie.getWords([],prefix);
  } else {
    return [];
  }
};


try{
  module.exports = Trie;
} catch(e){

}