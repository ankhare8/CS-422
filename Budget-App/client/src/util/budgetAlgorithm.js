export default function budgetItems(data, budget) {
  let recommended = [];
    let remaining = [];
    // budget = parseFloat(budget);
  
    for (let i = data.length - 1; i >= 0; i--) {
      const item = data[i];
    //   item.price = parseFloat(item.price);
    //   item.quantity = parseInt(quantity);

      const totalPrice = item.price * item.quantity;

    //   console.log(totalPrice);
  
      if (totalPrice <= budget) {
        recommended.push(item);
        data.splice(i, 1);
        budget -= totalPrice;
  
      } else if (item.quantity > 1) {
        const affordableQuantity = Math.floor(budget / item.price);
        // console.log("remaining budget: " + budget)
        // console.log("item price: " + item.price)
        // console.log("item afforable quantity: " + affordableQuantity)
        if (affordableQuantity >= 1) {
          const affordableTotalPrice = affordableQuantity * item.price;
  
          const recommendedItem = JSON.parse(JSON.stringify(item))

          const originalQuantity = item.quantity
          item.quantity = originalQuantity - affordableQuantity;

          recommendedItem.quantity = affordableQuantity;
          recommended.push(recommendedItem);
          budget -= affordableTotalPrice;
        }
      } 
      
      // console.log("budget: " + budget)
      if (budget == 0) {
        break;
      }
    }
  
    remaining = data;

    return {
      recommended,
      remaining,
      budget
    };
}