jssearch.index = {"example":[{"f":1,"w":7.6},{"f":2,"w":4},{"f":3,"w":7.6}],"\"'":[{"f":1,"w":1.2}],"+":[{"f":1,"w":2.9859839999999997}],"item":[{"f":1,"w":1.728}],"file":[{"f":1,"w":1.44}],"title":[{"f":1,"w":1.2}],"'\"":[{"f":1,"w":1.2}],"'":[{"f":1,"w":2.0736}],"url":[{"f":1,"w":1.2}],"w":[{"f":1,"w":1.2}],"weight":[{"f":1,"w":1.2}],"results":[{"f":1,"w":1.2}],"completely":[{"f":2,"w":1.9}],"different":[{"f":2,"w":1.9}],"headline":[{"f":2,"w":1.9}],"another":[{"f":2,"w":4}],"lorem":[{"f":2,"w":1.728},{"f":3,"w":1.2}],"ipsum":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"dolor":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"sit":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"amet":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"consetetur":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"sadipscing":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"elitr":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"ut":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"wisi":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"enim":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"ad":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"minim":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"veniam":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"quis":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"nostrud":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"exerci":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"tation":[{"f":2,"w":1.2},{"f":3,"w":1.2}],"page":[{"f":3,"w":7.6}]};
jssearch.files = {"1":{"url":".\/\/example.html","title":"Example"},"2":{"url":".\/\/tests\/data\/other.html","title":"A completely different headline"},"3":{"url":".\/\/tests\/data\/simple.html","title":"This is an Example Page"}};
jssearch.tokenizeString = function(string) {
		var stopWords = ["a","an","and","are","as","at","be","but","by","for","if","in","into","is","it","no","not","of","on","or","such","that","the","their","then","there","these","they","this","to","was","will","with"];
		return string.split(/[\s\.,;\:\\\/\[\]\(\)\{\}]+/).map(function(val) {
			return val.toLowerCase();
		}).filter(function(val) {
			for (w in stopWords) {
				if (stopWords[w] == val) return false;
			}
			return true;
		}).map(function(word) {
			return {t: word, w: 1};
		});
};