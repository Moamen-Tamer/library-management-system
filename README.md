# JavaScript Library Management System 📚

A comprehensive library management system built in JavaScript featuring asynchronous operations, book borrowing/returning, penalty management, and advanced search capabilities.

## Features ✨

- **Async Book Search**: Search books by title, author, genre, or year
- **Book Borrowing System**: Borrow and return books with automatic date tracking
- **Penalty Management**: Automatic penalty calculation for overdue returns
- **Multi-Search**: Perform multiple searches simultaneously using Promise.allSettled
- **Data Validation**: Built-in type checking and input validation
- **Network Simulation**: Realistic network delays for database operations

## Quick Start 🚀

```javascript
// Initialize the library
const library = new Library();

// Search for books
const fantasyBooks = await library.singleSearch('fantasy');
const booksFrom2021 = await library.singleSearch(2021);

// Borrow a book
await library.borrowBook('John Doe', 'Echoes of Eternity');

// Return a book
await library.returnBook('John Doe', 'Echoes of Eternity');

// Multiple searches
const results = await library.multiSearch(['fantasy', 'thriller', 'mystery']);
```

## API Reference 📖

### Core Methods

#### `fetchBooks(key)`
Fetches books from the database based on search criteria.
- **Parameters**: `key` (string|number) - Search term or year
- **Returns**: Promise resolving to array of matching books
- **Throws**: Error if no matches found

#### `borrowBook(clientName, bookTitle)`
Allows a client to borrow a book with automatic tracking.
- **Parameters**: 
  - `clientName` (string) - Name of the borrower
  - `bookTitle` (string) - Title of the book to borrow
- **Returns**: Promise resolving to book details or null on error
- **Features**: 
  - 3-day borrowing period
  - Duplicate borrowing prevention
  - Client registration

#### `returnBook(clientName, bookTitle)`
Process book returns with penalty calculation.
- **Parameters**:
  - `clientName` (string) - Name of the borrower  
  - `bookTitle` (string) - Title of the book to return
- **Returns**: Promise resolving to success message or null on error
- **Features**:
  - Automatic penalty calculation ($10 for overdue)
  - Date validation

#### `singleSearch(key)`
Performs a single search operation with error handling.
- **Parameters**: `key` (string|number) - Search criteria
- **Returns**: Promise resolving to search results or null on error

#### `multiSearch(keys)`
Performs multiple searches concurrently.
- **Parameters**: `keys` (Array) - Array of search terms (must be same type)
- **Returns**: Promise resolving to array of results using Promise.allSettled
- **Validation**: Ensures all keys are the same type

#### `displayBooks(filterFn)`
Displays books with optional filtering.
- **Parameters**: `filterFn` (Function, optional) - Filter function for results
- **Returns**: Promise resolving to books array or null on error

#### `payPenalty(clientName)`
Clears penalties for a specific client.
- **Parameters**: `clientName` (string) - Name of the client
- **Returns**: Promise resolving to success message

### Utility Methods

- `isString(value)` - Type checking for strings
- `isNumber(value)` - Type checking for numbers  
- `isStringOrNumber(value)` - Type checking for strings or numbers
- `dash(character)` - Console formatting utility

## Data Structure 💾

The library contains:
- **25 Books** across multiple genres
- **7 Authors** including Alice Monroe, David Carter, Clara Hughes
- **6 Genres**: Fantasy, Thriller, Romance, Adventure, Mystery, Science Fiction
- **Years**: 2018-2023 publication range

## Error Handling 🛡️

- Comprehensive try-catch blocks
- Input validation for all methods
- Type checking utilities
- Promise rejection handling
- Graceful error messages

## Technical Features ⚙️

- **Async/Await**: Modern JavaScript asynchronous patterns
- **Promise.allSettled**: Concurrent operation handling
- **Network Simulation**: Realistic delays (500-2000ms)
- **Data Persistence**: In-memory tracking of borrowing dates and client data
- **Functional Programming**: Arrow functions and array methods

## Example Usage Scenarios 🎯

### Search Operations
```javascript
// Single searches
const mysteryBooks = await library.singleSearch('mystery');
const recentBooks = await library.singleSearch(2023);

// Multiple searches
const genreSearch = await library.multiSearch(['fantasy', 'thriller']);
const yearSearch = await library.multiSearch([2020, 2021, 2022]);
```

### Library Management
```javascript
// Complete borrowing workflow
await library.borrowBook('Alice Smith', 'Shadows in the Mist');
// ... after 3+ days
await library.returnBook('Alice Smith', 'Shadows in the Mist'); // Penalty applied
await library.payPenalty('Alice Smith'); // Clear penalty
```

### Display and Filtering
```javascript
// Show all fantasy books
await library.displayBooks(book => book.genre === 'fantasy');

// Show books from specific author
await library.displayBooks(book => book.author === 'alice monroe');
```

## Installation 📦

1. Clone the repository:
```bash
git clone https://github.com/yourusername/library-management-system.git
```

2. Include the library in your project:
```javascript
// Import or include library.js
const library = new Library();
```

## License 📄

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using modern JavaScript ES6+ features
