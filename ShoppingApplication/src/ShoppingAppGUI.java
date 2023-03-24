/**File: ShoppingAppGUI.java
 * A program that provides a graphical user interface to the shopping application
 * @author Anshita Khare*/
import javax.swing.JTabbedPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.ListSelectionModel;
import javax.swing.SpinnerNumberModel;
import javax.swing.SwingConstants;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSpinner;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.SystemColor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.awt.Font;
 
public class ShoppingAppGUI extends JPanel {
	private static final long serialVersionUID = 1L;

	private ShoppingList SL;
	private Budget B;
	
	private JPanel EditTab;
	private JTextField txtItemName;
	private JSpinner spinnerQuantity;
	private JSpinner spinnerPriority;
	private JTable tableItems;
	private DefaultTableModel modelItems;
	
	private JPanel PricesTab;
	private JTable tablePrices;
	private DefaultTableModel modelPrices;
	
	private JPanel ShoppingTab;
	private JTable tablePurchased;
	private DefaultTableModel modelPurchased;
	private JTable tableRemaining;
	private DefaultTableModel modelRemaining;
	private JTextField txtCents;
	private JTextField txtDollars;
	private boolean shoppingTabActive;
	
	/**Constructed that creates a new grid layout formatted tabbed pane and instantiates components for each tab*/
    public ShoppingAppGUI() {
        super(new GridLayout(1, 1));
        SL = new ShoppingList();
        JTabbedPane tabbedPane = new JTabbedPane();
        
        initPricesComponents();
        initShoppingComponents();
        initEditComponents();
        
        ImageIcon iconEdit = createImageIcon("assets/edit.png");
        tabbedPane.addTab("Edit Items", iconEdit, EditTab,
                "Add and remove items in your shopping list");
        tabbedPane.setMnemonicAt(0, KeyEvent.VK_1);
        
        
        ImageIcon iconPrices = createImageIcon("assets/prices.png");
        tabbedPane.addTab("Set Prices", iconPrices, PricesTab,
                "Set the prices for the items. Double click an items price cell to edit");
        tabbedPane.setMnemonicAt(1, KeyEvent.VK_2);
         
        ImageIcon iconShopping = createImageIcon("assets/shopping.png");
        tabbedPane.addTab("Go Shopping", iconShopping, ShoppingTab,
                "Determine your budget and go shopping");
        tabbedPane.setMnemonicAt(2, KeyEvent.VK_3);
         
   
        add(tabbedPane);
         
        tabbedPane.setTabLayoutPolicy(JTabbedPane.SCROLL_TAB_LAYOUT);
    }
    
    /** Returns an ImageIcon, or null if the path was invalid. */
    private static ImageIcon createImageIcon(String path) {
        java.net.URL imgURL = ShoppingAppGUI.class.getResource(path);
        if (imgURL != null) {
            return new ImageIcon(imgURL);
        } else {
            System.err.println("Couldn't find file: " + path);
            return null;
        }
    }
    
    /**Saves shopping list model to .json file. Issues warning if writing an empty list and shows success or failure*/
    private void save() {
    	if (SL.getSize() == 0) {
			int dialogButton = JOptionPane.showConfirmDialog (EditTab, "Your list is empty. Are you sure you want to save it?","Warning", JOptionPane.YES_NO_OPTION);
			if(dialogButton == JOptionPane.NO_OPTION) {
				return;
			}
		}
		if(!SL.saveToJSON()) {
			JOptionPane.showMessageDialog(EditTab, "Unable to save shopping list. See console for more information", "Unable To Save List", JOptionPane.ERROR_MESSAGE);
		}else {
			JOptionPane.showMessageDialog(EditTab, "Saved shopping list to \"shoppingList.json\"", "Success!", JOptionPane.INFORMATION_MESSAGE);
		}
    }
    
    /**Method that systematically removes all items in the purchased or remaining table. 
     * Is invoked within the application when changes are made to the shopping list and displayed data would no longer be relevant*/
    private void clearShoppingTab() {
    	if(shoppingTabActive) {
    		for (int i = tablePurchased.getRowCount()-1; i >= 0; i--) {
    			modelPurchased.removeRow(i);
    		}
    		
    		for (int i = tableRemaining.getRowCount()-1; i >= 0; i--) {
    		    modelRemaining.removeRow(i);
    		}
    		
    		shoppingTabActive = false;
    	}
    }
	
