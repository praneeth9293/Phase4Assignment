import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { foodMenu } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodItems: BehaviorSubject<Food[]> = new BehaviorSubject([] as Food[]);
  constructor() {
    this.foodItems.subscribe((_foods) => {
      this.saveFoodItemsToLocalStorage(_foods)
    });
    this.initializeFoodItems();
  }

  getAllFoodItems(): Food[] {
    return this.foodItems.getValue();
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAllFoodItems().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }


  getFoodById(foodId: string): Food {
    return this.getAllFoodItems().find(food => food.id == foodId) ?? new Food();
  }

  addFoodItem(item: Food): void {
    const _foodItems = this.foodItems.getValue();
    let nextId = (+_foodItems[_foodItems.length - 1].id) + 1;

    _foodItems.push(
      {
        ...item,
        id: nextId.toString(),
      });
    this.foodItems.next(_foodItems);
  }


  deleteFoodItem(id: string): void {
    const _foodItems = this.foodItems.getValue();
    let nextId = (+_foodItems[_foodItems.length - 1].id) + 1;
    const deleteIndex = _foodItems.findIndex(item => item.id === id)
    _foodItems.splice(deleteIndex, 1);
    this.foodItems.next(_foodItems);
  }

  private initializeFoodItems(): void {
    const foods = localStorage.getItem('foodItems');
    const parsedFoods = foods ? JSON.parse(foods) : foodMenu;
    this.foodItems.next(parsedFoods?.length ? parsedFoods : null )
  }

  private saveFoodItemsToLocalStorage(_foods: Food[]): void {
    if (_foods?.length) {
      const foods = JSON.stringify(_foods);
      localStorage.setItem('foodItems', foods);
    }
  }
}
