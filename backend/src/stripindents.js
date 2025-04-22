/**
 * Strips indentation from template literals or strings
 * @param {string|Array} arg0 - String or template string array
 * @param {...any} values - Values for template string interpolation
 * @returns {string} String with indentation stripped
 */
function stripIndents(arg0, ...values) {
  if (typeof arg0 !== 'string') {
    const processedString = arg0.reduce((acc, curr, i) => {
      acc += curr + (values[i] ?? '');
      return acc;
    }, '');

    return _stripIndents(processedString);
  }

  return _stripIndents(arg0);
}

/**
 * Helper function that performs the actual indentation stripping
 * @param {string} value - Input string
 * @returns {string} String with indentation stripped
 */
function _stripIndents(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trimStart()
    .replace(/[\r\n]$/, '');
}

// Export the function using CommonJS
module.exports = {
  stripIndents
};