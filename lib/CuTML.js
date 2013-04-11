module.exports = function(str, options) {
  var maxSize       = options.maxSize || 100,
      reminder      = options.reminder || "... more.",
      regOpenedTags = /^<([^\s|\>|\/]+)\s?(\w+=.*?)?\/?>/,
      regClosedTags = /^<\/([^\s]+?)>/,
      actStr        = "",
      actSize       = 0,
      openedTags    = [],
      saveTags      = options.saveTags || [];

  while (actSize < maxSize) {
    if (str.length == 0)
      return actStr;

    if (actTag = regOpenedTags.exec(str)) { 
      // Get opened tags at the start of the string.
      actStr = actStr + actTag[0];
      str = str.slice(actTag[0].length);

      if (actTag[0].charAt(actTag[0].length-2) != '/')
        openedTags.push(actTag[1]);
    } else if (actTag = regClosedTags.exec(str)) { 
      // Get closed tags at the start of the string.
      actStr = actStr + actTag[0];
      str = str.slice(actTag[0].length);

      if (actTag[1] == openedTags[openedTags.length-1])
        openedTags.pop();
      else
        console.log('Durr, there is an error!');
    } else { 
      // Get non-tag char at the start of the string
      actStr = actStr + str.charAt(0);
      str = str.slice(1);
      if (saveTags.indexOf(openedTags[openedTags.length-1]) == -1)
        actSize++;
    }
  }

  //restore the unclosed tags.
  openedTags.reverse().forEach(function(el) {
    actStr = actStr + '</'+el+'>';
  }); 

  return actStr + reminder;
}