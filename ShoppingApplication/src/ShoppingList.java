/**File: ShoppingList.java
 * A class that creates a SL ArrayList<Item> that can be added from, removed from, modified, searched, sorted and more.
 * @author Anshita Khare*/

import java.io.IOException;
import java.util.ArrayList;
import com.fasterxml.jackson.core.JsonProcessingException;

public class ShoppingList implements PrintList, Cloneable{
	private ArrayList<Item> SL = new ArrayList<Item>();
	
	/**Method to add an item to the ShoppingList
	 * @param itemName the name of the item
	 * @param quantity the quantity desired of the item
	 * @priority the priority of the item (the lower number has higher priority)*/
	public boolean add(String itemName, int quantity, int priority) {
		if (!search(itemName)) {
			if(priority > 0 && quantity > 0) {
				Item obj = new Item(itemName);
				obj.update(priority, quantity);
				SL.add(obj);
				return true;
			}
		}
		return false;
	}
	
	/**Method to remove an item from the shopping list by name
	 * @param itemName the name of the item*/
	public void remove(String itemName) {
		for (int i = 0; i < SL.size(); i++) {
			if (SL.get(i).getName().equalsIgnoreCase(itemName)) {
				SL.remove(i);
			}
		}
	}
	
	/**A search method that returns if an item exists in the shopping list or not
	 * @param itemName the name of the item*/
	private boolean search(String itemName) {
		for (int i = 0; i < SL.size(); i++) {
			if (SL.get(i).getName().equalsIgnoreCase(itemName)) {
				return true;
			}
		}
		return false;
	}
	
	/**A search method that returns the item if it exists in the shopping list and null if it does not
	 * @param itemName the name of the item*/
	private Item getSearch(String itemName) {
		for (int i = 0; i < SL.size(); i++) {
			if (SL.get(i).getName().equalsIgnoreCase(itemName)) {
				return SL.get(i);
			}
		}
		return null;
	}
	
	/**A method to set the price of a given item in the shopping list
	 * @param itemName the name of the item
	 * @param d the price in dollars
	 * param c the price in cents*/
	public boolean setItemPrice(String itemName, String d, String c) {
			int dollars;
			try {
				dollars = Integer.parseInt(d);
			} catch (NumberFormatException e) {
//				e.printStackTrace();
				return false;
			}
			
			int cents;
			try {
				 cents = Integer.parseInt(c);
			} catch (NumberFormatException e) {
//				e.printStackTrace();
				return false;
			}
			
			if(dollars >= 0 && cents >= 0) {
				Item target = getSearch(itemName);
				if (target != null) {
					target.setPrice(dollars, cents);
					return true;
				}
			}
			
		return false;
	}
	
	/**A method that sets the SL within this object to the ArrayList<Item> given*/
	public void setList(ArrayList<Item> SL_in) {
		this.SL = SL_in;
	}
	
	/**Returns the ArrayList<Item> that houses the shopping list*/
	public ArrayList<Item> getList() {
		return SL;
	}
	
	public ArrayList<Item> clone(){
		ArrayList<Item> cloned = new ArrayList<Item>();
		for(int i=0; i<SL.size(); i++) {
			cloned.add(SL.get(i).clone());
		}
		return cloned;
	}
	
	/**Returns the size of the SL*/
	public int getSize() {
		return SL.size();
	}
	
	/**Method that creates a new ShoppingListMapper object and uses it saves the SL to a json file*/
	public boolean saveToJSON() {
		ShoppingListMapper mapper = new ShoppingListMapper();
		try {
			mapper.toJson(SL);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/**Method that creates a new ShoppingListMapper object and uses it to read in a json file to ShoppingList
	 * and sets as this object's SL*/
	public boolean fillWithJSON() {
		ShoppingListMapper mapper = new ShoppingListMapper();
		ArrayList<Item>result = null;
		
		try {
			result = mapper.toShoppingList();
		} catch (IOException e) {
//			e.printStackTrace();
			return false;
		}
		
		if(result != null) {
			this.SL = result;
			return true;
		}
		
		return false;
	}
	
	
	public void printList() {
		printList(SL);
	}

	/**Externally accessible method that calls the internal quick sort method*/
	public void sortList() {
		quickSort(SL, 0, SL.size() - 1);
	}
	
	
	/** A function that partitions the given array list for quick sort
	 * @param currList the sublist that the function works with
	 * @param left the index of the first item in the sublist
	 * @param right the index of the last item in the sublist*/
	private int parition(ArrayList<Item> currList, int left, int right) {
		//The function creates two variables called biggestIndex and smallestIndex and sets them to left and right, respectively. 
		//Creates a variable called temp to temporarily hold an Item object during the swapping process.
		int biggestIndex = left;
		int smallestIndex = right;
		Item temp;
		
		//The function sets the pivot variable to the priority value of the Item object that is at the midpoint of 
		//the sublist represented by left and right.
		int pivot = currList.get((left+right)/2).getPriority();
		
		
		//The function enters a loop that will continue until biggestIndex is greater than smallestIndex.
		while(biggestIndex <= smallestIndex) {
			//Checks whether the priority value of the Item object at biggestIndex is greater than the pivot value.
			//If it is, the function increments biggestIndex until it reaches an Item object with a priority value less than or equal to pivot.
			while(currList.get(biggestIndex).getPriority() > pivot) {
				biggestIndex++;
			}
			
			//Checks whether the priority value of the Item object at smallestIndex is less than the pivot value.
			//If it is, the function decrements smallestIndex until it reaches an Item object with a priority 
			//value greater than or equal to pivot.
			while(currList.get(smallestIndex).getPriority() < pivot) {
				smallestIndex--;
			}
			
			//If biggestIndex is less than or equal to smallestIndex, the function swaps the Item objects
			//at biggestIndex and smallestIndex in currList, updates biggestIndex and smallestIndex, and continues the loop.
			if (biggestIndex <= smallestIndex) {
				temp = currList.get(biggestIndex);
				currList.set(biggestIndex, currList.get(smallestIndex));
				currList.set(smallestIndex, temp);
				biggestIndex ++;
				smallestIndex--;
			}
		}
		
		//By the time the loop is finished, the function has moved all Item objects with priority values less 
		//than or equal to pivot to the left side of the sublist and all Item objects with priority values greater 
		//than pivot to the right side of the sublist. 
		
		//The function returns the index of the last item that has a priority value less than or equal to pivot that can be used to further sort the list
		return biggestIndex;
	}
	
	
	/**A recursive quick sort method
	 * @param currList the list or sublist that is being sorted
	 * @param lowIndex the index of the first item in the sublist
	 * @param highIndex the index of the last item in the sublist*/
	private void quickSort(ArrayList<Item> currList, int lowIndex, int highIndex) {
		int index = parition(currList, lowIndex, highIndex);
		
		if (lowIndex < index - 1) {
			quickSort(currList, lowIndex, index - 1);
		}
		if (index < highIndex) {
			quickSort(currList, index, highIndex);
		}
	}
		
}
