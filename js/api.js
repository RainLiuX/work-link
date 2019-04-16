var genWords = function(len) {
  var ranList = [];
  for (var i = 0; i < len; i++) {
    while (1) {
      var tmp = Math.floor(Math.random() * Math.floor(dict.length / 2));
      if (ranList.indexOf(tmp) == -1) {
        ranList.push(tmp);
        break;
      }
    }
  }
  var words = [];
  for (var i = 0; i < len; i++) {
    words.push(dict[ranList[i]*2]);
    words.push(dict[ranList[i]*2+1]);
  }
  return words;
}
