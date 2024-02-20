class Node
{
    constructor(value, left = null, right = null)
    {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree
{
    constructor(root)
    {
        this.root = this.adjustArray(root);
    }

    buildTree(array, start = 0, end = array.length - 1)
    {   
        if(start > end) return null;
        let mid = Math.floor((start + end) / 2);
        const treeNode = new Node(array[mid]);
        treeNode.left = this.buildTree(array, start, mid - 1);
        treeNode.right = this.buildTree(array, mid + 1, end);

        return treeNode;
    }

    insert(value, root = this.root)
    {
        if(value < root.value)
        {
            if(root.left === null)
            {
               return root.left = new Node(value);
            }
            return this.insert(value, root.left);
        }
        else if(value > root.value)
        { 
            if(root.right === null)
            {
               return root.right = new Node(value);
            }
            return this.insert(value, root.right);

        }else 
        {
            return null;
        }
    }

    delete(value, root = this.root)
    {
        if(value < root.value)
        {
            if(root.left === null)
            {
                return null;
            }
            return this.delete(value, root.left);
        }
        else if(value > root.value)
        { 
            if(root.right === null)
            {
               return null;
            }
            return this.delete(value, root.right);

        }
        else if(value === root.value)
        {
            if(root.right === null && root.left !== null)
            {
                root.value = root.left.value;
                return root.left = null;

            }else if(root.left === null && root.right !== null)
            {
                
                root.value = root.right.value;
                return root.right = null;
            }
            else if(root.left === null && root.right === null)
            {
                return root = null;

            }else if(root.left !== null && root.right !== null)
            {
                const newRoot = this.findReplacement(root.right);
                const newRootValue = newRoot.value;
                this.delete(newRoot.value);
                return root.value = newRootValue;
            }
        }
    }

    find(value, root = this.root)
    {
        if(value < root.value)
        {
            if(root.left === null)
            {
               return null;
            }
            return this.find(value, root.left);
        }
        else if(value > root.value)
        { 
            if(root.right === null)
            {
               return null;
            }
            return this.find(value, root.right);

        }else if(value === root.value)
        {
            return root;
        }

    }

    leverOder(callback = [], number, root = this.root, queue = [root])
    {
        if(queue.length === 0) return callback;
        else
        {
            if(Array.isArray(callback)) callback.push(root.value);
            else callback(root, number);
            if(root.left !== null) queue.push(root.left);
            if(root.right !== null) queue.push(root.right);
            queue.splice(0, 1);
            return this.leverOder(callback, number, root = queue[0], queue)
        }
    }

    inOrder(callback = [], number, root = this.root)
    {
        if(root === null) return null;
        this.inOrder(callback, number, root.left);
        if(Array.isArray(callback)) callback.push(root.value);
        else callback(root, number);
        this.inOrder(callback, number, root.right);
        return callback;
    }

    preOrder(callback = [], number, root = this.root)
    {
        if(root === null) return null;
        if(Array.isArray(callback)) callback.push(root.value);
        else callback(root, number);
        this.inOrder(callback, number, root.left);
        this.inOrder(callback, number, root.right);
        return callback;
    }

    postOrder(callback = [], number, root = this.root)
    {
        if(root === null) return null;
        this.inOrder(callback, number, root.left);
        this.inOrder(callback, number, root.right);
        if(Array.isArray(callback)) callback.push(root.value);
        else callback(root, number);
        return callback;
    }

    height(node, maxHeight = 0)
    {
        function findHeights(node, height = 0)
        {
            if(node === null) return;
            else
            {
                if(node.right !== null || node.left !== null)
                {
                    height++;
                    if(maxHeight < height) maxHeight = height;
                }
                findHeights(node.right, height);
                findHeights(node.left, height);
            }
        }

        findHeights(node)

        return maxHeight;
    }

    depth(node, maxDepth = 0, root = this.root)
    {
        function findDepths(node, root, depth = -1)
        {
            if(root === null) return;
            else
            {
                depth++;
                if(node === root && maxDepth < depth)
                {
                    maxDepth = depth;
                }
                findDepths(node, root.right, depth);
                findDepths(node, root.left, depth);
            }
        }

        findDepths(node, root);

        return maxDepth;
    }

    isBalanced(root = this.root, balanced = true)
    {
        function checkIfBalanced(root)
        {
            if(root === null) return;
            else
            if(root.right !== null && root.left === null && (root.right.left != null || root.right.right != null)) balanced = false;
            if(root.left !== null && root.right === null && (root.left.left != null || root.left.right != null)) balanced = false;
            checkIfBalanced(root.right);
            checkIfBalanced(root.left);
    
        }
        checkIfBalanced(root);
        return balanced;
    }

    rebalance()
    {
        const newSortedArray = this.inOrder();
        const newTree = this.buildTree(newSortedArray);
        this.root = newTree;
    }

    increaseValueOfNode(root, number)
    {    
        return root.value = root.value + number;
    }

    findReplacement(root)
    {
        if(root.left === null) return root;
        else return this.findReplacement(root.left);
    }

    adjustArray(array)
    {
        array.sort((a, b) => +a - +b);
        array = this.removeDuplicates(array);
        return this.buildTree(array);
    }

    removeDuplicates(array)
    {
        for(let i = 0; i < array.length - 1; i++)
        {
            if(array[i] === array[i + 1])
            {
                array.splice((i + 1), 1);
                i--;
            }
        }

        return array;
    }

    prettyPrint(node, prefix = "", isLeft = true)
    {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
         this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

// let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let array = [];

while(array.length < 40)
{
    let randNumber = Math.random() * 100 + 1;
    randNumber = Math.floor(randNumber);
    array.push(randNumber);
}

const tree = new Tree(array);
console.log(tree.isBalanced());
console.log(tree.leverOder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
tree.insert(105);
tree.insert(110);
tree.insert(115);
tree.insert(120);
tree.insert(125);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.leverOder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

