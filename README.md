# Demo Application for UI Elements using HTML, CSS & JS/TS

Before reading/inspecting please note. The draft you see is what I consider incredibly rough. I worked in several key classes/services to break down the task at hand into smaller chunks. I then wanted to come back code using `RXJS` to introduce a more event driven structure. Due to a busy few weeks I've not had the time to implement it the way I'd have liked to. But please read the section ***A Better Approach*** for more details.


## Running the Application & Interaction
### Running the Application (Advised)
- Download the Source code onto your local machine by either cloning this repository or downloading a Zip file.
- Once downloaded, the application can be run by opening the `dist/` directory and opening `Main.html` in your preferred browser.

### Running the Application in Development
- Install `npm`
- Install `webpack` 
- Install `copy-webpack-plugin`
- Install `rxjs`
- Navigate to the root directory and run `npm start`

## About A Better Approach
Using the time given I went back over this and did some significant refactors that change the flow of demo. Animations have been moved into a variety of services that control aspects of the styling necessary for animation (e.g. scaling, opacity).

These services allow for an animation to be easily interrupted and stopped by external processes, as well as allowing larger animations (seen in `src/animations`) to be chained together through the use of observables.

The main benefit of the observables was that when it came to larger animations, instead of trying to chain together a series of timeouts, I could instead break the animation down into smaller chunks and fire those chunks as each observable emitted on completion.

Another benefit however, was the easy implementation of interruption systems, to allow button clicks to stop animations, start new ones, whilst having them adjust to the current position rather than behave as if they were in an on/off position. 

My thoughts were that should in a practical sense the UI project need frequent animations (as done here), then a service could be created to handle the individual parts of the animation (like scale, see `src/services/animation/scale-animation.service.ts`) and then those services can be scripted together in a predefined larger animation (such as `animations/item-selection-animation.ts`).

The way the `rxjs` `observables` are implemented here are just one of many. Depending on the needs of the animation, and limitations of the Coherent HTML Engine, further steps could be taken to optimise this further. For example combining an observable pattern with `rxjs` state stores would persist data in client side caches. If coherent entertained this, then data between scenes may not need reloading and could possibly instead by cached for a quicker retrieval.

## On Development
### Technology Used
This exercise was undertaken in *HTML*, *CSS* and *Typescript*. With *Webpack* being used to manage application bundling. *RXJS* was imported into the project to be used in relation to some animation services, however, this was not finalised. *NPM* was used for package management.


### Inspecting the Code
Under the route directory all the configuration files relating to typescript, webpack and others can be found. There is no real need to inspect these as they are purely used for config and not much exciting happens in them.


#### Directory -> src
The source code for the project can be found under the `src/` directory. Inside you can find all the raw HTML, CSS and Typescript code. I personally like to follow a file structure grouped by feature over function for frontend work, especially when attempting to create an MVP like this. Usually I would aim to create a monorepo to handle frontend architecture. With modules being used for dependency management (nx repositories are a personal preference of mine). However, due to this being an MVP I instead opted for a lighter approach.


#### src -> app.ts
Entry point for the application.

#### src -> Main.html
Page html.


#### src -> assets
In the assets folder all images used by the application can be found. The references for the used assets can be found in `references.txt`. If no refernce is specified then it can be assumed to be provided in the brief or edited by myself.


#### src -> hotbar
Contains services and classes relating to the hotbar UI element. Functionality has been broken down into the following.
- `hotbar.ts` ~ Handles requests from the UI. Makes calls to the hotbar services with some parameter validation.
- `hotbar-item.service.ts` ~ Handles the placing of items onto the hotbar.
- `hotbar-selection.service.ts` ~ Handles the selection of hotbar elements.
- `hotbar-transition.service.ts` ~ Handles transitions that apply to the entire hotbar. Implementations of this class is used to animate the cascade and sublt fade effects.


#### src -> model
I won't bore you. This one's just the under lying model. Currently it features a `AbstractItem` and several concrete implementations.


#### src -> pop-up
In here `toast.ts` handles all functionality surrounding pop-up toast elements. 


#### src -> services
These were part of my implementation of a observable based method of handling this task. I decided to leave them in for you to see how I'd identified certain pieces of code to be extracted from all the other ui-feature classes and services. See below in ***A Better Approach*** for more details. 


#### src -> style
Contains stylesheets used.


#### src -> util
I created several utility functions to handle things such as translating elements, opacity fades, parsing style values into numbers, etc. Some of these were exported, others that found frequent use accross the project were bound to the `window` property of the app. This allowed for global access without needing to constantly re-import elements.





