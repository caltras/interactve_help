# Interactive Help
===============
#[Configuration]
------
##[text]
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
1. **type**: "object"  **_(required)_**
2. **info|text**: string  **_(required)_**
3. **selector**: string (jQuery Selector)  **_(required)_**
4. **maxSizeBox**: max box width
5. **position**: "left" | "top" | "right" | "bottom"
6. **nextStep**: next option to change view
7. **prevStep**: back option to change view

##[waitText]
1. **type**: "waitText"  **_(required)_**
2. **hAlign**: "left" | "center"(default) | "right"
3. **vAlign**: "bottom" | "middle" (default) | "top",

##[function]
1. **type**: "function" **_(required)_**
2. **fn**: function or string function **_(required)_**
3. **time**: wait time, default "0"

##[waitElement]
1. **type**: "waitElement" **_(required)_**
2. **selector**: string (jQuery Selector)  **_(required)_**
3. **fn**: function (ok function)
4. **fnFail**: function (fail function, throw timeout case function null )
5. **timeOut**: time to fail (default 30s)

##[region]
1. **type**: "region" **_(required)_**
2. **selector**: string (jQuery Selector)  **_(required)_**
3. **clickable**: boolean
4. **fn**: function or string function


