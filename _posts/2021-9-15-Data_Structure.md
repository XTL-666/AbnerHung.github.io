---
redirect_from: /_posts/2021-9-15-Data_Structure.md/
title: DataStructure
tags:
  - Java
  - DataStructure
---
# Data Structure

- [Data Structure](#data-structure)
  - [Array](#array)
    - [稀疏数组](#稀疏数组)
    - [时间复杂度](#时间复杂度)
  - [Linked List](#linked-list)
    - [单链表](#单链表)
      - [结点结构](#结点结构)
      - [单链表实现 ](#单链表实现-)
    - [双指针技巧](#双指针技巧)
      - [代码模板](#代码模板)
      - [注意事项](#注意事项)
      - [复杂度分析](#复杂度分析)
    - [环形链表](#环形链表)
      - [LeetCode 141 Linked List Cycle](#leetcode-141-linked-list-cycle)
        - [代码实现](#代码实现)
    - [环形链表II](#环形链表ii)
      - [LeetCode 142 Linked List Cycle II](#leetcode-142-linked-list-cycle-ii)
        - [代码实现](#代码实现-1)
    - [相交链表](#相交链表)
      - [LeetCode 160 相交链表](#leetcode-160-相交链表)
        - [代码实现](#代码实现-2)
    - [删除链表的倒数第N个节点](#删除链表的倒数第n个节点)
        - [代码实现](#代码实现-3)
    - [反转链表](#反转链表)
      - [代码实现](#代码实现-4)
    - [移除链表元素](#移除链表元素)
      - [代码实现](#代码实现-5)
    - [奇偶链表](#奇偶链表)
      - [LeetCode](#leetcode)
        - [代码实现](#代码实现-6)
    - [回文链表](#回文链表)
      - [LeetCode 234 回文链表](#leetcode-234-回文链表)
        - [代码实现](#代码实现-7)
    - [小结 链表经典问题](#小结-链表经典问题)
    - [双链表](#双链表)
      - [结点结构](#结点结构-1)
      - [添加操作](#添加操作)
      - [删除操作](#删除操作)
      - [双链表实现](#双链表实现)
    - [时间复杂度比较](#时间复杂度比较)
    - [合并两个有序链表](#合并两个有序链表)
      - [Leetcode 21 Merge Two Sorted Lists ](#leetcode-21-merge-two-sorted-lists-)
        - [代码实现](#代码实现-8)
    - [两数相加](#两数相加)
      - [Leetcode 2 addTwoNumbers](#leetcode-2-addtwonumbers)
        - [代码实现](#代码实现-9)
    - [ 扁平化多级双向链表](#-扁平化多级双向链表)
      - [LeetCode 430 Flatten a Multilevel Doubly Linked List](#leetcode-430-flatten-a-multilevel-doubly-linked-list)
        - [代码实现](#代码实现-10)
    - [复制带随机指针的链表](#复制带随机指针的链表)
      - [LeetCode 138 Copy List with Random Pointer](#leetcode-138-copy-list-with-random-pointer)
        - [代码实现](#代码实现-11)
    - [旋转链表](#旋转链表)
      - [LeetCode 61 Rotate List ](#leetcode-61-rotate-list-)
        - [代码实现](#代码实现-12)
  - [Stack](#stack)
  - [queue](#queue)
    - [队列实现](#队列实现)
  - [binary-tree](#binary-tree)
  - [binary-search-tree](#binary-search-tree)
  - [balanced-search-tree](#balanced-search-tree)
    - [介绍](#介绍)
    - [AVL 树](#avl-树)
  - [heap](#heap)
  - [trie](#trie)
  - [union-find](#union-find)
  - [hash-table](#hash-table)

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

#### 代码模板

```java
// Initialize slow & fast pointers
ListNode slow = head;
ListNode fast = head;
/**
 * Change this condition to fit specific problem.
 * Attention: remember to avoid null-pointer error
 **/
while (slow != null && fast != null && fast.next != null) {
    slow = slow.next;           // move slow pointer one step each time
    fast = fast.next.next;      // move fast pointer two steps each time
    if (slow == fast) {         // change this condition to fit specific problem
        return true;
    }
}
return false;   // change return value to fit specific problem
```

```c++
// Initialize slow & fast pointers
ListNode* slow = head;
ListNode* fast = head;
/**
 * Change this condition to fit specific problem.
 * Attention: remember to avoid null-pointer error
 **/
while (slow && fast && fast->next) {
    slow = slow->next;          // move slow pointer one step each time
    fast = fast->next->next;    // move fast pointer two steps each time
    if (slow == fast) {         // change this condition to fit specific problem
        return true;
    }
}
return false;   // change return value to fit specific problem
```

#### 注意事项

1.  **在调用 next 字段之前，始终检查节点是否为空。**

获取空节点的下一个节点将导致空指针错误。例如，在我们运行 fast = fast.next.next 之前，需要检查 fast 和 fast.next 不为空。

2.  **仔细定义循环的结束条件。**

#### 复杂度分析

空间复杂度分析容易。如果只使用指针，而不使用任何其他额外的空间，那么空间复杂度将是 O(1)。但是，时间复杂度的分析比较困难。为了得到答案，我们需要分析运行循环的次数。

在前面的查找循环示例中，假设我们每次移动较快的指针 2 步，每次移动较慢的指针 1 步。

1. 如果没有循环，快指针需要 N/2 次才能到达链表的末尾，其中 N 是链表的长度。
2. 如果存在循环，则快指针需要 M 次才能赶上慢指针，其中 M 是列表中循环的长度。

显然，M <= N 。所以我们将循环运行 N 次。对于每次循环，我们只需要常量级的时间。因此，该算法的时间复杂度总共为 O(N)。



### 环形链表

#### LeetCode 141 Linked List Cycle

给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 `pos` 是 `-1`，则在该链表中没有环。**注意：`pos` 不作为参数进行传递**，仅仅是为了标识链表的实际情况。

要求： *O(1)*（即，常量）内存解决

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

**输入：**head = [3,2,0,-4], pos = 1
**输出：**true
**解释：**链表中有一个环，其尾部连接到第二个节点。

**提示：**

- 链表中节点的数目范围是 `[0, 10^4]`
- `-10^5 <= Node.val <= 10^5`
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

### 环形链表II

#### LeetCode 142 Linked List Cycle II

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

说明：不允许修改给定的链表。使用 O(1) 空间解决此题

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

**输入**：head = [3,2,0,-4], pos = 1
**输出**：返回索引为 1 的链表节点
**解释**：链表中有一个环，其尾部连接到第二个节点。

**提示：**

- 链表中节点的数目范围是 `[0, 10^4]`
- `-10^5 <= Node.val <= 10^5`
- `pos` 为 `-1` 或者链表中的一个 **有效索引** 。

##### 代码实现

先设置fast指针速度为slow的两倍，头结点到入环点距离设为x，入环点到相遇点距离设为y，相遇点回到入环点距离设置为z;
slow走x+y到达相遇点，此时fast多走了n圈，即走了x+y+n(y+z)，由于fast速度比slow快两倍，则有：`2(x+y)=x+y+n(y+z)` 
可化为`x+y=n(y+z)`，这说明头节点到相遇点距离为环长度的整数倍，即，以同一速度分别从头结点和相遇点出发，必定会在相遇点再次相遇。此时返回相遇点的结点。

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
    public ListNode detectCycle(ListNode head) {
        ListNode fast = head;
        ListNode slow = head;
        while (fast!=null&&fast.next!=null)
        { //找到第一次相遇点
            fast = fast.next.next;
            slow = slow.next;
            if(fast==slow)
            {
                break;
            }
        }
        if(fast==null||fast.next==null){return null;} // 不存在环返回null
        fast = head;        //将一个指针移回头
        while(fast!=slow)   //下次相遇点为入环点
        {
            fast = fast.next;
            slow = slow.next;
        }
        return fast;
    }
}
```



### 相交链表

#### LeetCode 160 相交链表

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

图示两个链表在节点 c1 开始相交：

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)

题目数据 **保证** 整个链式结构中不存在环。

**注意**，函数返回结果后，链表必须 **保持其原始结构** 。

![](https://assets.leetcode.com/uploads/2018/12/13/160_example_1.png)

**输入**：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
**输出**：Intersected at '8'
**解释**：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

<img src="https://assets.leetcode.com/uploads/2018/12/13/160_example_3.png" style="zoom:80%;" />

**输入**：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
**输出**：null
**解释**：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null 。

提示：

- listA 中节点数目为 m
- listB 中节点数目为 n
- 0 <= m, n <= 3 * 104
- 1 <= Node.val <= 105
- 0 <= skipA <= m
- 0 <= skipB <= n
- 如果 listA 和 listB 没有交点，intersectVal 为 0
- 如果 listA 和 listB 有交点，intersectVal == listA[skipA + 1] == listB[skipB + 1]

设计一个时间复杂度 O(n) 、仅用 O(1) 内存的解决方案



##### 代码实现

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        int i=0,j=0;
        ListNode p1 = headA;
        ListNode p2 = headB;
        for(i=0;p1!=null;i++)
        {
            p1 = p1.next;
        }
        for(j=0;p2!=null;j++)
        {
            p2 = p2.next;
        }
        i=i-j;
        p1 = headA;
        p2 = headB;
        for(;p1!=null&&p2!=null;)
        {
            if(i>0)
            {
                p1 = p1.next;
                i--;
            }
            else if(i<0)
            {
                p2 = p2.next;
                i++;
                
            }
            else{
                break;
            }
            
        }
        for(;p1!=null&&p2!=null;){
            
            if(p1==p2)
            {
                return p1;
            }
            p1 = p1.next;
            p2 = p2.next;
        }
        if(p1==null&&p2==null)
        {
            return null;
        }
        return p1;
    }
}
```

O(m+n) O(1)

另解

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode p1 = headA, p2 = headB;
        //变轨次数
        int cnt=0;
        while (p1 != null && p2 != null) {
            if (p1 == p2) return p1;
            p1 = p1.next;
            p2 = p2.next;
            //p1变轨
            if(cnt<2&&p1==null){
                p1=headB;
                cnt++;
            }
            //p2变轨
            if(cnt<2&&p2==null){
                p2=headA;
                cnt++;
            }
        }
        return null;
    }
```



### 删除链表的倒数第N个节点

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**进阶：** 使用一趟扫描实现

![](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```bash
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**提示：**

- 链表中结点的数目为 `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

##### 代码实现

使用双指针，距离为n，考虑到一个结点的情况，new一个指向头结点的指针（虽然java中不是指针）

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode newhead = new ListNode(0,head);
        ListNode slow = newhead;
        ListNode fast = head;
        for(int i=0;i<n;i++)
        {
            fast=fast.next;
        }
        while(fast!=null)
        {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next=slow.next.next;
        return newhead.next;
    }
}
```



### 反转链表

#### 代码实现

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode pre = null;
        ListNode cur = head;
        while(cur!=null)
        {
            ListNode fuck = null;
            fuck = cur.next;
            cur.next = pre;
            pre = cur;
            cur = fuck;
        }
        return pre;
    }
}
```

### 移除链表元素

给你一个链表的头节点 `head` 和一个整数 `val` ，请你删除链表中所有满足 `Node.val == val` 的节点，并返回 **新的头节点** 。

```bash
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

#### 代码实现

递归：

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if(head==null)
        {
            return head;
        }
        head.next=removeElements(head.next,val);
        return head.val == val ? head.next:head;
    }
}
```

循环：

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if(head==null)
        {
            return head;
        }
        ListNode tmp= new ListNode (0,head);
        head = tmp;
        while(tmp!=null&&tmp.next!=null){
           if(tmp.next.val == val){
               tmp.next=tmp.next.next;
               continue;
           }
           tmp = tmp.next;
        }
        
        return head.next;
    }
}
```

### 奇偶链表

#### LeetCode

给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

示例 1:

输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL
示例 2:

输入: 2->1->3->5->6->4->7->NULL 
输出: 2->3->6->7->1->5->4->NULL
说明:

应当保持奇数节点和偶数节点的相对顺序。
链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。

##### 代码实现

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode oddEvenList(ListNode head) {
        if(head==null||head.next==null||head.next.next==null)
        {
            return head;
        }
        ListNode fu = head;
        ListNode ck = head.next;
        ListNode fuck = ck;
        while (ck!=null&&ck.next!=null)
        {
            fu.next = fu.next.next;
            ck.next = ck.next.next;
            fu = fu.next;
            ck = ck.next;
        }
        if(fu.next!=null)
        {
            fu.next=fu.next.next;
        }
        fu.next=fuck;
        return head;
    }
}
```

### 回文链表

#### LeetCode 234 回文链表

给你一个单链表的头节点 `head` ，请你判断该链表是否为回文链表。如果是，返回 `true` ；否则，返回 `false` 。

##### 代码实现

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public boolean isPalindrome(ListNode head) {
        if(head == null || head.next == null) {
            return true;
        }
        ListNode slow = head;
        ListNode fast = head;
        ListNode pre = null;
        while(fast!=null&&fast.next!=null){
            fast=fast.next.next;
            ListNode tmp = slow.next;
            slow.next=pre;
            pre = slow;
            slow = tmp;
        }
        if(fast != null) {
            slow = slow.next;
        }
        while(pre!=null&&slow!=null){
            if(pre.val!=slow.val){
                return false;
            }
            pre = pre.next;
            slow = slow.next;
        }
        return true;
    }
   
}
```

### 小结 链表经典问题

> 1. 通过一些测试用例可以节省您的时间。
>
> 使用链表时不易调试。因此，在编写代码之前，自己尝试几个不同的示例来验证您的算法总是很有用的。
>
> 2. 你可以同时使用多个指针。
>
> 有时，当你为链表问题设计算法时，可能需要同时跟踪多个结点。您应该记住需要跟踪哪些结点，并且可以自由地使用几个不同的结点指针来同时跟踪这些结点。
>
> 如果你使用多个指针，最好为它们指定适当的名称，以防将来必须调试或检查代码。
>
> 3. 在许多情况下，你需要跟踪当前结点的前一个结点。
>
> 你无法追溯单链表中的前一个结点。因此，您不仅要存储当前结点，还要存储前一个结点。这在双链表中是不同的，我们将在后面的章节中介绍。
>
> 作者：力扣 (LeetCode)
> 链接：https://leetcode-cn.com/leetbook/read/linked-list/fraqr/
> 来源：力扣（LeetCode）

### 双链表

#### 结点结构

```java
// Definition for doubly-linked list.
class DoublyListNode {
    int val;
    DoublyListNode next, prev;
    DoublyListNode(int x) {val = x;}
}
```

```c++
// Definition for doubly-linked list.
struct DoublyListNode {
    int val;
    DoublyListNode *next, *prev;
    DoublyListNode(int x) : val(x), next(NULL), prev(NULL) {}
};
```

#### 添加操作

如果我们想在现有的结点 `prev` 之后插入一个新的结点 `cur`，我们可以将此过程分为两个步骤：

1. 链接 `cur` 与 `prev` 和 `next`，其中 `next` 是 `prev` 原始的下一个节点；

   <img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/04/28/screen-shot-2018-04-28-at-173045.png" style="zoom:50%;" />

2. 用 `cur` 重新链接 `prev` 和 `next`。

   <img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/04/29/screen-shot-2018-04-28-at-173055.png" style="zoom:67%;" />

#### 删除操作

![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/04/18/screen-shot-2018-04-18-at-142428.png)

#### 双链表实现

LeetCode官方源码

```java
public class ListNode {
  int val;
  ListNode next;
  ListNode prev;
  ListNode(int x) { val = x; }
}

class MyLinkedList {
  int size;
  // sentinel nodes as pseudo-head and pseudo-tail
  ListNode head, tail;
  public MyLinkedList() {
    size = 0;
    head = new ListNode(0);
    tail = new ListNode(0);
    head.next = tail;
    tail.prev = head;
  }

  /** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
  public int get(int index) {
    // if index is invalid
    if (index < 0 || index >= size) return -1;

    // choose the fastest way: to move from the head
    // or to move from the tail
    ListNode curr = head;
    if (index + 1 < size - index)
      for(int i = 0; i < index + 1; ++i) curr = curr.next;
    else {
      curr = tail;
      for(int i = 0; i < size - index; ++i) curr = curr.prev;
    }

    return curr.val;
  }

  /** Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. */
  public void addAtHead(int val) {
    ListNode pred = head, succ = head.next;

    ++size;
    ListNode toAdd = new ListNode(val);
    toAdd.prev = pred;
    toAdd.next = succ;
    pred.next = toAdd;
    succ.prev = toAdd;
  }

  /** Append a node of value val to the last element of the linked list. */
  public void addAtTail(int val) {
    ListNode succ = tail, pred = tail.prev;

    ++size;
    ListNode toAdd = new ListNode(val);
    toAdd.prev = pred;
    toAdd.next = succ;
    pred.next = toAdd;
    succ.prev = toAdd;
  }

  /** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
  public void addAtIndex(int index, int val) {
    // If index is greater than the length, 
    // the node will not be inserted.
    if (index > size) return;

    // [so weird] If index is negative, 
    // the node will be inserted at the head of the list.
    if (index < 0) index = 0;

    // find predecessor and successor of the node to be added
    ListNode pred, succ;
    if (index < size - index) {
      pred = head;
      for(int i = 0; i < index; ++i) pred = pred.next;
      succ = pred.next;
    }
    else {
      succ = tail;
      for (int i = 0; i < size - index; ++i) succ = succ.prev;
      pred = succ.prev;
    }

    // insertion itself
    ++size;
    ListNode toAdd = new ListNode(val);
    toAdd.prev = pred;
    toAdd.next = succ;
    pred.next = toAdd;
    succ.prev = toAdd;
  }

  /** Delete the index-th node in the linked list, if the index is valid. */
  public void deleteAtIndex(int index) {
    // if the index is invalid, do nothing
    if (index < 0 || index >= size) return;

    // find predecessor and successor of the node to be deleted
    ListNode pred, succ;
    if (index < size - index) {
      pred = head;
      for(int i = 0; i < index; ++i) pred = pred.next;
      succ = pred.next.next;
    }
    else {
      succ = tail;
      for (int i = 0; i < size - index - 1; ++i) succ = succ.prev;
      pred = succ.prev.prev;
    }

    // delete pred.next 
    --size;
    pred.next = succ;
    succ.prev = pred;
  }
}
```



### 时间复杂度比较

![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/04/29/screen-shot-2018-04-28-at-174531.png)

### 合并两个有序链表

#### Leetcode 21 Merge Two Sorted Lists 

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

![](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

```bash
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

##### 代码实现

递归写法

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1==null){
            return l2;
        }
        else if(l2==null){
            return l1;
        }
        if(l1.val>=l2.val){
            l2.next = mergeTwoLists(l1,l2.next);
            return l2;
        }
        else{
            l1.next = mergeTwoLists(l1.next,l2);
            return l1;
        }
    }
}
```

### 两数相加

#### Leetcode 2 addTwoNumbers

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg)



```bash
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

##### 代码实现

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode out = dummy;
        int sum = 0;
        for(;(l1!=null)||(l2!=null);)
        {
            if(l1!=null)
            {
                sum+=l1.val;
                l1=l1.next;
            }
            if(l2!=null)
            {
                sum+=l2.val;
                l2=l2.next;
            }
            out.next = new ListNode(sum%10);
            sum/=10;
            out=out.next;
        }
        if(sum>0)
        {
            out.next = new ListNode(1);
        }
        return dummy.next;
    }

}
```

###  扁平化多级双向链表

#### LeetCode 430 Flatten a Multilevel Doubly Linked List

多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。

给你位于列表第一级的头节点，请你扁平化列表，使所有结点出现在单级双链表中。

```baah
输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
输出：[1,2,3,7,8,11,12,9,10,4,5,6]
解释：
```

输入的多级列表如下图所示：

[![eg1](https://raw.githubusercontent.com/Ray-56/image-service/master/picgo/20201027/104455.png)](https://raw.githubusercontent.com/Ray-56/image-service/master/picgo/20201027/104455.png)

扁平化后的链表如下图：

[![eg2](https://raw.githubusercontent.com/Ray-56/image-service/master/picgo/20201027/104604.png)](https://raw.githubusercontent.com/Ray-56/image-service/master/picgo/20201027/104604.png)

示例 2:

```bash
输入：head = [1,2,null,3]
输出：[1,3,2]
解释：

输入的多级列表如下图所示：

  1---2---NULL
  |
  3---NULL
```

示例3：

```bash
输入：head = []
输出：[]
```

**如何表示测试用例中的多级链表？**

以 示例 1 为例：

```bash
 1---2---3---4---5---6--NULL
         |
         7---8---9---10--NULL
             |
             11--12--NULL
```

序列化其中的每一级之后：

```bash
[1,2,3,4,5,6,null]
[7,8,9,10,null]
[11,12,null]
```

为了将每一级都序列化到一起，我们需要每一级中添加值为 null 的元素，以表示没有节点连接到上一级的上级节点。

```bash
[1,2,3,4,5,6,null]
[null,null,7,8,9,10,null]
[null,11,12,null]
```

合并所有序列化结果，并去除末尾的 null 。

```bash
[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
```

##### 代码实现

dfs遍历

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
};
*/

class Solution {
    private Node fuck = new Node(0);
    public Node flatten(Node head) {
        dfs(head);
        if(head!=null){
            head.prev = null;
        }
        return head;
    }
    private void dfs(Node x){
        if(x==null)
        {
            return;
        }
        Node l = x.child;
        Node r = x.next;
        fuck.next = x;
        x.prev = fuck;
        fuck = x;
        dfs(l);
        x.child = null;
        dfs(r);
    }

}
```

### 复制带随机指针的链表

#### LeetCode 138 Copy List with Random Pointer

给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。

要求返回这个链表的 **深拷贝**。

```text
输入：
{"$id":"1","next":{"$id":"2","next":null,"random":{"$ref":"2"},"val":2},"random":{"$ref":"2"},"val":1}

解释：
节点 1 的值是 1，它的下一个指针和随机指针都指向节点 2 。
节点 2 的值是 2，它的下一个指针指向 null，随机指针指向它自己。
```

**提示：**

1. 你必须返回**给定头的拷贝**作为对克隆列表的引用。

##### 代码实现

时间和空间都是O(N)的算法，维护一个HashMap存结点对应关系；

```java
/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/

class Solution {
    public Node copyRandomList(Node head) {
        Node NewNode;
        Node temp = head;
        HashMap<Node, Node> m = new HashMap<>();
        while(temp!=null){
            NewNode = new Node(temp.val);
            m.put(temp,NewNode);
            temp = temp.next;
        }
        temp = head;
        NewNode = m.get(temp);
        while(temp!=null)
        {
            NewNode.next = m.get(temp.next);
            NewNode.random = m.get(temp.random);
            temp = temp.next;
            NewNode = NewNode.next;
        }
        return m.get(head);
    }
}
```

Better solution : 新链表每个结点分别插入在新链表每个结点右边，一次遍历得到一个新旧结点交替的链表，再次遍历根据旧结点random指针，让新结点random指针指向对应节点。再遍历一次逻辑删除旧结点。

时间：O(N)  ；空间： O(1)



### 旋转链表

#### LeetCode 61 Rotate List 

给你一个链表的头节点 `head` ，旋转链表，将链表每个节点向右移动 `k` 个位置。

![](https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg)

```
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]
```

##### 代码实现

构成环形链表，在合适的地方断开。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if(head==null||head.next==null){
            return head;
        }
        ListNode temp = head;
        int counter = 1;
        while(temp.next!=null){
            counter++;
            temp = temp.next;
        }
        if(k==counter){
            return head;
        }

        temp.next = head;
        temp = head;
        
        k%=counter;
        counter -= k;

        counter--;
        while((counter--)>0)
        {
            temp = temp.next;
        }
        head = temp.next;
        temp.next = null;
        return head;
    }
}
```



## Stack









## queue

<img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/08/14/screen-shot-2018-05-03-at-151021.png" style="zoom:50%;" />

​    在 FIFO 数据结构中，将`首先处理添加到队列中的第一个元素`。

​    如上图所示，队列是典型的 FIFO 数据结构。插入（insert）操作也称作入队（enqueue），新元素始终被添加在`队列的末尾`。 删除（delete）操作也被称为出队（dequeue)。 你只能移除`第一个元素`。

入队与出队

![](https://pic.leetcode-cn.com/44b3a817f0880f168de9574075b61bd204fdc77748d4e04448603d6956c6428a-%E5%87%BA%E5%85%A5%E9%98%9F.gif)

### 队列实现

```java
// "static void main" must be defined in a public class.

class MyQueue {
    // store elements
    private List<Integer> data;         
    // a pointer to indicate the start position
    private int p_start;            
    public MyQueue() {
        data = new ArrayList<Integer>();
        p_start = 0;
    }
    /** Insert an element into the queue. Return true if the operation is successful. */
    public boolean enQueue(int x) {
        data.add(x);
        return true;
    };    
    /** Delete an element from the queue. Return true if the operation is successful. */
    public boolean deQueue() {
        if (isEmpty() == true) {
            return false;
        }
        p_start++;
        return true;
    }
    /** Get the front item from the queue. */
    public int Front() {
        return data.get(p_start);
    }
    /** Checks whether the queue is empty or not. */
    public boolean isEmpty() {
        return p_start >= data.size();
    }     
};

public class Main {
    public static void main(String[] args) {
        MyQueue q = new MyQueue();
        q.enQueue(5);
        q.enQueue(3);
        if (q.isEmpty() == false) {
            System.out.println(q.Front());
        }
        q.deQueue();
        if (q.isEmpty() == false) {
            System.out.println(q.Front());
        }
        q.deQueue();
        if (q.isEmpty() == false) {
            System.out.println(q.Front());
        }
    }
}
```

```c++
#include <iostream>

class MyQueue {
    private:
        // store elements
        vector<int> data;       
        // a pointer to indicate the start position
        int p_start;            
    public:
        MyQueue() {p_start = 0;}
        /** Insert an element into the queue. Return true if the operation is successful. */
        bool enQueue(int x) {
            data.push_back(x);
            return true;
        }
        /** Delete an element from the queue. Return true if the operation is successful. */
        bool deQueue() {
            if (isEmpty()) {
                return false;
            }
            p_start++;
            return true;
        };
        /** Get the front item from the queue. */
        int Front() {
            return data[p_start];
        };
        /** Checks whether the queue is empty or not. */
        bool isEmpty()  {
            return p_start >= data.size();
        }
};

int main() {
    MyQueue q;
    q.enQueue(5);
    q.enQueue(3);
    if (!q.isEmpty()) {
        cout << q.Front() << endl;
    }
    q.deQueue();
    if (!q.isEmpty()) {
        cout << q.Front() << endl;
    }
    q.deQueue();
    if (!q.isEmpty()) {
        cout << q.Front() << endl;
    }
}
```

**缺点**

上面的实现很简单，但在某些情况下效率很低。 随着起始指针的移动，浪费了越来越多的空间。 当我们有空间限制时，这将是难以接受的。

![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/21/screen-shot-2018-07-21-at-153558.png)

让我们考虑一种情况，即我们只能分配一个最大长度为 5 的数组。当我们只添加少于 5 个元素时，我们的解决方案很有效。 例如，如果我们只调用入队函数四次后还想要将元素 10 入队，那么我们可以成功。

但是我们不能接受更多的入队请求，这是合理的，因为现在队列已经满了。但是如果我们将一个元素出队呢？

![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/21/screen-shot-2018-07-21-at-153713.png)

实际上，在这种情况下，我们应该能够再接受一个元素。

<div><div><div class="css-hgmg3m-Container e1l4e1yy0"><img src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide48.png" class="css-58ju5r-Img e1l4e1yy1"><img src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide49_2.png" class="css-58ju5r-Img e1l4e1yy1" hidden=""><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide50.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide51.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide52.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide53.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide54.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide55.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide56.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide57.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide58.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide59.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide60.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide61.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide62.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide63.png" class="css-58ju5r-Img e1l4e1yy1"><img hidden="" src="https://pic.leetcode-cn.com/Figures/circular_queue/Slide64.png" class="css-58ju5r-Img e1l4e1yy1"></div><div class="css-y1zd58-Container e2y5b7y0"><svg viewBox="0 0 24 24" width="1em" height="1em" class="e2y5b7y2 css-2gwest-icon-Button-AutoPlayButton"><defs><path id="play-arrow_svg__a" d="M8 5v14l11-7z"></path><mask id="play-arrow_svg__b"><use fill-rule="evenodd" xlink:href="#play-arrow_svg__a"></use></mask></defs><g fill-rule="evenodd"><use xlink:href="#play-arrow_svg__a"></use><g fill-rule="nonzero" mask="url(#play-arrow_svg__b)"><path d="M0 0h24v24H0z"></path></g></g></svg><svg viewBox="0 0 24 24" width="1em" height="1em" class="e2y5b7y1 css-bs8j34-icon-Button"><path d="M18 18l-8.5-6L18 6zM8 6v12H6V6z"></path></svg><span class="css-iq4chg-Indicator e2y5b7y3">1 / 17</span><svg viewBox="0 0 24 24" width="1em" height="1em" class="e2y5b7y1 css-bs8j34-icon-Button"><path d="M6 18l8.5-6L6 6zM16 6v12h2V6z"></path></svg></div></div></div>

















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

