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
  CartButton (ModalCtx, OrderCtx)
GreetingPanel
MealsList (MenuCtx, OrderCtx)
  MealItem
    MealDescription
    MealItemControls
Cart
  CartList
    CartItem
      MealDescription
      CartItemAmount
      CartItemControls
  CartFooter
UI
  Card
  Button
  Modal
</pre>

## State:
ModalContext=> modals: { cart: false }, setModal: () => {}  
MenuContext=> menu: [Meal]  
OrderContext=>  
&nbsp;&nbsp;order: {Order},  
&nbsp;&nbsp;addOrderPosition: () => {},  
&nbsp;&nbsp;removeOrderPosition: () => {}  

MealItemControls=>  
&nbsp;&nbsp;amount: number
&nbsp;&nbsp;isValid: bool

## Interfaces:
<pre style="background: none">
Meal:
  id: string
  name: string
  description: string
  price: number
OrderedMeal:
  meal: Meal
  amount: number
Order:
  positions: [OrderedMeal]
  totalAmount: number
  totalPrice: number
</pre>