package application;

import javafx.scene.control.TableCell;
import javafx.util.StringConverter;

/**Class that is used to override the cell render model and format given Number as currency*/
public class PriceTableCell extends TableCell<Item, Integer> {
    
    private final StringConverter<Number> converter = new StringConverter<Number>() {
        @Override
        public String toString(Number object) {
            if (object == null) {
                return "";
            }
            int price = object.intValue();
            int dollars = price / 100;
            int cents = price % 100;

            return String.format("$%d.%02d", dollars, cents);
        }

        @Override
        public Number fromString(String string) {
            // Not needed, read-only column
            return null;
        }
    };

    @Override
    protected void updateItem(Integer priceInCents, boolean empty) {
        super.updateItem(priceInCents, empty);

        if (empty) {
            setText(null);
        } else {
            setText(converter.toString(priceInCents));
        }
    }
}
