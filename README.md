# Interactive Help
===============
#[Configuration]
------
##[text]
Create a text in the screen

1. **type**: "text"  **_(required)_**
2. **text**: string  **_(required)_**
3. **top**: absolute position top 
4. **left**: absolute position left
5. **size**: font size (css style)
6. **nextStep**: next option to change view
7. **prevStep**: back option to change view
8. **box**: boolean, put border and fill
9. **maxSizeBox**: max box width 

##[object]
Creates a text box on the screen associated with the object

1. **type**: "object"  **_(required)_**
2. **info|text**: string  **_(required)_**
3. **selector**: string (jQuery Selector)  **_(required)_**
4. **maxSizeBox**: max box width
5. **position**: "left" | "top" | "right" | "bottom"
6. **nextStep**: next option to change view
7. **prevStep**: back option to change view

##[waitText]
Creates a text "Please wait" on the screen, usually used to show that the next step will be automatic

1. **type**: "waitText"  **_(required)_**
2. **hAlign**: "left" | "center"(default) | "right"
3. **vAlign**: "bottom" | "middle" (default) | "top",

##[function]
Executes a function at the current step

1. **type**: "function" **_(required)_**
2. **fn**: function or string function **_(required)_**
3. **time**: wait time, default "0"

##[waitElement]
Wait Element exist and be visible on the screen to execute a function. Case timeout, executes a "fail function"

1. **type**: "waitElement" **_(required)_**
2. **selector**: string (jQuery Selector)  **_(required)_**
3. **fn**: function (ok function)
4. **fnFail**: function (fail function, throw timeout case function null )
5. **timeOut**: time to fail (default 30s)

##[region]
Creates a region associated with an element on the screen

1. **type**: "region" **_(required)_**
2. **selector**: string (jQuery Selector)  **_(required)_**
3. **clickable**: boolean
4. **fn**: function or string function


