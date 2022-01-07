# MyKitchen

#### Better home cooking because you know home Best.

MyKitchen is Cooking Application by allowing users to build a personal pantry of ingredients searching for recipes is smarter and by showing what they already have on the shelf and in the refridgerator.

## Features

- Users build a list of Ingredients they usually have on hand.
- Users build a list of favorite recipes.
- Recipes are compared with the user's Ingredients to see what they probably already have.
- Welcome Modal lets users select starter ingredients from a list of common options.
- User Authentication & Authorization
- Recipe results link to the original poster.
- Dynamic stylings, mobile first design.

## User Stories

- As a User I should be able to Create, Login, Edit, and Delete an account.
- As a registered User, I should be able to create a personal list of Ingredients common to my kitchen.
- As a registered user, I should be able to save a list of favorite recipes.
- As a User, I should be able to search for recipes.
- As a User, I should be able to search for ingredients.
- As a registered User, I should be able to delete items from my saved recipes and ingredients.
- As a registered user, I should be able to which ingredients in a recipe are in my list of ingredients.
- As a user, I should be able to select a dietary option (vegan, vegetarian, etc) in my profile.

## Languages

- JavaScript
- Ruby
- SQL
- CSS

## Technologies

- React
- Rails
- PostgreSQL
- Edemam API
- TailWind CSS
- Heroku
- Netlify
- JSX
- Action Mailer
- JWT Authentication
- BCrypt

## Dependencies

#### Frontend

- dotenv: 10.0.0,
- react: 17.0.2,
- react-animated-slider: 2.0.0,
- react-dom: 17.0.2,
- react-easy-swipe: 0.0.22,
- react-icons: 4.3.1,
- react-modal: 3.14.4,
- react-router-dom: 6.1.1,
- react-scripts: 5.0.0,
- sass: 1.45.0,
- web-vitals: 1.0.1

#### Backend

- dotenv
- bcrypt, 3.1.7
- rack-cors
- jwt
- rest-client"

## Mockups

![MyKitchen Mockup](/public/images/readme/mockup.png)

## React Component Diagram

![MyKitchen Component Diagram](/public/images/readme/component_diagram.png)

## Routing Table & Database Structure

![MyKitchen Routing & Database](/public/images/readme/database_structure.png)

## Conceptual Wireframes

![MyKitchen Conceptual Wireframe](/public/images/readme/wireframe_1.png)

## Challenges

- Determing action when user is adding Recipe or Ingredient to backend to add to MyRecipes/MyIngredients.
- Search Reset using State and Query Params
- Utilization of Modal to create Starter Ingredients.

## Issues

- Sometimes there seems to be a minor bug where the User's nickname is not appearing in the dashboard.

## Next Steps

- Authentication

  - Reset Password
  - Stronger password requirements

- UI

  - Tighter Dashboard Design
  - Dashboard search to remember last selected option.

- Functionality
  - Shopping List Function
  - Allow users to add Ingredients straight from Recipes.
