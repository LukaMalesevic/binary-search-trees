class Node
{
    constructor(value, left, right)
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

    buildTree(array, leftArray = [], rightArray = [], middle = 0)
    {   
        middle = Math.floor(array.length / 2);
        leftArray = array.slice(0, middle);
        rightArray = array.slice(middle + 1, array.length);
        
        // console.log(array[middle]);
        // console.log(leftArray);
        // console.log(rightArray);

        return array;
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

    prettyPrint = (node, prefix = "", isLeft = true) => 
    {
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
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);
console.log(tree.root);

