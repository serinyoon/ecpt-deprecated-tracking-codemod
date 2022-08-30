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
          const sexpr = b.sexpr(dataControlName.value.path, dataControlName.value.params);
          const prog = b.blockItself([b.text('\n'), node, b.text('\n')], ['controlName']);
          return b.block(b.path('let'), [sexpr], b.hash(), prog);
        }

        return node;
      },
      MustacheStatement(node) {
        if (node.path.original !== 't') {
          return node;
        }

        const linkInfo = node.hash.pairs.find((pair) => pair.key === 'linkInfo');
        const pairs =
          linkInfo &&
          linkInfo.value &&
          linkInfo.value.path.original === 'hash' &&
          linkInfo.value.hash.pairs;
        const dataControlName = pairs.find((pair) => isDataControlName(pair.key));
        if (dataControlName) {
          dataControlName.key = 'control-name';
        }

        return node;
      },
      BlockStatement(node) {
        const dataControlName = node.hash.pairs.find((pair) => isDataControlName(pair.key));
        const dataControlId = node.hash.pairs.find((pair) => isDataControlId(pair.key));
        if (!dataControlName) {
          return;
        }

        const controlName = dataControlName.value;
        const modifier = b.elementModifier(
          b.path('ember-cli-pemberly-tracking$track-interaction'),
          [controlName]
        );

        if (dataControlId) {
          modifier.hash = b.hash([b.pair('controlTrackingId', dataControlId.value)]);
        }

        const route = b.attr('@route', b.string(node.params[0].value));

        const modelName = node.params[1] && node.params[1].original;
        let model;
        if (modelName) {
          const decoratedModelName = modelName.startsWith('@') ? modelName : `@${modelName}`;
          model = b.attr('@model', b.mustache(decoratedModelName));
        }
        const attrs = node.hash.pairs
          .filter((pair) => !(isDataControlName(pair.key) || isDataControlId(pair.key)))
          .map((pair) => b.attr(pair.key, pair.value));

        const element = b.element('EmberEngines$LinkToExternal', {
          attrs: [route, model, ...attrs].filter((attr) => !!attr),
          modifiers: [modifier],
          children: node.program.body,
        });

        return element;
      },
    };
  });
};

module.exports.type = 'hbs';
