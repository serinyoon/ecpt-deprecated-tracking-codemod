module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        const attrWithModifier = node.attributes.find(
          (attr) =>
            attr.value.type === 'MustacheStatement' &&
            attr.value.path.original === 'ember-cli-pemberly-tracking$tracked-action'
        );
        if (!attrWithModifier) {
          return node;
        }

        const trackingParam = attrWithModifier.value.params[0];
        if (
          attrWithModifier.name !== '@click' ||
          (trackingParam.type !== 'StringLiteral' && trackingParam.type !== 'PathExpression')
        ) {
          return node;
        }

        const newPath = attrWithModifier.value.params[1];
        attrWithModifier.value = b.mustache(newPath);

        const modifier = b.elementModifier(
          b.path('ember-cli-pemberly-tracking$track-interaction'),
          [trackingParam]
        );
        node.modifiers = [modifier];

        return node;
      },
    };
  });
};

module.exports.type = 'hbs';
