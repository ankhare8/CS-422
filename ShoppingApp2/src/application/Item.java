package application;
/** File: Item.java
 * A class that houses items that have a name, priority, price in cents and quantity
 * @author Anshita Khare*/
public class Item{
	private int priceCents;
	public String name, priority, quantity, cents, dollars;
	
	//default constructor required to be explicitly declared when Item is being read in from json
	public Item() {};
	
	public Item(String itemName) {
		name = itemName.toUpperCase();
	}
	
	public Item(String itemName, String itemQuantity, String itemPriority) {
		//double check that uppercase is being used
		name = itemName.toUpperCase();
		quantity = itemQuantity;
		priority = itemPriority;
	}
	
	public Item(String itemName, String itemPriority, String itemQuantity, int PriceCents) {
		//double check that uppercase is being used
		name = itemName.toUpperCase();
		priority = itemPriority;
		quantity = itemQuantity;
		priceCents = PriceCents;
	}
	
	public void update(String priorityIn, String quantityIn) {
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
	
	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getQuantity() {
		return quantity;
	}

	
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public int getPriceCents() {
		return priceCents;
	}
	
	public void setDollars(int dollarsIn) {
		int cents = priceCents  % 100;
		priceCents = 100 *  dollarsIn + cents;
//		System.out.println(priceCents);
	}
	
	public void setDollars(String dollarsIn) {
		this.cents = dollarsIn;
	}
	
	public String getDollars() {
		return priceCents / 100 + "";
	}
	
	public void setCents (int centsIn) {
		if (priceCents % 100 == 0) {
			priceCents += centsIn;
		} else {
			int dollars = priceCents / 100;
			priceCents = centsIn + (dollars * 100) ;
		}	
//		System.out.println(priceCents);
	}
	
	public void setCents(String centsIn) {
		this.cents = centsIn;
	}

	public String getCents() {
		int cents = priceCents % 100;
		return String.format("%02d", cents);
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
		clone.setCents(this.getCents());
		clone.setDollars(this.getDollars());
		return clone;
	}
}
