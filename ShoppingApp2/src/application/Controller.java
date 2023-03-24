package application;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Tab;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableColumn.CellEditEvent;
import javafx.scene.control.TableView;
import javafx.scene.control.TableView.TableViewSelectionModel;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.control.cell.TextFieldTableCell;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.control.Spinner;
import javafx.scene.control.SpinnerValueFactory;

import java.net.URL;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.ResourceBundle;

public class Controller implements Initializable {
	private ShoppingList SL;
	private Budget B;
	
    @FXML
    private Tab editItems, setPrices, goShopping, help;
	@FXML
	private TableView<Item> editTable, pricesTable, purchasedTable, remainingTable;
	@FXML
	private TableColumn<?, ?> eColumnItemName, pColumnItemName, spColumnItemName, spColumnQuantity, spColumnPriority, srColumnItemName, srColumnQuantity, srColumnPriority;
	@FXML
	private TableColumn<Object, String>eColumnQuantity, eColumnPriority, pColumnDollars, pColumnCents;
	@FXML
	private TableColumn<Item, Integer> spColumnPriceCents, srColumnPriceCents; 
	@FXML
	private TextField fieldItemName, fieldDollars, fieldCents, fieldRemaining;
	@FXML
    private Spinner<Integer> spinnerQuantity, spinnerPriority;
	@FXML
	private Button buttonAddItem, eButtonSave, pButtonSave, buttonLoad, buttonRemoveItem, buttonShop;
	
    private ImageView addGraphic(String imageFile){
        ImageView imageView = null;
        Image image = new Image(getClass().getResourceAsStream(imageFile));
        imageView = new ImageView(image);
        imageView.setFitWidth(16);
        imageView.setFitHeight(16);
        return imageView;
    }
    
	private void initSpinners() {
		spinnerQuantity.setValueFactory(new SpinnerValueFactory.IntegerSpinnerValueFactory(1, 100));
		spinnerPriority.setValueFactory(new SpinnerValueFactory.IntegerSpinnerValueFactory(1, 5));
		
		spinnerPriority.getValueFactory().setValue(3);
	}
	
	 /**Method that removes all items in the purchased or remaining table. 
     * Is invoked within the application when changes are made to the shopping list and displayed data would no longer be relevant*/
	private void clearShoppingTab() {
		purchasedTable.getItems().clear();
		remainingTable.getItems().clear();
	}
	
	/**Method to issue error alert 
	 * @param header
	 * @param content*/
	private void issueErrorAlert(String header, String content) {
		Alert errorAlert = new Alert(AlertType.ERROR);
    	errorAlert.setHeaderText(header);
    	errorAlert.setContentText(content);
    	errorAlert.showAndWait();
	}
	
	/**Method to issue info alert 
	 * @param header
	 * @param content*/
	private void issueInfoAlert(String header, String content) {
		Alert infoAlert = new Alert(Alert.AlertType.INFORMATION);
		infoAlert.setHeaderText(header);
		infoAlert.setHeaderText(content);
		infoAlert.showAndWait();
	}
	
	/**Method to display items within given ArrayList of items in TableView
	 * @param list the ArrayList to model
	 * @param t1 required parameter for the table to render to
	 * @param t2 optional parameter for when rendering the same model to multiple tables*/
	private void tableFromList(ArrayList<Item> list, TableView<Item> t1, TableView<Item> t2) {
		for (int i=0; i<list.size(); i++) {
			Item obj = list.get(i);
			t1.getItems().add(obj);
			if(t2 != null) {
				t2.getItems().add(obj);
			}
		}
	}
	
	/**Method that is used to handle edit cell events
	 * @param item the Item that corresponds to the event
	 * @param unit the unit that is being altered (accepts "Quantity", "Priority", "Dollars", "Cents" case insensitive)*/
	public void editCellChange(CellEditEvent<Object, String> event, String unit ) throws Exception {
		Item item = (Item) event.getRowValue();
		String newInput = event.getNewValue();

		int value = 0;
        try {
        	value = Integer.parseInt(newInput);
        	if (value < 0) {
        		value = 0;
        		throw new Exception();
        	};
        }catch(Exception E) {
        	issueErrorAlert("Unable To Update " + unit, "Please use only positive numeric values");
        }
        
        unit = unit.toUpperCase();
        switch(unit) {
	        case "QUANTITY": {
	        	if (value > 100) {
	        		issueErrorAlert("Unable To Update Quanity" + unit, "The highest possible quantity is 100!");
	        		value = 100;
	        	}else if(value < 0){
	        		value = 1;
	        	}
	        	
	        	item.setQuantity(value + "");
	        	editTable.refresh();
	        	break;
	        }
	        case "PRIORITY": {
	        	if (value > 5) {
	        		issueErrorAlert("Unable To Update Priority" + unit, "The highest possible priority value is 5!");
	        		value = 5;
	        	}else if(value < 0){
	        		value = 3;
	        	}
	        	item.setPriority(value + "");
	        	editTable.refresh();
	        	break;
	        }
	        case "DOLLARS": {
	        	item.setDollars(value);
	        	pricesTable.refresh();
	        	break;
	        }
	        case "CENTS": {
	        	item.setCents(value);
	        	pricesTable.refresh();
	        	break;
	        }
	        default:
	        	System.out.println("dev: enter a valid unit");
        }
	}
	
