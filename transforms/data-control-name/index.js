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
        let isControlNameDynamic = false;
        switch (dataControlName.value.type) {
          case 'TextNode':
            controlName = b.string(dataControlName.value.chars);
            break;
          case 'MustacheStatement':
            if (dataControlName.value.path.original === 'if') {
              const sexpr = b.sexpr(dataControlName.value.path, dataControlName.value.params);
              controlName = sexpr;
              break;
            } else if (dataControlName.value.path.original && dataControlName.value.params.length) {
              isControlNameDynamic = true;
              controlName = b.path('controlName');
              break;
            }
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
          let controlId;
          switch (dataControlId.value.type) {
            case 'TextNode':
              controlId = b.string(dataControlId.value.chars);
              break;
            case 'MustacheStatement':
              controlId = dataControlId.value.path;
              break;
            default:
              break;
          }
          modifier.hash = b.hash([b.pair('controlTrackingId', controlId)]);
        }

        node.modifiers = [...node.modifiers, modifier];

        node.attributes = attributes.filter(
          (attr) => !(isDataControlName(attr.name) || isDataControlId(attr.name))
        );

        if (isControlNameDynamic) {
          debugger;
          const sexpr = b.sexpr(dataControlName.value.path, dataControlName.value.params);
          const prog = b.blockItself([node], ['controlName']);
          return b.block(b.path('let'), [sexpr], b.hash(), prog);
        }

        return node;
      },
    };
  });
};

module.exports.type = 'hbs';
