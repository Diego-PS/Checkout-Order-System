# Checkout Order System
A simple checkout Order System web app for a restaurant.
## 1. Setup
### 1.1 Add images
Make sure you have the images in server/public/images folder (they must be added after clone as they are too large to store on github). The images can be downloaded from the following Drive folder: https://drive.google.com/drive/folders/1WjmQ0_EcDSV0dYMXpVazAlNcGdLZlMFK?usp=sharing

### 1.2 Run docker compose
Inside the cloned folder, run docker-compose
```console
docker-compose up --build
```

or
```console
docker compose up --build
```
### 1.3 Access the web app url
With the containers running, the server will be directed to port 3000, the database to port 5432 and the web client to port 5173
To access the web app, open the following url in your browser: http://localhost:5173

## 2. Server side

### 2.1 Database
To allow a better management of the items and categories for the restaurant, those were modeled into the database scheme as well as the orders. The data from the JSON file a can be imported running the seed script.

![db-diagram](https://github.com/user-attachments/assets/80ed0e12-5875-4681-b401-f5d7ae9e8742)

The idea behind the payment is that we would communicate with a bank API to generate a code that the user can use to pay and we can check if the payment was completed later and update the state of the payment and order into our data. The code could be a random-generate pix key for example. For the purpose of this demonstration it just generates a hexadecimal code.

### 2.2 API

#### GET - /category
Returns all the categories as given in the JSON file.

![category-get](https://github.com/user-attachments/assets/531d3aec-3ad1-4901-bbb1-267f020f7cad)

#### GET - /item?categoryId=\<CATEGORY ID>&name=\<SEARCH TERM>
Returns the corresponding items, can filter by category id and/or search for name, it also populates the category field.

![item-get](https://github.com/user-attachments/assets/091a4e28-cdad-4ddb-befb-6cd703a16302)

#### POST - /order/submit
The body must contain the name of the person who placed the order, in field "buyer" is well as the purchases, which includes the id of the item and the quantity of items bought for each type.

![submit-order](https://github.com/user-attachments/assets/87db22e3-ab1b-4778-b203-8ae5624f75b4)

It does not return any body, only if there is an error, which in this API alway comes as an object with an errorType and a message.

## 3. Client side

### 3.1 User interface

#### Main page (menu)

The user can see the list of items, select a specific category and search for items, then add them to ther order. 
The user can see their order by clicking the icon to the right of the search bar, and then adding or removing items one by one from those selected in the menu.

![ui](https://github.com/user-attachments/assets/8c1ee074-7513-4f2c-8c8d-0a984b4a7fa5)

#### Order page

By clicking the order button, the user goes to the order page, where they can review their order and fill their names to actually place the order which will be registered in the system. After that, the user will see a message depending on the success of the order.

![place-order](https://github.com/user-attachments/assets/2643a1a5-ec83-4454-ba08-ed63ee8f22ae)

### 3.2 Local storage

The user's order is stored in the browser's local storage, and managed by useOrder hook.

#### OrderClient

This is the type that is stored, it contains the total value of the order, and is items, which are stored in a dictionary where their id the key to facilitate its retrieving, the value of the dictionary is an object with the item itself and the quantity.

![OrderClient](https://github.com/user-attachments/assets/6383a590-01eb-47e5-aa5d-38a9d9604ee3)

#### Functions of useOrder

Each item can only be added or removed one by one with functions addItem and removeItem respectively, except for when the storage is being clened through resetOrder, which removes all items from the order and it called after an order is successful.

## 4. Future improvements

### 4.1 Tests and CI/CD

We can write automated tests to the system and run them on every push through a CI/CD pipeline.

### 4.2 Items storage in browser

The way we store the whole items locally can result in problems. Suppose we change the price of an item, or remove it from the menu, still the old item will be kept in the browser's storage. We could solve that problem by storing only the ids in local storage, and then checking the server through new endptoins to obtain up-to-date information about the items.
