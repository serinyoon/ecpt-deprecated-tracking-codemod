function transform(node, b) {
  if (node.path.original === 'ember-cli-pemberly-tracking$tracking') {
    const value = (node.hash.pairs.find((pair) => pair.key === 'control-name') || {}).value;
    node.path = b.path('ember-cli-pemberly-tracking$track-interaction');
    node.hash = b.hash();
    node.params = [value];
  }

  return node;
}

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        node.modifiers.forEach((modifier) => transform(modifier, b));
      },
      SubExpression(node) {
        return transform(node, b);
      },
    };
  });
};

module.exports.type = 'hbs';