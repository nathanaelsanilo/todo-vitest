export class NodeItem<TData = any> {
  private data!: TData
  private next!: NodeItem<TData> | null

  constructor(n: TData) {
    this.data = n
    this.next = null
  }

  hasNext(): boolean {
    return this.next !== null
  }

  setNext(value: NodeItem<TData> | null) {
    this.next = value
  }

  getNext(): NodeItem<TData> | null {
    return this.next
  }

  setData(value: TData): void {
    this.data = value
  }

  getData(): TData {
    return this.data
  }
}

export class SinglyLinkedList<TData> {
  private head!: NodeItem<TData> | null

  constructor(_head: NodeItem<TData> | null = null) {
    this.head = _head
  }

  /**
   * @description count the number of nodes present
   * @returns size
   */
  size(): number {
    let count = 0
    let node = this.head

    while (node) {
      count++
      node = node.getNext()
    }

    return count
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * @description clear the list
   */
  clear(): void {
    this.head = null
  }

  /**
   * @description get the last node from list
   * @returns last node
   */
  getLast(): NodeItem<TData> | null {
    let last_node = this.head

    while (last_node && last_node.hasNext()) {
      last_node = last_node.getNext()
    }

    return last_node
  }

  /**
   * @description get the first node from list
   * @returns first node
   */
  getFirst() {
    return this.head
  }

  /**
   * @description insertion at end of the list
   * @param new_data data of the new node
   */
  append(new_data: TData): this {
    // create new node
    const new_node = new NodeItem(new_data)

    if (!this.head) {
      this.head = new NodeItem(new_data)
      return this
    }

    // iteration from head
    let last: NodeItem<TData> = this.head
    let nextNode = last.getNext()
    while (last && nextNode) {
      last = nextNode
      nextNode = last.getNext()
    }

    last.setNext(new_node)

    return this
  }

  /**
   * @description insertion at the beginning of the list
   * @param new_data data of the new node
   */
  insertFirst(new_data: TData): this {
    // create new node
    const new_node = new NodeItem(new_data)

    // replace new node pointer to current head
    new_node.setNext(this.head)

    // set the current head to new node
    this.head = new_node

    return this
  }

  /**
   * @description insertion at specific location in the list
   * @param prev_node previous node
   * @param new_data data of the new node
   */
  insertAfter(prev_node: NodeItem<TData>, new_data: TData): this {
    // validate the previous node
    if (!prev_node) {
      throw new Error('given node is not exist!')
    }

    // create new node
    const new_node = new NodeItem(new_data)

    // set the next of new node to be
    // next of the previous node
    new_node.setNext(prev_node.getNext())

    // set the next of previous node
    // to be the new node
    prev_node.setNext(new_node)

    return this
  }

  /**
   * @description get node index from the list
   * @param expression compare function
   * @returns index of node if found else -1
   */
  findIndex(expression: (n: TData) => boolean): number {
    const NOT_FOUND = -1
    let current = this.head
    let index = 0
    while (current) {
      if (expression(current.getData())) {
        return index
      }

      current = current.getNext()
      index++
    }

    return NOT_FOUND
  }

  /**
   * @description get node data from the list
   * @param expression compare function
   * @returns node data
   */
  find(expression: (n: TData) => boolean): TData | undefined {
    let current = this.head

    while (current) {
      if (expression(current.getData())) {
        return current.getData()
      }

      current = current.getNext()
    }

    return undefined
  }

  /**
   * @description get node from the list
   * @param expression compare function
   * @returns node
   */
  findNode(expression: (n: TData) => boolean): NodeItem<TData> | undefined {
    let current = this.head

    while (current) {
      if (expression(current.getData())) {
        return current
      }

      current = current.getNext()
    }

    return undefined
  }
}
