import {DishInterface} from "./DishInterface";

export interface PreferencesInterface {
    id: number,
    cuisineNationality: string,
    interior: string,
    tipsPercentage: number,
    isVegan: boolean,
    isRawFood: boolean,
    bestDrink: DishInterface,
    bestFirstMeal: DishInterface,
    bestSecondMeal: DishInterface,
    bestDessert: DishInterface,
    other: string
}