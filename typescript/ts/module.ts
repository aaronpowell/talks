module Collections {
    export class LinkedList{
        root: LinkedListNode;
        constructor() {
            this.root = null;
        }
        
        add(item: any) {
            if (!this.root) {
                this.root = new LinkedListNode(item);
            } else {
                var next = this.root;
                
                while (next.next) {
                    next = next.next;
                }
                
                next.next = new LinkedListNode(item);
            }
        }

        print() {
            var next = this.root;
            
            while (next) {
                console.log(next.item);
                next = next.next;
            }
        }
    }
    
    class LinkedListNode {
        next: any;
        constructor(public item: any) {
            this.next = null;
        }
    }
}

var list = new Collections.LinkedList();

list.add(1);
list.add(2);
list.add(3);

list.print();