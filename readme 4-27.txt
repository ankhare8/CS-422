# Unit Testing

This project uses Jest, a JavaScript testing framework, for unit testing. Unit tests help ensure that each individual function or component works as expected, 
catch bugs early in the development process, and make the codebase more maintainable and reliable.

## Getting Started

1. Install the necessary dependencies:

bash
npm install

Test Files
The tests are organized into separate files based on the components and utility functions being tested. The test files are located in the same directories as the files they are testing and follow the naming convention [filename].test.js.

Components
ShoppingList.test.js: Tests for the ShoppingList component, which renders the shopping list items.
SellList.test.js: Tests for the SellList component, which renders the sell list items based on the user's budget.
Utility Functions
fetchShoppingList.test.js: Tests for the fetchShoppingList function, which fetches shopping list data from Firebase.
generateSellList.test.js: Tests for the generateSellList function, which generates a sell list based on the user's budget and shopping list data.
Mocks and Utilities
Firebase Mock: To avoid making actual network requests during testing, the firebase/firestore package is mocked to simulate the database interaction.
Mock Data: Sample shopping list data is used in the tests to simulate real-world scenarios.
Writing New Tests
When adding new features or components, create corresponding test files and write tests following the Jest documentation and existing test examples. Make sure to update the tests when making changes to the codebase and run them regularly to catch issues early on.

For more information on Jest and testing best practices, visit the Jest documentation.
