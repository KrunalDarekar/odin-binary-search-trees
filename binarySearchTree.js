const node = (data) => {
    const right = null;
    const left = null;
    return{
        data,
        right,
        left
    }
}

const tree = (arr) => {
    const root = null;
    return {
        arr,
        root
    }
}

const buildTree = (arr, start = 0, end = arr.length - 1) => {
    
    if (!start != 0 || end != arr.length - 1){
        arr.sort(function(a, b){return a - b});
    }

    if (start > end) {
        return null
    }

    const mid = parseInt((start + end)/2, 10);
    const root = node(arr[mid]);

    root.left = buildTree(arr, start, mid-1);
    root.right = buildTree(arr, mid+1, end);

    return root;
}

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

const newTree = buildTree([1,2,3,4,5,6,7,8,9]);

prettyPrint(newTree);

const insert = (value, root) => {
    let curRoot = root;
    while (true) {
        if(value >= curRoot.data){
            if(!curRoot.right){
                curRoot.right = node(value);
                return;
            } else {
                curRoot = curRoot.right;
            }
        } else {
            if(!curRoot.left){
                curRoot.left = node(value);
                return;
            } else {
                curRoot = curRoot.left;
            }
        }
    }
}

const del = (value, root) => {
    let nodeToDelete = root;
    let parent;
    let toRight = true;
    while(!(nodeToDelete.data === value)){
        if(value > nodeToDelete.data) {
            parent = nodeToDelete;
            nodeToDelete = nodeToDelete.right;
            toRight = true;
        } else {
            parent = nodeToDelete;
            nodeToDelete = nodeToDelete.left;
            toRight = false;
        }
    }

    if(nodeToDelete.right === null && nodeToDelete.left === null) {
        if(toRight) {
            parent.right = null;
        }else {
            parent.left = null;
        }
    } else if (nodeToDelete.right && nodeToDelete.left) {
        let replacement = nodeToDelete.right;
        while(replacement.left){
            replacement = replacement.left;
        }
        const replacementData = replacement.data;
        del(replacement.data, root);
        nodeToDelete.data = replacementData;
    } else {
        let attach;
        nodeToDelete.right ? attach = nodeToDelete.right : attach = nodeToDelete.left;
        if(toRight) {
            parent.right = attach;
        }else {
            parent.left = attach;
        }
    }
}

const find = (value, root) => {
    
    if(root.data === value) {
        return root
    }else {
        let curNode = root;
        while(!(curNode.data === value)){
            if(!curNode){
                return null;
            }
            if(value > curNode.data){
                curNode = curNode.right;
            } else {
                curNode = curNode.left;
            }
        }
        return curNode;
    }
}

const levelOrder = (tree, func) => {
    if(tree === null) return;
    const levelOrderArr = [];
    const queue = [];
    queue.push(tree);
    while (queue.length) {
        const current = queue[0];
        levelOrderArr.push(current);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
        queue.shift();
    }
    if(func){
        levelOrderArr.forEach(func);
    }
    return levelOrderArr;
}

const inOrder = (tree, func) => {
    if(!tree) return null;
    const inOrderArr = [];
    let leftArr = inOrder(tree.left);
    if(leftArr) {
        leftArr.forEach((node) => {
        inOrderArr.push(node);
        })
    }
    inOrderArr.push(tree);
    let rightArr = inOrder(tree.right);
    if(rightArr){
        rightArr.forEach((node) =>{
            inOrderArr.push(node);
        })
    }
    if(func) {
        inOrderArr.forEach(func);
    }
    return inOrderArr;
}

const preOrder = (tree, func) => {
    if(!tree) return null;
    const preOrderArr = [];
    preOrderArr.push(tree);
    let leftArr = preOrder(tree.left);
    if(leftArr) {
        leftArr.forEach((node) => {
        preOrderArr.push(node);
        })
    }
    let rightArr = preOrder(tree.right);
    if(rightArr){
        rightArr.forEach((node) =>{
            preOrderArr.push(node);
        })
    }
    if(func) {
        preOrderArr.forEach(func);
    }
    return preOrderArr;
}

const postOrder = (tree, func) => {
    if(!tree) return null;
    const postOrderArr = [];
    let leftArr = postOrder(tree.left);
    if(leftArr) {
        leftArr.forEach((node) => {
        postOrderArr.push(node);
        })
    }
    let rightArr = postOrder(tree.right);
    if(rightArr){
        rightArr.forEach((node) =>{
            postOrderArr.push(node);
        })
    }
    postOrderArr.push(tree);
    if(func) {
        postOrderArr.forEach(func);
    }
    return postOrderArr;
}

const height = (node) => {
    if (!node) {
        return -1;
    } else {
        let RHeight = height(node.right);
        let LHeight = height(node.left);

        if(RHeight > LHeight) {
            return(RHeight + 1)
        } else {
            return(LHeight + 1)
        }
    }
}

const depth = (node, root, level = 0) => {
    if (!node) {
        return null
    } else if (node === root) {
        return level;
    } else if (!root) {
        return null
    } else {
        let RDepth = depth(node, root.right, level + 1);
        let LDepth = depth(node, root.left, level + 1);
        if (RDepth) {
            return RDepth;
        }else if (LDepth) {
            return LDepth;
        }else {
            return null;
        }
    }
}

const isBalanced = (tree) => {
    if(!tree) {
        return true
    }
    if(Math.abs(height(tree.right) - height(tree.left)) <= 1) {
        if(isBalanced(tree.right) && isBalanced(tree.left)) {
            return true
        } else {
            return false
        }
    }else {
        return false
    }
}

const rebalance = (tree) => {
    const arr = []
    inOrder(tree).forEach((node) => {
        arr.push(node.data);
    })
    return buildTree(arr);
}

del(1,newTree);

console.log(isBalanced(newTree));

const rebalancedTree = rebalance(newTree);

prettyPrint(rebalancedTree);

// const newNode = newTree.left.right.right;
// const secNode = node(8);

// console.log(newNode.data);
// console.log(depth(newNode, newTree));
// console.log(depth(secNode,newTree));

// const newTreeHeight = height(newTree);
// console.log(newTreeHeight);

// let thisArr = inOrder(newTree);
// thisArr.forEach((node) => {
//     console.log(node.data);
// })

// let thisArr = levelOrder(newTree);
// thisArr.forEach((node) => {
//     console.log(node.data);
// })
// del(5,newTree);
// prettyPrint(newTree);