	@FXML
	public void removeItem() {
		TableViewSelectionModel<Item> selectionModel = editTable.getSelectionModel();
		if (!selectionModel.isEmpty()) {
		    Item selectedItem = selectionModel.getSelectedItem();
		    editTable.getItems().remove(selectedItem);
		    pricesTable.getItems().remove(selectedItem);
		    SL.remove(selectionModel.getSelectedItem().getName());
		    clearShoppingTab();
		} else {
			issueErrorAlert("Unable To Remove Item", "Please select the item on the list to remove it");
		}
	}
	
	@FXML
	public void addItem() {
	    String name = fieldItemName.getText();
	    
	    if (name.isEmpty()) {
	    	issueErrorAlert("Unable To Add Item", "Please add the name of the item you want to add");
	    	return;
	    	
	    }
	    String quantity = spinnerQuantity.getValue() + "";
	    String priority = spinnerPriority.getValue() + "";
	    Item newItem = new Item(name, quantity, priority);
	    
	    if (!SL.add(newItem)){
	    	issueErrorAlert("Unable To Add Item", "That item already exists in your list. Click the quantity and/or priority to modify the existing item.");
	    	return;
	    }

	    // Add the new Item to the table
	    editTable.getItems().add(newItem);
	    pricesTable.getItems().add(newItem);

	    // Clear the input fields
	    fieldItemName.clear();
	    spinnerQuantity.getValueFactory().setValue(1);
	    spinnerPriority.getValueFactory().setValue(3);
	}
	
	@FXML
	public void shop() {
		if(SL.getSize() > 0) {
			SL.sortList();
			clearShoppingTab();
			B = new Budget(SL.getList());
			
			int dollars = 0;
			try {
				dollars = Integer.parseInt(fieldDollars.getText());
			} catch (NumberFormatException e) {
				issueErrorAlert("Unable To Go Shopping", "Please enter a valid dollar amount");
				return;
			}
			
			int cents = 0;
			try {
				cents = Integer.parseInt(fieldCents.getText());
			} catch (NumberFormatException e) {
				issueErrorAlert("Unable To Go Shopping", "Please enter a valid cent amount");
				return;
			}
					
			if (cents > 0 || dollars > 0) {
				dollars += cents / 100;
				cents = cents % 100;
				fieldDollars.setText(dollars + "");
				fieldCents.setText(cents + "");
				B.setBudget(dollars, cents);
			}else {
				issueErrorAlert("Unable To Go Shopping", "Please make sure your budget is a positive number");
				return;
			}
		} else {
			issueErrorAlert("Unable To Go Shopping", "It dosesn't seem like you have a saved shopping list. Use the tabs to add items and set prices");
			return;
		}
		B.shop();
		ArrayList<Item> p = B.getPurchased();
		if (p.size() > 0) {
			tableFromList(p, purchasedTable, null);
		}else {
			issueInfoAlert("Notice", "The purchased table is empty because we were unable to buy anything. Consider increasing your budget");
		}
		
		ArrayList<Item> r = B.getList();
		if(r.size() > 0) {
			tableFromList(r, remainingTable, null);
		}else {
			issueInfoAlert("Notice", "The remaining table is empty because we were able to buy everything everything!");
		}
		
		DecimalFormat df = new DecimalFormat("#,##0.00");
		String formattedCents = "$" +  df.format(B.getBudgetCents()/100.0);
		fieldRemaining.setText(formattedCents);
	}
	
	private void internalLoad() {
		if(SL.fillWithJSON()) {
			tableFromList(SL.getList(), editTable, pricesTable);
		}else {
			issueErrorAlert("Unable To Load Saved List", "Unable to load shopping list at this time. See console for more information");
		}
	}
	
