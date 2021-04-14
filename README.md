# Demo Application for UI Elements using HTML, CSS & JS/TS

Before reading/inspecting please note. The draft you see is what I consider incredibly rough. I worked in several key classes/services to break down the task at hand into smaller chunks. I then wanted to come back code using `RXJS` to introduce a more event driven structure. Due to a busy few weeks I've not had the time to implement it the way I'd have liked to. But please read the section ***A Better Approach*** for more details.



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

### Functionality
- The application can be controlled from the debug panel found in the top right hand side of the page. 
- All functional deliverables can be assertained through this panel. 
  - Debug buttons to play hotbar animations can be found under ***Hotbar Animations*** 
  - Debug buttons to add items to the hotbar at specified positions can be found under ***Hotbar Interactions*** 
  - Debug buttons to trigger pop-ups, that do not add items to the hotbar can be found under ***Pop-up Toast***
  - In regards to selecting given slots, I took the liberty of expanding on the brief ever so slightly. Under ***Hotbar Selection*** is a collection debug buttons that will allow for the simulation of any given hotbar element.
  - In addition to that I've provided buttons that will add any item to the hotbar and the inventory resulting in the item appearing on the hotbar as well as a pop-up toast notification. These can be found under ***Item Addition***
  - I took the liberty of adding an extra feature. I found the pop-up toast to be slightly incovenient. This was in part due to my leaving the UI oversized (inentionally) as a way to better use the space. By clicking the button marked ***Adjust Style*** the css relating to pop-ups will change. Pressing it again will revert this. This could be a potential alternative for the UI.
- Reducing the width of the application will result in the hotbar elements stacking, as requested.
- All visual elements have been laid out in accordance with the spec. With the addition of an alternative toast location being provided for demonstration purposes.


## A Better Approach
Like I mentioned this project was treated like an MVP and as such the code is a bit rougher round the edges than I usually strive to. I instead aimed to staddle a line between functionality and demonstration of how I think when approaching a task. I have however outlined below improvements I would like to make in future, that I wasn't able to include due to my schedule. 


### Using Observables
The way in which everything is currently handled is fine. But the need to bind functionality due to a reliance on the `this` keyword in some places is rather limiting. To get around this I propose that the introduction of observables (a push driven notification, provided by rxjs) would be benefical.

Observables would be useful if coupled with a series of animations services (see `src/services/...`). Each UI feature could call on an animation within the service and then subscribe to a `BehaviourSubject` provided back. When that subsription eventually returns a true to the callback function, the UI component can process it's next step. For example, when cascading the columns of the hotbar it could be beneficial once a column has completed its transition on/off the screen then the notification could be used to trigger the next column to cascade:  

`animationService.cascadeColumn(elements).subscribe((completed) => {if (completed) this.cascadeNextColumn();})` 

This would remove large sections of code from all the current animations handlers. It would also benefit the next point greatly.


### Interupts
Currently the majority of the animations I implemented have some form of queuing functionality. For example if an item is added to the hotbar, the item swells and then shrinks. If another item is then added, an animation is queued up to then play once the current animation has finished. This is fine and works to the specification provided on certain elements like the pop-up toast. But by providing interupts the system could potentialy seem a lot more repsonsive.

Another bonus would be that it fixes certain conflicts between with Javascript's setTimeouts. I found some scheduling issues, whereby even the a timeout had been cleared it stil managed to play. By adding interrupt methods a routine coudl run to first ensure the animation currently playing has come to a stand still. Before adjusting animation speeds and firing the counter-animation requested. 






