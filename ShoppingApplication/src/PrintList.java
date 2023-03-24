/** File: PrintList.java
 * An interface that allows classes that implement it to print the Items in their list
 * @author Anshita Khare*/
import java.util.ArrayList;

public interface PrintList{
	
	/**A default method that prints out the name, quantity, priority, and price of each item in an input ArrayList of Item objects*/
	public default void printList(ArrayList<? extends Item> myList) {
		for (int i = 0; i < myList.size(); i++) {
			Item obj = myList.get(i);
			System.out.println(obj.name);
			System.out.printf("  Quanity %d, Priority %d\n", obj.getQuantity(), obj.getPriority());
			System.out.println("Price: " + obj.getPriceCents());
		}
	}

}
