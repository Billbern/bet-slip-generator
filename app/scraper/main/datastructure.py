class Node:
    def __init__(self, val):
        self.value = val
        self.next = None

class CircularList:
    
    def __init__(self):
        self.head = None
    
    def populate(self, val):
        newNode = Node(val)
        if not self.head:
            self.head = newNode
            self.head.next = self.head
            return
        else:
            currentNode = self.head
            while currentNode.next != self.head:
                currentNode = currentNode.next
            currentNode.next = newNode
            currentNode.next.next = self.head
    
    def getNext(self, val):
        temp = self.head
        while val.upper() != temp.value:
            temp = temp.next
        return temp.next.value
    
    def displayTree(self):
        temp = self.head
        if self.head != None:
            while True: 
                print(f"{temp.value} --> ", end=" ")
                temp = temp.next
                if temp == self.head:
                    break

class CharTree:
    
    def __init__(self) -> None:
        self.tree = CircularList()
        self.__populateTree()
    
    def __populateTree(self):
        __addons =  ['1', '2', '3', '4', '5', '6', '7', '8', '9', "A", "B", "C", "D", "E", "F", "G", "H","J","K", "L", "M", "N","P","Q","R","S","T","U","V","W","X","Y","Z"]
        for char in __addons:
            self.tree.populate(char)
    
    def generateSlip(self, slip, n):
        bin = [slip]
        while len(bin) < n:
            initialSlip = bin[-1]
            if initialSlip[-1] == "Z":
                count = -1
                while initialSlip[count] == "Z":
                    if initialSlip[count-1] != "Z":
                        if count == -1:
                            initialSlip = initialSlip[:count-1] + self.tree.getNext(initialSlip[count-1]) + self.tree.getNext(initialSlip[count])
                        else:
                            initialSlip = initialSlip[:count-1] + self.tree.getNext(initialSlip[count-1]) + self.tree.getNext(initialSlip[count]) + initialSlip[count+1:]
                        break
                    else:
                        if count == -1:
                            initialSlip = initialSlip[:count] + self.tree.getNext(initialSlip[count])
                        else:
                            initialSlip = initialSlip[:count] + self.tree.getNext(initialSlip[count]) + initialSlip[count+1:]
                        count -= 1
                bin.append(initialSlip)
            else:
                initialSlip = initialSlip[:-1] + self.tree.getNext(initialSlip[-1])
                bin.append(initialSlip)
        return bin
