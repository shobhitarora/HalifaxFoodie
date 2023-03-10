import React,{Component} from 'react'

export class OnlineSupport extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        (function(d, m){
            var kommunicateSettings = {"appId":"29cb5df47983f730fd6b94f92dd9c6676","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
          })(document, window.kommunicate || {});
    }

    render(){
        return (
            <div>

            </div>
        )
    }
}

/** References
1. https://www.kommunicate.io 
*/
