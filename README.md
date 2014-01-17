# Interactive Help
===============
#[Configuration]
##[text]
Create a text in the screen

1. **type**: "text"  **_(required)_**
2. **text**: string  **_(required)_**
3. **top**: absolute position top 
4. **left**: absolute position left
5. **size**: font size (css style)
6. **nextStep**: boolean | number | string (step id), next option to change view
7. **prevStep**: boolean | number | string (step id), back option to change view
8. **box**: boolean, put border and fill
9. **maxSizeBox**: max box width 

##[object]
Creates a text box on the screen associated with the object

1. **type**: "object"  **_(required)_**
2. **info|text**: string  **_(required)_**
3. **selector**: string (jQuery Selector)  **_(required)_**
4. **maxSizeBox**: max box width
5. **position**: "left" | "top" | "right" | "bottom"
6. **nextStep**: boolean | number | string (step id),next option to change view
7. **prevStep**: boolean | number | string (step id),back option to change view

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


##Example
```html
<!DOCTYPE html>
<html>
  <head>
    <link href="../manual.css" rel="stylesheet">
  </head>
  <body>
  
      <input type="text" id="name"/>
      <button id="btnOk">OK</button>
      
      <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="simple.js"></script>
      <script src="../jquery.waitelement.js"></script>
      <script src="../manual.js"></script>
  </body>
</html>
```
###Configuration Example
Matrix
```javascript
window.options = [
      [
        {
          type:"text",
          text:"Welcome to the Example",
          size:"24px",
          nextStep:true
        }
      ],
      [
        {
          type:"object",
          selector:"#name",
          info: "name Input text ",
          position:"top",
          maxSizeBox:"150px",
        },
        {
          type:"object",
          selector:"#btnOk",
          info: "Ok Button",
          position:"bottom",
          maxSizeBox:"150px",
        },
        {
          type:"text",
          text:"Animation",
          box:true,
          maxSizeBox:"100px",
          top:"50px",
          left:"550px",
          nextStep:true,
          prevStep:true
        }
      ],
      [
        {
          type:"waitText",
        },
       {
        type:"function",
        fn: function(){
          window.manual.nextStep()
        },
        time:"5000"
       }
      ],
      [
        {
          type:"object",
          selector:"#name",
          info: "name Input text ",
          position:"bottom",
          maxSizeBox:"150px",
        },
        {
          type:"object",
          selector:"#btnOk",
          info: "Ok Button",
          position:"top",
          maxSizeBox:"150px",
        },
        {
          type:"waitText",
        },
       {
        type:"function",
        fn: function(){
          window.manual.nextStep()
        },
        time:"3000"
       }
      ],
      [
        {
          type:"object",
          selector:"#name",
          info: "name Input text ",
          position:"left",
          maxSizeBox:"150px",
        },
        {
          type:"object",
          selector:"#btnOk",
          info: "Ok Button",
          position:"right",
          maxSizeBox:"150px",
        },
        {
          type:"waitText",
        },
       {
        type:"function",
        fn: function(){
          window.manual.nextStep();
        },
        time:"3000"
       }
      ],
      [
        {
          type:"text",
          text:"Finished!!!",
          size:"24px",
          prevStep:0
        }
      ]
]

```
List Object
```javascript

window.options = [
      {
        id:"step1",
        items:[
                {
                  type:"text",
                  text:"Welcome to the Example",
                  size:"24px",
                  nextStep:true
                }
              ]
      },
      {
        id:"step2",
        items:[
            {
              type:"object",
              selector:"#name",
              info: "name Input text ",
              position:"top",
              maxSizeBox:"150px",
            },
            {
              type:"object",
              selector:"#btnOk",
              info: "Ok Button",
              position:"bottom",
              maxSizeBox:"150px",
            },
            {
              type:"text",
              text:"Animation",
              box:true,
              maxSizeBox:"100px",
              top:"50px",
              left:"550px",
              nextStep:true,
              prevStep:'"step1"'
            }
          ]
      },
      {
        id:"step3",
        items:[
                {
                  type:"waitText",
                },
               {
                type:"function",
                fn: function(){
                  window.manual.nextStep()
                },
                time:"5000"
               }
              ]
      },
      {
        id:"step4",
        items:
            [
              {
                type:"object",
                selector:"#name",
                info: "name Input text ",
                position:"bottom",
                maxSizeBox:"150px",
              },
              {
                type:"object",
                selector:"#btnOk",
                info: "Ok Button",
                position:"top",
                maxSizeBox:"150px",
              },
              {
                type:"waitText",
              },
             {
              type:"function",
              fn: function(){
                window.manual.nextStep()
              },
              time:"3000"
             }
            ]
      },
      {
        id:"step5",
        items:[
              {
                type:"object",
                selector:"#name",
                info: "name Input text ",
                position:"left",
                maxSizeBox:"150px",
              },
              {
                type:"object",
                selector:"#btnOk",
                info: "Ok Button",
                position:"right",
                maxSizeBox:"150px",
              },
              {
                type:"waitText",
              },
             {
              type:"function",
              fn: function(){
                window.manual.nextStep();
              },
              time:"3000"
             }
          ]
      },
      {
        id:"step6",
        items:[
            {
              type:"text",
              text:"Finished!!!",
              size:"24px",
              prevStep:'"step1"'
            }
          ]
      }
]

```