    /**Method that initializes components of the edit items tab*/
	private void initEditComponents() {
		
		EditTab = new JPanel();
		EditTab.setLayout(new BoxLayout(EditTab, BoxLayout.Y_AXIS));

		
		//ITEMS TABLE
		modelItems = new DefaultTableModel() {
		    private static final long serialVersionUID = 1L;

			@Override
			/**All cells within this table model are not editable but are still enabled and therefore selectable*/
		    public boolean isCellEditable(int row, int column) {
		       return false;
		    }
		};
		
		modelItems.setColumnIdentifiers(new String[]{ "Item Name","Quantity","Priority"});
		
		tableItems = new JTable(modelItems);
		tableItems.setFillsViewportHeight(true);
		tableItems.getTableHeader().setFont(new Font("Lucida Grande", Font.BOLD, 12));
		tableItems.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);	
		JScrollPane scrollItems = new JScrollPane(tableItems);
		
		EditTab.add(scrollItems);
		
		JPanel panelInput = new JPanel();
		panelInput.setBorder(null);
		EditTab.add(panelInput);
		
		//ITEM QUANTITY:
	    SpinnerNumberModel quantitySpinnerModel = new SpinnerNumberModel(1, 1, 100, 1);
		JLabel lblItem = new JLabel("Item");
		lblItem.setFont(new Font("Lucida Grande", Font.BOLD, 12));
		panelInput.add(lblItem);
		lblItem.setVerticalAlignment(SwingConstants.CENTER);
		
		//ITEM NAME:
		txtItemName = new JTextField();
		txtItemName.setToolTipText("Enter the name of an item");
		panelInput.add(txtItemName);
		txtItemName.setColumns(10);
		
		JLabel lblQuantity = new JLabel("Quantity");
		lblQuantity.setFont(new Font("Lucida Grande", Font.BOLD, 12));
		panelInput.add(lblQuantity);
		lblQuantity.setVerticalAlignment(SwingConstants.CENTER);

		spinnerQuantity = new JSpinner((quantitySpinnerModel));
		spinnerQuantity.setToolTipText("Quantity can be any number 1 - 100");
		panelInput.add(spinnerQuantity);
		
		
		//ITEM PRIORITY:
		JLabel lblPriority = new JLabel("Priority");
		lblPriority.setFont(new Font("Lucida Grande", Font.BOLD, 12));
		panelInput.add(lblPriority);
		lblPriority.setVerticalAlignment(SwingConstants.CENTER);

		//Spinner arguments: current, lowest, highest, step
	    SpinnerNumberModel prioritySpinnerModel = new SpinnerNumberModel(3, 1, 5, 1);
		spinnerPriority = new JSpinner(prioritySpinnerModel);
		spinnerPriority.setToolTipText("Note: Priority 1 is the highest and 5 is the lowest");
		panelInput.add(spinnerPriority);

		
		JPanel panelButtons = new JPanel();
		EditTab.add(panelButtons);
		
		//LOAD SAVED BUTTON:
		JButton btnLoadSaved = new JButton("Load Saved");
		btnLoadSaved.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(SL.getSize() != 0) {
					int dialogButton = JOptionPane.showConfirmDialog (EditTab, "Loading a saved list will overwrite this one. Are you sure you want to continue?","Warning", JOptionPane.YES_NO_OPTION);
					if(dialogButton == JOptionPane.NO_OPTION) {
						return;
					}else {
						for (int i = tableItems.getRowCount()-1; i >= 0; i--) {
						    modelItems.removeRow(i);
						    modelPrices.removeRow(i);
						}
					}
				}
				
