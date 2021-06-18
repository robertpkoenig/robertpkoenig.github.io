class LLNode<Type> {

    public value: Type
    public prev: LLNode<Type>
    public next: LLNode<Type>

    constructor(value: Type, prev: LLNode<Type>, next: LLNode<Type>) {

        this.value = value
        this.prev = prev
        this.next = next

    }

}

export { LLNode }