export default text => {
  const matches = text.match(/url\('\/tiles\/([0-9]+).jpg'\)/g) || [];

  matches.forEach(needle => {
    const imageRef = needle.match(/([0-9])+/);
    const img = require(`./${imageRef[0]}.jpg`);
    text = text.replace(needle, `url('${img}')`);
  });

  return text;
};
