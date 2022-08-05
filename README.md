#

## Developer Notes

### Issues that accured

-   during the later stage of development while creating the cart itself, i came across an issue i had not thought of, is that my session storage was being used to preload all items and use whenever i pleased, this did not leave another category for me to use for all items added which needed their own sort of sub cateogry for all added carts, and so I had to create 2 SessionStorage key arrays, one for cart items and preloaded items

### Alright so ill admit, im really proud of this project, i gave a bunch of time thinking of the best solutions for both simplicity and performance and i gotta say i did a good job through all the pushing through i did :) , but im sure you dont care about that part, heres my thought process

-   Upon loading the website to its store front, all possible items found inside of the firebase database will be saved into the sessionStorage to prevent any lag, now on a large scale this would only be done for selected items, but due to the nature of the project ive just preloaded the entire database for simplicity sake.
-   Once a request is placed to recieve an object either by getting all of them or by id, a JSON parse is completed to load back all of the pre-rendered items
