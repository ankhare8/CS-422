/**File: ShoppingListMapper.java
 * A class that provides methods for converting a ShoppingList of items to and from JSON format
 * @author Anshita Khare*/
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ShoppingListMapper{

	/** A method takes an ArrayList of Item objects, serializes them to JSON format using the ObjectMapper class 
	 * from the com.fasterxml.jackson.databind package, and writes the resulting JSON data to a file called 
	 * shoppingList.json using the mapper.writeValue method. If an error occurs during the write operation, 
	 * the method catches the exception and prints a stack trace.*/
	public void toJson(ArrayList<? extends Item> sL) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(sL);
		try {
			mapper.writeValue(new File("shoppingList.json"), sL);
		} catch (StreamWriteException e) {
			e.printStackTrace();
		} catch (DatabindException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**A method reads the JSON data from the shoppingList.json file using the mapper.readValue method and 
	 * deserializes it back into an ArrayList of Item objects using the TypeReference class from the 
	 * com.fasterxml.jackson.core.type package. The method then returns the resulting ArrayList of items. 
	 * If an error occurs during the read operation, the method throws an IOException.*/
	public ArrayList<Item> toShoppingList() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
    	ArrayList<Item> shoppingList = mapper.readValue(new File("shoppingList.json"), new TypeReference<ArrayList<Item>>(){});
    	return shoppingList;
	}
}
