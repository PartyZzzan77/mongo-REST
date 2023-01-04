# Simple API using mongoose and express

## how to use

```js
git clone https://github.com/PartyZzzan77/mongo-REST.git
cd mongo-API
npm install
npm start
```

## Then, for example, in postman, listen to the address

```js
localhost: 3000 / movies;
```

## Standard CRUD operations are available for tests, the body must be in json format

## Example film structure

```js
{
    "title": "Pulp Fiction",
    "director": "Quentin Tarantino",
    "year": 1994,
    "genres": ["crime", "drama"],
    "rating": 8.9,
    "duration": {
      "hours": 2,
      "minutes": 34
    },
    "reviews": [
      { "name": "Jack", "text": "Amazing movie!" },
      { "name": "Tom", "text": "Super cool" }
    ]
  },
```
