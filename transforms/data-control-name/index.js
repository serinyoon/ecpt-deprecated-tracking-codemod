function isDataControlName(name) {
  return name.includes('data-control-name');
}

function isDataControlId(name) {
  return name.includes('data-control-id');
}

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        const attributes = node.attributes;
        const dataControlName = attributes.find((attr) => isDataControlName(attr.name));
        const dataControlId = attributes.find((attr) => isDataControlId(attr.name));
        if (!dataControlName) {
          return node;
        }

        let controlName;
        switch (dataControlName.value.type) {
          case 'TextNode':
            controlName = b.string(dataControlName.value.chars);
            break;
          case 'MustacheStatement':
            controlName = dataControlName.value.path;
            break;
          default:
            break;
        }
        
        const modifier = b.elementModifier(
          b.path('ember-cli-pemberly-tracking$track-interaction'),
          [controlName]
        );
        if (dataControlId) {
          modifier.hash = b.hash([
            b.pair('controlTrackingId', b.string(dataControlId.value.chars)),
          ]);
        }

        debugger;

        node.modifiers = [modifier];
        node.attributes = attributes.filter(
          (attr) => !(isDataControlName(attr.name) || isDataControlId(attr.name))
        );

        return node;
      }
    };
  });
};

module.exports.type = 'hbs';
