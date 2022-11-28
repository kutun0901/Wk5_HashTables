class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.count = 0
    this.capacity = numBuckets
    this.data = new Array(this.capacity).fill(null)
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {

    if (this.count/this.capacity > 0.7) this.resize();
    //if current doesn't exist, check if array.length >= loadFactor


    let newPair = new KeyValuePair(key, value)
    let index = this.hashMod(key)
    let current = this.data[index]
    if (!current) {
      this.data[index] = newPair
      this.count++
      return
    }
    while (current) {
      if (current.key === key) {
        current.value = value
        return
      } else {
        current = current.next
      }
    }
    newPair.next = this.data[index]
    this.data[index] = newPair
    this.count++
  }


  read(key) {
    //find the index using the hashMod(key)
    let index = this.hashMod(key);
    //look at the bucket that has the index
    if (!this.data[index]) return;
    //check the key at this.data[index]. if that key === key, return the value
    let current = this.data[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      } else current = current.next;
    }
    return;

  }


  resize() {
    // preserve a copy of this.data
    let oldData = this.data
    this.count = 0
    // double the capacity by creating a new Array
    this.capacity = 2 * this.capacity
    this.data = new Array(this.capacity).fill(null)
    // find a way to pass all old data to the new array
    for (let i = 0; i < oldData.length; i++) {
      let current = oldData[i]
      //check if value exists in bucket
      while (current) {
        this.insert(current.key, current.value)
        current = current.next
      }
      // if no, iterate to next loop
      // if value does exist, use while loop to access every item in linked list
    }


  }


  delete(key) {
    //locate the index of the key that we want to delete
    let index = this.hashMod(key)
    let current = this.data[index]
    let prev
    // check if there are no values or pairs, then return error "Key not found"
    // if (!current) throw new Error("Key not found")
    while (current && current.key !== key) {
      prev = current
      current = current.next
    }
    if (!current) {
      return "Key not found"
    } else {
      if (!prev) {
        this.data[index] = current.next
      }
      else {
        prev.next = current.next
      }
      this.count--
    }

    // } if (current.key === key) {
    //   this.data[index] = current.next
    //   this.count--
    //   return
    // } else {
    //   let remove = current;
    //   prev.next = remove.next;
    //   remove.next = null;
    //   this.count--
      // return remove
    }
    // if a pair exists, move next pointer to the next node

}




module.exports = HashTable;
