const Node = require('./node');
const util = require('util');

class Tree {
    constructor(array) {
        this.root = this.treeBuild(array);
    }

    treeBuild(array, start=0, end=array.length-1) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);

        const root = new Node(array[mid]);

        if (0 < mid) {
            root.left = this.treeBuild(array, start, mid - 1);
        }
        if (mid < array.length) {
            root.right = this.treeBuild(array, mid + 1, end);
        }
        
        return root;
    }

    insert(value, node = this.root, side = null, prevNode = null) {
      if (!node) {
        node = new Node(value);
        if (side === 'left') {
          prevNode.left = node;
        } else if (side === 'right') {
          prevNode.right = node;
        }
      } else {
        value < node.data ? this.insert(value, node.left, 'left', prevNode=node) : this.insert(value, node.right, 'right', prevNode=node);
      }
    }

    deleteItem(value, node = this.root, prevNode = null, side = null) {
      if (!node) return null;
  
      if (value < node.data) {
          node.left = this.deleteItem(value, node.left, node, 'left');
      } else if (value > node.data) {
          node.right = this.deleteItem(value, node.right, node, 'right');
      } else {
          
          if (!node.left && !node.right) {
              return null;
          }
          
          if (!node.left) return node.right;
          if (!node.right) return node.left;
  
          let successor = node.right;
          let parentSuccessor = node;
  
          while (successor.left) {
              parentSuccessor = successor;
              successor = successor.left;
          }

          node.data = successor.data;
  
          if (parentSuccessor.left === successor) {
              parentSuccessor.left = successor.right;
          } else {
              parentSuccessor.right = successor.right;
          }
      }
  
      return node;
  }
  

    find(value, node = this.root) {
      if (!node) return 'Value not present!';
      

      if (value === node.data) return node;

      if (value > node.data) {
        return this.find(value, node.right);

      } else if (value < node.data) {
        return this.find(value, node.left);
      }
    }

    levelOrder(callback, node=this.root, queue = []) { 
      queue.shift();

      if (!callback) throw new Error('A callback is required!');
  
      if (node) {
        const partialArray = [];
        if (node.left) partialArray.push(node.left);
        if (node.right) partialArray.push(node.right);
        queue = [...queue, ...partialArray];
        callback(node);
      }
  
      if (queue.length) {
        this.levelOrder(callback, queue[0], queue);
      } else {
        return;
      }
  }

  inOrder(callback, node = this.root) {
    if (node.left) this.inOrder(callback, node.left);

    callback(node);

    if (node.right) this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (node) callback(node);

    if (node.left) this.preOrder(callback, node.left);

    if (node.right) this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (node.left) this.postOrder(callback, node.left);

    if (node.right) this.postOrder(callback, node.right);

    callback(node);
  }

  height(node) {
    if (!node) return -1;

    const heightLeft = this.height(node.left);
    const heightRight = this.height(node.right);

    return 1 + (heightLeft > heightRight ? heightLeft : heightRight);
  }

  depth(node, currentNode = this.root, currentDepth = 0) {
    if (currentNode === null) return -1;  
    if (currentNode === node) return currentDepth; 
  
    const left = this.depth(node, currentNode.left, currentDepth + 1);
    if (left !== -1) return left;  
    return this.depth(node, currentNode.right, currentDepth + 1);
  }

  isBalanced(node = this.root) {
    const checkBalance = (currentNode) => {
        if (!currentNode) return 0;

        const leftHeight = checkBalance(currentNode.left);
        const rightHeight = checkBalance(currentNode.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return -1; 

        if (leftHeight === -1 || rightHeight === -1) return -1;
        return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkBalance(node) !== -1;
  }  

  rebalance() {
    if (this.isBalanced()) {
      console.log('Tree already balanced!');
    } else {
      const array = [];
      this.inOrder((node) => array.push(node.data));
      this.root = this.treeBuild(array);
    }
  }
}

const tree = new Tree([1, 3, 5, 6, 8, 10, 11, 15, 20]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


module.exports = { Tree, prettyPrint };