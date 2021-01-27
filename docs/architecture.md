### Apps

- `birds` - Uses redux websockets middleware. The websocket server is supplied by `api`.
- `cats` - A standard react/redux application that uses redux-toolkit.
- `dogs` - The same applications as the others, but instead uses react-query instead of redux.

#### Dependency Graph

<div align="center" style="padding: 20px">
    <img alt="dep-graph" src="./dep-graph.png">
</div>

#### Directory/File Structure

```
📦 apps
 ┣ 📂 cats
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 app
 ┃ ┃ ┃ ┣ 📜 App.tsx
 ┃ ┃ ┃ ┣ 📜 reducer.ts
 ┃ ┃ ┃ ┣ 📜 Routes.tsx
 ┃ ┃ ┃ ┗ 📜 store.ts
 ┃ ┃ ┣ 📂 common
 ┃ ┃ ┃ ┃ ┗ 📂 components
 ┃ ┃ ┃ ┃ ┗ 📂 hooks
 ┃ ┃ ┣ 📂 features
 ┃ ┃ ┃ ┗ 📂 pets
 ┃ ┃ ┃ ┃ ┗ 📂 components
 ┃ ┃ ┃ ┃ ┗ 📂 hooks
 ┃ ┃ ┃ ┃ ┗ 📜 pets.slice.ts
📦 libs
 ┣ 📂 common-ui
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 common
 ┃ ┃ ┃ ┃ ┗ 📂 components
 ┃ ┃ ┃ ┃ ┗ 📂 hooks
 ┃ ┃ ┣ 📂 features
 ┃ ┃ ┃ ┗ 📂 nav
 ┃ ┃ ┃ ┃ ┗ 📂 components
 ┣ 📂 core
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 common
 ┃ ┃ ┃ ┃ ┗ 📂 hooks
 ┃ ┃ ┣ 📂 features
 ┃ ┃ ┃ ┗ 📂 auth
 ┃ ┃ ┃ ┃ ┗ 📂 components
 ┃ ┃ ┃ ┃ ┗ 📜 auth.slice.ts
```

- Apps contain all of our applications that would get deployed
  - Should have an app folder that describes all of the application's routes and reducers
  - Can have a common folder with generic components and hooks that only relate to that app
  - Should have a set of features that only relates to that application
    - A feature should be a set of components, hooks, and a redux slice
    - Features should not be nested inside each other
    - It might take multiple features to actually make up a whole view
- Libs contain code that should be shared with other applications
  - Common-ui would just be presentational components (dumb components) or components that just use local state
    - Common folder with generic components and hooks
    - Features would be more less generic components and can be a group of components to build up that feature
  - Core should contain code related to data access and redux state management
    - Should only contain components that dispatch async actions, use redux hooks, and returns a presentational component

### Component Folder Structure

```
📂 components
 ┣ 📜 Autocomplete.stories.tsx
 ┣ 📜 Autocomplete.test.tsx
 ┣ 📜 Autocomplete.tsx
```

It should be very easy to locate everything related to a component (story, test and styles). Styles and stories shouldn't be nested away in their own directories.

### Shared Redux Reducers

For apps to take advantage of state from shared reducers inside of the `core` library they should be imported into the root reducer of the application (`apps/cats/src/app/reducer.ts`).

For example:

- We have a auth reducer (`libs/core/src/features/auth/auth.slice.ts`) that lives in the `core` library and we want to take advantage of states changes that occur from dispatched actions inside of our `cats` application.
- We should import this into our `cats` application's root reducer like so:

```javascript
import { combineReducers } from '@redux/toolkit';
import { authReducer } from '@pets/core';
import { petsReducer } from '../features/pets/pets.slice';

export const reducer = {
  core: combineReducers({ auth: authReducer }),
  pets: petsReducer
};
```

- This way we can grab the slices from our core library that we care about and namespace them correctly to the library they belong to.

We should also make sure that we namespace our actions correctly. So if an action is coming from our core library it should follow this pattern `{app/lib}/{app/lib name}/{feature}/{action}/{sub-action}`. For example, if I was to dispatch an action to fetch pets they would display as the following in redux devtools:

```
app/cats/pets/fetchPets/pending
app/cats/pets/fetchPets/fulfilled
```

This way it is easy to locate where actions live.
