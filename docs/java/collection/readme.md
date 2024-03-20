---
index : false
dir :
    order : 4
---
# Java 集合框架

![](../../../assets/readme/2024-03-20-12-37-51.png)

Java 中的集合框架的继承和实现大体上如上图所示，但有部分类的接口实现不止一个，这里为了尽可能清晰的展现层次结构，仅保留了最核心的实现接口，如需查看完整的集合框架图可自行在IDEA中查看。

## Collection

- List
    - ArrayList
    - LinkedList
    - Vetor
        - Stack
- Set
    - HashSet
        - LinkedHashSet
    - TreeSet
- Queue
    - LinkedList
    - PriorityQueue


## Map

- HashMap
    - LinkedHashMap
- HashTable
- TreeMap


## 参考资料

- Pdai：https://pdai.tech/md/java/collection/java-collection-ArrayList.html