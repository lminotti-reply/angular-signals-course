export interface PokeCart {
  bowlName: string|null
  ingredients: PokeCartIngredient[],
}

export interface PokeCartIngredient {
  id: number,
  quantity: number,
}
