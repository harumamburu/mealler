# Mealler
---
React app for take-away ordering.
## UI:
### Main Page:

<img src="UI_main.png" width="600" alt="Main page UI">

### Cart:

<img src="UI_cart.png" width="600" alt="Card modal UI">

## Components:
<pre style="background: none">
Header
  CartButton
GreetingPanel
MealsList
  MealItem
    MealDescription
    OrderControls
Cart
  CartItem
UI
  Card
  Button
  Modal
</pre>

## State:
ctx=> cart: [Order] ↓(to the cart and order button)  
MealsList=> availableMeals: [Meal]

## Interfaces:
<pre style="background: none">
Meal:
  name: string
  description: string
  price: number
Order:
  meal: Meal
  amount: number
</pre>