				if(SL.fillWithJSON()) {
					ArrayList<Item> saved = SL.getList();

					for(int i=0; i<saved.size();i++) {
						modelItems.addRow(new Object[] {
							saved.get(i).getName(),
							saved.get(i).getQuantity(),
							saved.get(i).getPriority(),
						});
						
						int priceCents = saved.get(i).getPriceCents();
						int d = 0;
						int c = 0; 
						
						if (priceCents!=0) {
							d = priceCents / 100;
							c = priceCents % 100;
						}
						modelPrices.addRow(new Object[] {
								saved.get(i).getName(), 
								d,
								c});
					}
					
					clearShoppingTab();
//					SL.printList();
				}else {
					JOptionPane.showMessageDialog(EditTab, "It dosesn't seem like you have a saved shopping list to load!", "Unable To Load Saved List", JOptionPane.ERROR_MESSAGE);
					return;
				}
			}
		});
		panelButtons.add(btnLoadSaved);
		
		//SAVE BUTTON:
		JButton btnSave = new JButton("Save List");
		btnSave.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				save();
			}
		});
		panelButtons.add(btnSave);
		
		//ADD BUTTON:
		JButton btnAdd = new JButton("Add Item");
		btnAdd.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String item = txtItemName.getText().toUpperCase();
				
				if (item.isEmpty()) {
					JOptionPane.showMessageDialog(EditTab, "Please add the name of the item you want to add", "Unable To Add Item", JOptionPane.ERROR_MESSAGE);
					return;
				}
				
				int intQuantity;
				int intPriority;
				
				try {
					intQuantity = Integer.parseInt(spinnerQuantity.getValue() + "");
					intPriority = Integer.parseInt(spinnerPriority.getValue() + "");
				} catch (NumberFormatException ex) {
					JOptionPane.showMessageDialog(EditTab, "Please ensure that quantity and priority are numbers!", "Unable To Add Item", JOptionPane.ERROR_MESSAGE);
					return;
				}
				
				if (!SL.add(item, intQuantity, intPriority)) {
					JOptionPane.showMessageDialog(EditTab, "That item already exists in your list", "Unable To Add Item", JOptionPane.ERROR_MESSAGE);
					return;
				};
				
