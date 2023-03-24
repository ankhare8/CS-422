/** File: Budget.java
 * A class that can take in an ArrayList<Item> and simulate shopping with it given a certain budget and given priorities.
 * It can be implemented to tell the user what items can and cannot be purchased with the given bounds. 
 * It can also return the list of purchased and remaining items
 * @author Anshita Khare*/
import java.util.ArrayList;

public class Budget implements PrintList{
	private int budgetCents;
	private ArrayList<Item> SL;
	private ArrayList<Item> purchased;
	
	/**Constructor that takes in a ArrayList<Items>
	 * A deep copy/clone of any active list is created for the given list
	 * Using a shallow copy for budget would modify the original list as well 
	 * and not allow the option of merging shopping list only if desired
	 * Requirements: the given array list must be sorted*/
	public Budget(ArrayList<Item> listIn) {
		ArrayList<Item> cloned = new ArrayList<Item>();
		for(int i=0; i<listIn.size(); i++) {
			cloned.add(listIn.get(i).clone());
		}
		
		SL = cloned;
	}
	
	public void setBudget(int dollarsIn, int centsIn) {
		budgetCents = 100 * dollarsIn;
		budgetCents += centsIn;
	}
	
	public boolean setBudget(String dollarsIn, String centsIn) {
		try {
			budgetCents = 100 * Integer.parseInt(dollarsIn);
		} catch (NumberFormatException e) {
//			e.printStackTrace();
			return false;
		}
		
		try {
			budgetCents += Integer.parseInt(centsIn);
		} catch (NumberFormatException e1) {
//			e1.printStackTrace();
			return false;
		}
		
		if (budgetCents == 0) {
			return false;
		}
		
		return true;
	}
	
	/**A method that allows for items within the budget to be purchased*/
	public void shop(){
		//create an empty list called purchased
		purchased = new ArrayList<Item>();
		
		//starting from the last item in a list called SL and 
		//working backwards so that deletions do not change the index of subsequent items
		for(int i = SL.size() - 1; i >= 0; i--) {
			if(budgetCents == 0) {
				break;
			}
			
			//get the details of the item at the current index i in SL
			Item item = SL.get(i);
			String name = item.getName();
			int priority = item.getPriority();
			int quantity = item.getQuantity();
			int cost = item.getPriceCents();
			
			int quantityPurchased = 0;

			//calculate the total cost of buying the entire quantity of the item at its price.
			int totalCost = cost * quantity;

			//if the budget is greater than or equal to the total cost, buy all of the item's quantity, 
			//subtract the total cost from the budget, and remove the item from SL.
			if(budgetCents >= totalCost) {
				budgetCents = budgetCents - totalCost;
				quantityPurchased = quantity;
				SL.remove(i);
			}
			
			//if the budget is less than the total cost but greater than or equal to the item's price, 
			//buy as much of the item as possible while the budget is not exhausted
			else if(budgetCents >= item.getPriceCents()) {
				//repeatedly subtract the item's price from the budget until the budget can no longer afford the item,
				//and updating the quantity of the item purchased accordingly
				while (quantity != 0 && budgetCents >= cost) {
					budgetCents -= cost;  
					quantityPurchased++;
					quantity--;
				}
				item.setQuantity(quantity);
			}
			
			//if you ended up purchasing something, create a new item with the same name, priority, 
			//and price as the original item but with the quantity set to the quantity purchased, 
			//and add it to the purchased list.
			if (quantityPurchased != 0) {
				Item pItem = new Item(name, priority, quantityPurchased, cost);
				purchased.add(pItem);
			}
		}
	}
	
	public ArrayList<Item> getPurchased(){
		return purchased;
	}
	
	public ArrayList<Item> getList(){
		return SL;
	}
	
	public void printList() {
		printList(SL);
	}
	
	public int getBudgetCents() {
		return budgetCents;
	}
	
	
}
