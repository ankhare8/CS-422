/** File: Item.java
 * A class that houses items that have a name, priority, price in cents and quantity
 * @author Anshita Khare*/
public class Item{
	private int priority;
	private int quantity;
	private int priceCents;
	public String name;
	
	//default constructor required to be explicitly declared when Item is being read in from json
	public Item() {};
	
	public Item(String itemName) {
		name = itemName.toUpperCase();
	}
	
	public Item(String itemName, int itemPriority, int itemQuantity, int PriceCents) {
		//double check that uppercase is being used
		name = itemName.toUpperCase();
		priority = itemPriority;
		quantity = itemQuantity;
		priceCents = PriceCents;
	}
	
	public void update(int priorityIn, int quantityIn) {
		priority = priorityIn;
		quantity = quantityIn;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setPrice(int dollarsIn, int centsIn) {
		priceCents = 100 *  dollarsIn;
		priceCents += centsIn;
	}
	
	public void setPrice(int centsIn) {
		priceCents = centsIn;
	}
	
	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getPriceCents() {
		return priceCents;
	}

	public void setPriceCents(int priceCents) {
		this.priceCents = priceCents;
	}
	
	public Item clone() {
		Item clone = new Item();
		clone.setName(this.getName());
		clone.setPrice(this.getPriceCents());
		clone.setPriority(this.getPriority());
		clone.setQuantity(this.getQuantity());
		
		return clone;
	}
}
