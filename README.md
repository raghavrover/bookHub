In this project I've built a **Book Hub** web application using React and a few third-party npm packages.

### Design Files

<details>
<summary>Click to view</summary>

- You can check the **Design Files** for different devices <a href="https://www.figma.com/file/T8BdpViEZL6DhFxu0HlEPY/Book-Hub?node-id=0%3A1" target="_blank">here</a> in `Figma`.

</details>

### About App

<details>
<summary>Click to view</summary>

- Book hub is a web application to collect your favorite books from a wide range of popular books and keep track of books that you're currently reading. The website is an SPA(single page application) application built using react hooks and react router dom, featuring various routes like `Login`, `Home`, `Bookshelves`, `Book Details` and `Not found`.
</details>

### App Routes

<details>
<summary>Login</summary>

- Authenticating the user by making an HTTP POST request(API call) to loginApiURL and upon successful authentication user is directed to home page.
- The JWT token received in response is securely stored in Cookies for further authorization.
- If the authentication fails a failure view is displayed by handling the error.
- Implemented home redirection when a logged tries to access login route.
</details>

<details>
<summary>Home</summary>

- An user friendly navigation menu to navigate across different routes.
- Top rated books data is fetched by making an HTTP GET request(API call) to topRatedBooksApiURL and response data is parsed and rendered in a React Slider Component.
- If the fetch request fails, failure is handled by displaying a failure view to notify the user take appropriate action.
</details>

<details>
<summary>Bookshelves</summary>

- Navigation menu to navigate across different routes.
- An intuitive bookshelves list to browse books through different shelves likes `All`, `Want_To_Read`, `Read`, and `Currently_Reading`.
- Selected Shelf books data is fetched by making an HTTP GET request(API call) to shelfBooksApiURL along with query parameters(shelf, searchText) and response data is parsed and rendered.
- If the fetch request fails, failure is handled by displaying a failure view to notify the user take appropriate action.
- No books found view is displayed when there are no books for entered search text within a shelf.
- Features: user can search for a book within a shelf.

</details>

<details>
<summary>Book Details</summary>

- Navigation menu to navigate across different routes.
- Book data is fetched by making an HTTP GET request(API call) to bookApiURL with path parameter and response data is parsed and rendered.
- If the fetch request fails, failure is handled by displaying a failure view to notify the user take appropriate action.

</details>

<details>
<summary>Not Found</summary>

- When a user provides any unspecified URL path, a not-found view is displayed to get back to home.
</details>

### User Credentials

<details>
<summary>Click to view user credentials</summary>

<br/>

**You can use any one of the following credentials**

```text
  username: harshad
  password: joy@85
```

```text
  username: kapil
  password: moon$008
```

```text
 username: rahul
 password: rahul@2021
```

<br/>
</details>
