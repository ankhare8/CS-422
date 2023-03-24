package application;
	
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class Main extends Application {
    @Override
    public void start(Stage stage) throws IOException {
    	try {
    		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("MainScene.fxml"));
            Scene scene = new Scene(fxmlLoader.load());
            stage.setTitle("Shopping Application");
            stage.setScene(scene);
            stage.setResizable(false);
            stage.show();
    	} catch(Exception e) {
    		e.printStackTrace();
    	}
    }

    public static void main(String[] args) {
        launch();
    }
}