	@FXML
	public void load() {
		if (SL.getSize() != 0) {
			Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
			alert.setHeaderText("Loading a saved list will overwrite this one. Are you sure you want to continue?");
			alert.setContentText("Press OK to proceed or Cancel to abort.");
			alert.showAndWait().ifPresent(response -> {
				if (response == ButtonType.OK) {
					editTable.getItems().clear();
					pricesTable.getItems().clear();
					clearShoppingTab();
					internalLoad();
				}
				
			});
		}else {
			internalLoad();
		}
	}
	
	private void internalSave() {
		if(!SL.saveToJSON()) {
			issueErrorAlert("Unable To Save List", "Unable to save shopping list at this time. See console for more information");
		} else {
			clearShoppingTab();
			issueInfoAlert("Success!", "Successfully saved shopping list");
		}
	}
	
	@FXML
	 /**Saves shopping list model to .json file. Issues warning if writing an empty list and shows success or failure*/
	public void save() {
		if (SL.getSize() == 0) {
			Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
			alert.setHeaderText("Your list is empty. Are you sure you want to save it?");
			alert.setContentText("Press OK to proceed or Cancel to abort.");
			alert.showAndWait().ifPresent(response -> {
				if (response == ButtonType.OK) {
					internalSave();
				}
			});
		}else {
			internalSave();
		}
	}

	
    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
    	SL = new ShoppingList();
    	//add images to tabs
        ImageView view1 = addGraphic("edit.png");
        editItems.setGraphic(view1);
        ImageView view2 = addGraphic("prices.png");
        setPrices.setGraphic(view2);
        ImageView view3 = addGraphic("shopping.png");
        goShopping.setGraphic(view3);
        ImageView view4 = addGraphic("help.png");
        help.setGraphic(view4);
        
        //initialize edit tab
        eColumnItemName.setCellValueFactory(new PropertyValueFactory<>("name"));
        eColumnQuantity.setCellValueFactory(new PropertyValueFactory<>("quantity"));
        eColumnQuantity.setCellFactory(TextFieldTableCell.forTableColumn());
        eColumnQuantity.setOnEditCommit(event -> { try {
			editCellChange(event, "Quantity");
		} catch (Exception e) {
			e.printStackTrace();
		}});
        eColumnPriority.setCellValueFactory(new PropertyValueFactory<>("priority"));
        eColumnPriority.setCellFactory(TextFieldTableCell.forTableColumn());
        eColumnPriority.setOnEditCommit(event -> { try {
			editCellChange(event, "Priority");
		} catch (Exception e) {
			e.printStackTrace();
		}});
        
        initSpinners();
        
        //initialize price tab
        pColumnItemName.setCellValueFactory(new PropertyValueFactory<>("name"));
        pColumnDollars.setCellValueFactory(new PropertyValueFactory<>("dollars"));
        pColumnDollars.setStyle("-fx-alignment: CENTER-RIGHT;");
        pColumnDollars.setCellFactory(TextFieldTableCell.forTableColumn());
        pColumnDollars.setOnEditCommit(event -> { try {
			editCellChange(event, "Dollars");
		} catch (Exception e) {
			e.printStackTrace();
		}});
        pColumnCents.setCellValueFactory(new PropertyValueFactory<>("cents"));
        pColumnCents.setCellFactory(TextFieldTableCell.forTableColumn());
        pColumnCents.setOnEditCommit(event -> { try {
			editCellChange(event, "Cents");
		} catch (Exception e) {
			e.printStackTrace();
		}});
        
        
        //initialize shop tab
        fieldDollars.setText("0");
        fieldDollars.setStyle("-fx-alignment: CENTER-RIGHT;");
        fieldCents.setText("00");
        spColumnItemName.setCellValueFactory(new PropertyValueFactory<>("name"));
        spColumnQuantity.setCellValueFactory(new PropertyValueFactory<>("quantity"));
        spColumnPriority.setCellValueFactory(new PropertyValueFactory<>("priority"));
        spColumnPriceCents.setCellValueFactory(new PropertyValueFactory<>("priceCents"));
        spColumnPriceCents.setCellFactory(column -> new PriceTableCell());
        
        srColumnItemName.setCellValueFactory(new PropertyValueFactory<>("name"));
        srColumnQuantity.setCellValueFactory(new PropertyValueFactory<>("quantity"));
        srColumnPriority.setCellValueFactory(new PropertyValueFactory<>("priority"));
        srColumnPriceCents.setCellValueFactory(new PropertyValueFactory<>("priceCents"));
        srColumnPriceCents.setCellFactory(column -> new PriceTableCell());
      
    }
}