//				SL.printList();
				modelItems.addRow(new Object[] {item, intQuantity, intPriority});
				modelPrices.addRow(new Object[] {item, 0, 0,});
				
				//clear input
				txtItemName.setText("");
				spinnerQuantity.setValue(1);
				spinnerPriority.setValue(3);
				
				clearShoppingTab();
			}
		});		
		panelButtons.add(btnAdd);
		
		
		//REMOVE BUTTON:
		JButton btnRemove = new JButton("Remove Item");
		btnRemove.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(tableItems.getSelectedRow() != -1) {
					int currRow = tableItems.getSelectedRow();
					SL.remove(tableItems.getValueAt(currRow, 0).toString());
//					SL.printList();
					modelItems.removeRow(currRow);
					modelPrices.removeRow(currRow);
					clearShoppingTab();
				}else {
					JOptionPane.showMessageDialog(EditTab, "Please select a valid item to remove", "Unable To Remove Item", JOptionPane.ERROR_MESSAGE);
				}
			}
		});
		panelButtons.add(btnRemove);
	}
	
	
	/**Method that initializes components of the prices tab*/
	private void initPricesComponents() {
		PricesTab = new JPanel();
		PricesTab.setLayout(new BoxLayout(PricesTab, BoxLayout.Y_AXIS));
		
		//TABLE PRICES:
		modelPrices = new DefaultTableModel() {
		    private static final long serialVersionUID = 1L;
			@Override
		    public boolean isCellEditable(int row, int col) {
		       switch (col) {
		       	case 0:
		       		return false;
		       	default:
		       		return true;}
		    }
		};
		
		modelPrices.setColumnIdentifiers(new String[]{ "Item Name","Price ($)"," Price(¢)"});
		
		tablePrices = new JTable(modelPrices);
		tablePrices.getTableHeader().setFont(new Font("Lucida Grande", Font.BOLD, 12));
		tablePrices.getTableHeader().setEnabled(false);
		tablePrices.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		tablePrices.putClientProperty("terminateEditOnFocusLost", true);
		tablePrices.setToolTipText("Double click an items price to edit");
		
		DefaultTableCellRenderer rightRenderer = new DefaultTableCellRenderer();
		rightRenderer.setHorizontalAlignment(JLabel.RIGHT);
		tablePrices.getColumnModel().getColumn(1).setCellRenderer(rightRenderer);
		
		JScrollPane scrollPrices = new JScrollPane(tablePrices);
		PricesTab.add(scrollPrices);
		
		
		JPanel panelButtons = new JPanel();
		PricesTab.add(panelButtons);
		
		JButton btnConfirm = new JButton("Save Prices");
		btnConfirm.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(SL.getSize() > 0) {
//					SL.printList();
					for(int i=0; i<tablePrices.getRowCount(); i++) {
						String item = (String) tablePrices.getModel().getValueAt(i, 0);
						String d = tablePrices.getModel().getValueAt(i, 1) + "";
						String c = tablePrices.getModel().getValueAt(i, 2) + "";
//						System.out.println("" + item + d + c);
						
						if (!SL.setItemPrice(item, d, c)) {
							JOptionPane.showMessageDialog(PricesTab, "Please use only positive numeric values for the price and make sure all cells are filled.", "Unable To Set Prices", JOptionPane.ERROR_MESSAGE);
							return;
						};
					}
					SL.sortList();
					if(!SL.saveToJSON()) {
						JOptionPane.showMessageDialog(EditTab, "Unable to save shopping list. See console for more information", "Unable To Save List", JOptionPane.ERROR_MESSAGE);
						return;
					}
					clearShoppingTab();
				}
			}
		});
		
		panelButtons.add(btnConfirm);
	}
	
	/**Class that is used to override the cell render model and format given Integer as currency*/
	public class CurrencyCellRenderer extends DefaultTableCellRenderer {
	    private static final long serialVersionUID = 1L;
		private static final NumberFormat formatter = NumberFormat.getCurrencyInstance();

	    @Override
	    public void setValue(Object value) {
	        if (value instanceof Integer) {
	            value = formatter.format((Integer) value / 100.0);
	        }
	        super.setValue(value);
	    }
	}
	
	/**Method that initializes components of the shopping tab*/
	private void initShoppingComponents() {
		ShoppingTab = new JPanel();
		ShoppingTab.setLayout(new BoxLayout(ShoppingTab, BoxLayout.Y_AXIS));
		
		JPanel panelBudget = new JPanel();
		ShoppingTab.add(panelBudget);
		
		JLabel lblBudget = new JLabel("Budget ($)");
		panelBudget.add(lblBudget);
		
		txtDollars = new JTextField("0");
		txtDollars.setToolTipText("Enter your budget in dollars here");
		txtDollars.setColumns(4);
		txtDollars.setHorizontalAlignment(SwingConstants.RIGHT);
		panelBudget.add(txtDollars);
		
		JLabel lblFormat = new JLabel(".");
		panelBudget.add(lblFormat);
		
		txtCents = new JTextField("00");
		txtCents.setToolTipText("Enter your budget in cents here");
		txtCents.setColumns(5);
		txtCents.addKeyListener(new KeyAdapter() {
		    public void keyTyped(KeyEvent e) { 
		        if (txtCents.getText().length() >= 2 ) {
		        	e.consume();
		        }      
		    }  
		});
		panelBudget.add(txtCents);
		
		Component rigidArea = Box.createRigidArea(new Dimension(30, 20));
		panelBudget.add(rigidArea);
		
		JButton btnShop = new JButton("Go Shopping");
		panelBudget.add(btnShop);
		btnShop.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				clearShoppingTab();
//				SL.printList();
				if(SL.getSize() > 0) {
					SL.sortList();
					B = new Budget(SL.getList());
					
					if(!B.setBudget(txtDollars.getText(), txtCents.getText())){
						JOptionPane.showMessageDialog(ShoppingTab, "Please enter a valid budget", "Unable To Go Shopping", JOptionPane.ERROR_MESSAGE);
						return;
					}
				}else {
					JOptionPane.showMessageDialog(ShoppingTab, "It dosesn't seem like you have a saved shopping list. Use the tabs to add items and set prices ", "Unable To Go Shopping", JOptionPane.ERROR_MESSAGE);
					return;
				}
				
				B.shop();
				shoppingTabActive = true;
				
				ArrayList<Item> purchased = B.getPurchased();
				if (purchased.size() > 0) {
					for(int i=0; i<purchased.size();i++) {
						modelPurchased.addRow(new Object[] {
								purchased.get(i).getName(),
								purchased.get(i).getQuantity(),
								purchased.get(i).getPriority(),
								purchased.get(i).getPriceCents(),
						});
					}
				}else {
					JOptionPane.showMessageDialog(ShoppingTab, "The purchased table is empty because we were unable to buy anything. Consider increasing your budget", "Notice", JOptionPane.INFORMATION_MESSAGE);
				}
				
				ArrayList<Item> remaining = B.getList();
				if (remaining.size() > 0) {
					for(int i=0; i<remaining.size();i++) {
						modelRemaining.addRow(new Object[] {
								remaining.get(i).getName(),
								remaining.get(i).getQuantity(),
								remaining.get(i).getPriority(),
								remaining.get(i).getPriceCents(),
						});
					}
				}else {
					JOptionPane.showMessageDialog(ShoppingTab, "The remaining table is empty because we bought everything we needed!", "Notice", JOptionPane.INFORMATION_MESSAGE);
				}
				
				modelRemaining.addRow(new Object[] {
						"Remaining Budget",
						"",
						"",
						B.getBudgetCents(),
				});
			}
		});

		
		//TABLE PURCHASED
		modelPurchased = new DefaultTableModel();
		modelPurchased.setColumnIdentifiers(new String[]{ "Item Name","Quantity","Priority", "Price/Item"});
		
		tablePurchased = new JTable(modelPurchased);
		tablePurchased.getTableHeader().setFont(new Font("Lucida Grande", Font.BOLD, 12));
		CurrencyCellRenderer renderer = new CurrencyCellRenderer();
		tablePurchased.getColumnModel().getColumn(3).setCellRenderer(renderer);
				
		JTextPane textPurchased = new JTextPane();
		textPurchased.setText("Purchased Items");
		textPurchased.setEnabled(false);
		textPurchased.setBackground(SystemColor.window);
		ShoppingTab.add(textPurchased);
		tablePurchased.setEnabled(false);
		
		JScrollPane scrollPurchased = new JScrollPane(tablePurchased);
		ShoppingTab.add(scrollPurchased);
		
		
		//TABLE REMAINING
		modelRemaining = new DefaultTableModel();
		modelRemaining.setColumnIdentifiers(new String[]{ "Item Name","Quantity","Priority", "Price/Item"});
		
		tableRemaining = new JTable(modelRemaining);
		tableRemaining.getTableHeader().setFont(new Font("Lucida Grande", Font.BOLD, 12));
		tableRemaining.getColumnModel().getColumn(3).setCellRenderer(renderer);
		
		JTextPane textRemaining = new JTextPane();
		textRemaining.setBackground(new Color(238, 238, 238));
		textRemaining.setText("Remaining Items");
		textRemaining.setEnabled(false);
		ShoppingTab.add(textRemaining);
		tableRemaining.setEnabled(false);
		
		JScrollPane scrollRemaining = new JScrollPane(tableRemaining);
		ShoppingTab.add(scrollRemaining);
		
		JPanel panelSave = new JPanel();
		
		JButton btnSave = new JButton("Update Shopping List and Save Remaining List");
		btnSave.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (B != null) {
					SL.setList(B.getList());
					save();
				}else {
					JOptionPane.showMessageDialog(ShoppingTab, "You must create a budget and go shopping first.", "Unable To Save Results", JOptionPane.ERROR_MESSAGE);
					return;
				}
			}
		});
		panelSave.add(btnSave);
		ShoppingTab.add(panelSave);
	}
	
     
    /** Create the GUI and show it.*/
    private static void createAndShowGUI() {
        //Create and set up the window.
        JFrame frame = new JFrame("Shopping Application");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setBounds(100, 100, 500, 600);
         
        //Add content to the window.
        frame.getContentPane().add(new ShoppingAppGUI(), BorderLayout.CENTER);
        
        //Display the window.
        frame.pack();
        frame.setVisible(true);
    }
     
    public static void main(String[] args) {
        //Schedule a job for the event dispatch thread:
        //creating and showing this application's GUI.
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                //Turn off metal's use of bold fonts
        UIManager.put("swing.boldMetal", Boolean.FALSE);
        createAndShowGUI();
            }
        });
    }
}