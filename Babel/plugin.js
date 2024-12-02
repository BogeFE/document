// 一个插件就是一个函数

module.exports = function ({
    types: t
}) {
    return {
        visitor: {
            VariableDeclaration(path, state) {
                const node = path.node

                if (t.isVariableDeclaration(node, {
                    kind: 'const'
                })) {
                    node.kind = 'let'
                }
            }
        }
    }
}