module.exports.requires = function(string, logThreshold) {
	function anyChar(string, pred) {
		for(var i = 0; i < string.length; i++) {
			if(pred(string.codePointAt(i))) return true
		}
		return false
	}

	var hasDigit = anyChar(string, function(ch) {
		return "0".codePointAt(0) <= ch && ch <= "9".codePointAt(0)
	})

	var hasUpper = anyChar(string, function(ch) {
		return "A".codePointAt(0) <= ch && ch <= "Z".codePointAt(0)
	})

	var hasLower = anyChar(string, function(ch) {
		return "a".codePointAt(0) <= ch && ch <= "z".codePointAt(0)
	})

	var hasSymbol = anyChar(string, function(ch) {

	})

	var charsetSize = 0
	if(hasDigit) charsetSize += 10
	if(hasUpper) charsetSize += 26
	if(hasLower) charsetSize += 26
	if(hasSymbol) charsetSize += 128 - 32 - 10 - 26 - 26

	// TODO multibyte support?

	// Formula:
	// Entropy >= threshold iff
	// pow(charsetSize, string.length) >= pow(2, logThreshold) iff
	// string.length * log2(charsetSize) >= logThreshold

	var logEntropy = string.length * Math.log(charsetSize) / Math.log(2)
	return logEntropy >= logThreshold
}
