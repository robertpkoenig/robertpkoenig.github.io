import { LLNode } from "./LLNode";

interface IteratorResult<Type> {
    done: boolean,
    value: Type
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
}

class LinkedList<Type> {

    head: LLNode<Type>
    tail: LLNode<Type>
    collisionStart: LLNode<Type>

    constructor() {
        this.head = null
        this.tail = null
        this.collisionStart = null
    }

    addFirst(value: Type) {
        const newHead = new LLNode<Type>(value, null, this.head)
        if (this.head != null) this.head.prev = newHead
        this.head = newHead
        if (this.tail == null) this.tail = newHead
    }

    addLast(value: Type) {
        const newTail = new LLNode<Type>(value, this.tail, null)
        if (this.tail != null) this.tail.next = newTail 
        this.tail = newTail
        if (this.head == null) this.head = newTail
    }

    getFirst(): Type {
        return this.head.value
    }

    getLast(): Type {
        return this.tail.value
    }

    removeFirst() {
        if (this.head == null) throw new Error("no head to remove");
        
        if (this.head == this.tail) this.tail = null
        const prevHead = this.head
        this.head = this.head.next
        prevHead.next = null
    }

    removeLast() {
        if (this.tail == null) throw new Error("no tail to remove");

        if (this.head == this.tail) this.head = null
        this.tail = this.tail.prev
        this.tail.next = null
    }

    get(index: number) {
        if (index < 0) throw new Error("Index outside range");
        
        let currIndex = 0
        for (const node of this) {
            if (currIndex == index) return node
            currIndex++
        }
        throw new Error("Index outside range");
    }

    [Symbol.iterator]() {
        let currNode = this.head
        
        return {
            next: () => {
                if (currNode == null) {
                    return  { 
                                done: true,
                                value: null
                            }
                }
                else {
                        const nextNode =  { 
                                    done: false,
                                    value: currNode.value
                                }
                        currNode = currNode.next                        
                        return nextNode
                     }
            }
        }
    }

}

export { LinkedList }