// 导出一个默认函数 bwPowerSet，用于生成给定集合的所有子集
export default function bwPowerSet (originalSet) {
  // 用于存储所有子集的数组
  const subSets = []

  // 我们会有 2 的 n 次方种可能的组合（其中 n 是原始集合的长度）。
  // 这是因为对于原始集合中的每个元素，我们都要决定是否将其包含在子集中（每个元素有 2 种选择）。
  const numberOfCombinations = 2 ** originalSet.length

  // 从 0 到 2 的 n 次方的每个二进制数正好满足我们的需求：
  // 它通过其位（0 或 1）来表示是否包含集合中的相关元素。
  // 例如，对于集合 {1, 2, 3}，二进制数 0b010 意味着我们只需要将 "2" 包含到当前子集中。
  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    // 用于存储当前子集的数组
    const subSet = []

    // 遍历原始集合中的每个元素
    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      // 决定是否需要将当前元素包含到子集中
      if (combinationIndex & (1 << setElementIndex)) {
        // 如果需要，则将该元素添加到当前子集中
        subSet.push(originalSet[setElementIndex])
      }
    }

    // 将当前子集添加到所有子集的列表中
    subSets.push(subSet)
  }

  // 返回包含所有子集的数组
  return subSets
}