window.options = [
    [
        {
            type:"text",
            text:"Introduction Menu",
            nextStep:true
        }
    ],
    [
      {
          type:"text",
          text:"<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "+
                "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. "+
                "Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>",
          nextStep:true,
          prevStep:true,
          box:true,
          top:"50px",
          left:"500px"
      }
    ],
    [
        {
            type:"object",
            selector:".dropdown-menu",
            info:"Text box attached to the right",
            position:"right",
            prevStep:true
        },
        {
            type:"object",
            selector:".dropdown-menu",
            info:"Text box attached to the left",
            position:"left",
            prevStep:true
        },
        {
            type:"object",
            selector:".dropdown-menu",
            info:"Text box attached on top",
            position:"top",
            prevStep:true
        },
        {
            type:"object",
            selector:".dropdown-menu",
            info:"Text box attached on bottom",
            position:"bottom",
            prevStep:true
        }
    ]
]