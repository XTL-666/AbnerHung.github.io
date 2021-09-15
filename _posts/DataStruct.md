# Data Structure

* [数组](#array)
* [链表](#linked-list)
* [栈](#stack)
* [队列](#queue)
* [二叉树](#binary-tree)
* [二叉搜索树](#binary-search-tree)
* [平衡查找树](#balanced-search-tree)
* [堆](#heap)
* [字典树](#trie)
* [并查集](#union-find)
* [哈希表](#hash-table)

## Array

### 稀疏数组

一个经典的demo：

```java
package d2j.jse.datastructures;

public class SparseArray {
    public static void main(String[] args) {
        //以棋盘为例
        //创建一个原始的二维数组 11*11
        //0:没有棋子；1:黑；2:白
        int[][] chessArr1 = new int[11][11];
        chessArr1[1][2] = 1;
        chessArr1[2][3] = 2;
        chessArr1[5][4] = 2;
        System.out.println("原始的二维数组：");
        for(int[] row : chessArr1){
            for (int data : row){
                System.out.printf("%d\t", data);
            }
            System.out.println();
        }
        //二维数组转稀疏数组
        //1.先遍历二维数组 得到非0数据的个数
        int sum = 0;
        for (int[] ints : chessArr1) {
            for (int j = 0; j < chessArr1.length; j++) {
                if (ints[j] != 0) {
                    sum++;
                }
            }
        }
        //2.创建对应的稀疏数组
        int[][] sparseArr = new int[sum + 1][3];
        //给系数数组赋值
        sparseArr[0][0] = 11;
        sparseArr[0][1] = 11;
        sparseArr[0][2] = sum;
        //遍历二维数组，将非0的值存放到sparseArr中
        int k=0;
        for (int i = 0; i < chessArr1.length; i++) {
            for (int j = 0; j < chessArr1.length; j++) {
                if(chessArr1[i][j] != 0)
                {
                    k++;
                    sparseArr[k][0] = i;
                    sparseArr[k][1] = j;
                    sparseArr[k][2] = chessArr1[i][j];
                }
            }
        }
        //输出稀疏数组
        System.out.println("\n得到的稀疏数组为：");
        for (int[] i:sparseArr) {
            System.out.printf("%d\t%d\t%d\n",i[0],i[1],i[2]);
        }
        //稀疏数组转二维数组
        //先读取稀疏数组的第一行，创建二维数组
        int[][] chessArr2 = new int[sparseArr[0][0]][sparseArr[0][1]];
        for (int[] i:sparseArr) {
            if(i[0]!=sparseArr[0][0])
            {
                chessArr2[i[0]][i[1]] = i[2];
            }
        }
        System.out.println("\n恢复后的二维数组：");
        for(int[] row : chessArr2){
            for (int data : row){
                System.out.printf("%d\t", data);
            }
            System.out.println();
        }
    }
}

```

### 时间复杂度

- 在数组的**末尾插入/删除**、**更新**、**获取**某个位置的元素，都是 O(1) 的时间复杂度
- 在数组的任何其它地方**插入/删除**元素，都是 O(n) 的时间复杂度
- 空间复杂度：O(n)



## Linked List

与数组相似，链表也是一种线性数据结构。这里有一个例子：
<img src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/12/screen-shot-2018-04-12-at-152754.png" style="zoom:60%;"/>
正如你所看到的，链表中的每个元素实际上是一个单独的对象，而所有对象都通过每个元素中的引用字段链接在一起。
链表有两种类型：单链表和双链表。上面给出的例子是一个单链表，这里有一个双链表的例子：

<img src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/17/screen-shot-2018-04-17-at-161130.png" style="zoom:60%;" />

### 单链表

单链表中的每个结点不仅包含值，还包含链接到下一个结点的`引用字段`。通过这种方式，单链表将所有结点按顺序组织起来。如上图：蓝色箭头显示单个链接列表中的结点是如何组合在一起的。

#### 结点结构

```java
// Definition for singly-linked list.
public class SinglyListNode {
    int val;
    SinglyListNode next;
    SinglyListNode(int x) { val = x; }
}
```

在大多数情况下，使用头结点(第一个结点)来表示整个列表。

#### 单链表实现 

> LeetCode 707 Design Linked List
>
> 设计链表的实现。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。
>
> 在链表类中实现这些功能：
>
> `get(index)`：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
> `addAtHead(val)`：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
> `addAtTail(val)`：将值为 val 的节点追加到链表的最后一个元素。
> `addAtIndex(index,val)`：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
> `deleteAtIndex(index)`：如果索引 index 有效，则删除链表中的第 index 个节点。

```java
class Node{
    public int val;
    public Node next;
    public Node(int val){
        this.val = val;
        this.next = null;
    }
}

class MyLinkedList {
    Node head = null;
    int size;
    /** Initialize your data structure here. */
    public MyLinkedList() {
        this.size = 0;
        this.head = null;
    }
    
    /** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
    public int get(int index) {
        if(index<0||index>=size)
        {
            return -1;
        }
        Node tmp = head;
        for(int i=1;i<=index;i++)
        {
            tmp=tmp.next;
        }
        return tmp.val;
    }
    
    /** Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. */
    public void addAtHead(int val) {
        Node p = new Node(val);
        p.next = head;
        head = p;
        size++;
    }
    
    /** Append a node of value val to the last element of the linked list. */
    public void addAtTail(int val) {
        Node p = new Node(val);
        if(size==0)
        {
            head = p;
            size++;
            return;
        }
        else
        {
            Node tmp = head;
            while(tmp.next!=null)
            {
                tmp=tmp.next;
            }
            
            tmp.next=p;
            p.next=null;
            size++;
        }
        
    }
    
    /** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
    public void addAtIndex(int index, int val) {
        Node p = new Node(val);
        if(index==size){
            addAtTail(val);
            return;
        }
        else if(index<=0)
        {
            addAtHead(val);
            return;
        }
        else if(index>size)
        {
            return;
        }
        Node tmp=head;
        for(int i=1;i<index;i++)
        {
            tmp=tmp.next;
        }
        p.next = tmp.next;
        tmp.next = p;
        size++;
    }
    
    /** Delete the index-th node in the linked list, if the index is valid. */
    public void deleteAtIndex(int index) {
        if(index<0||index>=size)
        {
            return;
        }
        if(index==0)
        {
            head=head.next;
            size--;
            return;
        }
        Node tmp=head;
        for(int i=1;i<index;i++)
        {
            tmp=tmp.next;
        }
        tmp.next = tmp.next.next;
        size--;
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
```

### 双指针技巧

> 给定一个链表，判断链表中是否有环。

想象一下，有两个速度不同的跑步者。如果他们在直路上行驶，快跑者将首先到达目的地。但是，如果它们在圆形跑道上跑步，那么快跑者如果继续跑步就会追上慢跑者。

这正是我们在链表中使用两个速度不同的指针时会遇到的情况：

1. 如果没有环，快指针将停在链表的末尾。
2. 如果有环，快指针最终将与慢指针相遇。

> 这两个指针的适当速度应该是多少？

一个安全的选择是每次移动慢指针一步，而移动快指针两步。每一次迭代，快速指针将额外移动一步。如果环的长度为 M，经过 M 次迭代后，快指针肯定会多绕环一周，并赶上慢指针。

### 环形链表

#### LeetCode 141 Linked List Cycle

<p>给定一个链表，判断链表中是否有环。</p>

<p>如果链表中有某个节点，可以通过连续跟踪 <code>next</code> 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 <code>pos</code> 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 <code>pos</code> 是 <code>-1</code>，则在该链表中没有环。<strong>注意：<code>pos</code> 不作为参数进行传递</strong>，仅仅是为了标识链表的实际情况。</p>

要求： *O(1)*（即，常量）内存解决

<p><img style="height: 97px; width: 300px;" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png" alt=""></p>

<pre><strong>输入：</strong>head = [3,2,0,-4], pos = 1
<strong>输出：</strong>true
<strong>解释：</strong>链表中有一个环，其尾部连接到第二个节点。

**提示：**

- 链表中节点的数目范围是 `[0, 104]`
- `-105 <= Node.val <= 105`
- `pos` 为 `-1` 或者链表中的一个 **有效索引** 。

##### 代码实现

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode fast = head;
        try {
            while(fast.next.next!=null)
            {
                head=head.next;
                fast=fast.next.next;
                if(fast.next==head.next)
                {
                    return true;
                }
            }
        } catch (NullPointerException e) {
            return false;
        }        
        return false;
    }
}
```





## Stack













## queue











## binary-tree









## binary-search-tree











## balanced-search-tree

### 介绍

使用二叉搜索树对某个元素进行查找，虽然平均情况下的时间复杂度是 O(log n)，但是最坏情况下（当所有元素都在树的一侧时）的时间复杂度是 O(n)。因此有了**平衡查找树（Balanced Search Tree）**，平均和最坏情况下的时间复杂度都是 O(log n)

平衡因子（Balance Factor, BF）的概念：左子树高度与右子树高度之差

平衡查找树有很多不同的实现方式：

- AVL 树
- 2-3查找树
- 伸展树
- 红黑树
- B树（也写成B-树，B-tree，中间的“-”代表杠）
- B+ 树

### AVL 树

也叫平衡二叉树（Balanced Binary Tree），AVL是提出这种数据结构的数学家。概念是对于所有结点，BF 的绝对值小于等于1，即**左、右子树的高度之差的绝对值小于等于1**

> 在各种平衡查找树当中，AVL 树和2-3树已经成为了过去，而红黑树（red-black trees）看似变得越来越受人青睐            —— Skiena

AVL 树在实际中并没有太多的用途，可支持 O(log n) 的查找、插入、删除，它比红黑树严格意义上更为平衡，从而导致插入和删除更慢，但遍历却更快。适合用于只需要构建一次，就可以在不重新构造的情况下读取的情况。









## heap















## trie









## union-find









## hash-table

[见Java基础部分](./Java基础/#hashmap)

