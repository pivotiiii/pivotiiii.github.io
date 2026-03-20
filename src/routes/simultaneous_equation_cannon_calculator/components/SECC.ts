export interface Combination {
  xyz: number;
  fusion: number;
  target: number;
  total_cards: number;
}

export function getCombination(level: number, totalCards: number): Combination | null {
  const req_xyz = totalCards - level;
  const req_fusion = level - req_xyz;
  if (req_xyz > 0 && req_xyz < 14 && req_fusion > 0 && req_fusion < 13) {
    return {xyz: req_xyz, fusion: req_fusion, target: level, total_cards: totalCards};
  }
  return null;
}

export function getAllCombinations(totalCards: number, monsterLevels: number[]): Combination[][] {
  const validCombinations = new Array();
  const potentialCombinations = new Array();
  for (const level of monsterLevels) {
    const v_combination = getCombination(level, totalCards);
    if (v_combination != null) {
      validCombinations.push(v_combination);
    }
    for (let cards = 2; cards < 143; cards++) {
      const p_combination = getCombination(level, cards);
      if (p_combination != null && p_combination.total_cards !== totalCards) {
        potentialCombinations.push(p_combination);
      }
    }
  }
  return new Array(validCombinations, potentialCombinations);
}
