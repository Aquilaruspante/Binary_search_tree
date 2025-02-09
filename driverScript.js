const { Tree, prettyPrint } = require('./BST');

const arraySize = 50

let array = [];

for (let i = 1; i <= arraySize; i++) {
    const newElement = Math.floor(Math.random() * 100) + 1;
    
    if (!array.includes(newElement)) array.push(newElement);
}

array = array.sort((a, b) => (a - b));

const tree = new Tree(array);

prettyPrint(tree.root);

function checkIsBalanced() {
    if (tree.isBalanced()) {
        console.log('This tree is balanced');
    } else {
        console.log('Unbalanced tree!');
    }
}

checkIsBalanced()

console.log('preorder:');
tree.preOrder((node) => console.log(node.data));
console.log('postorder:');
tree.postOrder((node) => (console.log(node.data)));
console.log('inorder:');
tree.inOrder((node) => console.log(node.data));

console.log('inserting 200');
tree.insert(200);
console.log('inserting 135');
tree.insert(135);

prettyPrint(tree.root);

checkIsBalanced();

console.log('rebalancing!');
tree.rebalance();

checkIsBalanced();

prettyPrint(tree.root);