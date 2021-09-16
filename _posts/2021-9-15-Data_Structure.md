---
redirect_from: /_posts/2021-9-15-Data_Structure.md/
title: DataStructure
tags:
  - Java
  - DataStructure
---

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

