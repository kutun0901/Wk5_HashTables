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
    // Your code here
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
