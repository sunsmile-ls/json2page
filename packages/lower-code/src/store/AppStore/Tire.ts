export class TrieNode {
  children: { [key: string]: TrieNode }
  value: object | undefined

  constructor() {
    this.children = {}
    this.value = {}
  }
}

export default class Trie {
  root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(word: string, value: object) {
    let node = this.root
    const words = word.split('/')
    for (let i = 0; i < words.length; i++) {
      const char = words[i]
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.value = {
      ...node.value,
      ...value,
    }
  }

  search(word: string): object | undefined {
    let node = this.root
    const words = word.split('/')
    for (let i = 0; i < words.length; i++) {
      const char = words[i]
      if (!node.children[char]) {
        return undefined
      }
      node = node.children[char]
    }

    return node.value
  }

  findClosest(word: string): object {
    let node = this.root
    const words = word.split('/')
    let result = {}
    for (let i = 0; i < words.length; i++) {
      const char = words[i]
      if (!node.children[char]) {
        return result
      }
      node = node.children[char]
      result = Object.assign(result, node.value)
    }

    return result
  }

  delete(word: string) {
    let node = this.root
    const stack: Array<{ node: TrieNode; char: string }> = []
    const words = word.split('/')
    for (let i = 0; i < words.length; i++) {
      const char = words[i]
      if (!node.children[char]) {
        return
      }
      stack.push({ node, char })
      node = node.children[char]
    }
    node.value = undefined
    if (Object.keys(node.children).length === 0) {
      while (stack.length > 0) {
        const { node, char } = stack.pop()!
        delete node.children[char]
        if (Object.keys(node.children).length > 0) {
          break
        }
      }
    }
  }
}
