import React from 'react'

class Welcome extends React.Component {
    render() {
        //console.log(window.parent.document.getElementsByTagName("iframe")[0].attributes.token.value);
        let token;
        if(window.parent.document.getElementsByTagName("iframe")[0]){
            token = window.parent.document.getElementsByTagName("iframe")[0].attributes.token.value;
        }
        return (
            <div>
                {token==="e10adc3949ba59abbe56e057f20f883e"?
                    <div>
                        <h1>Welcome!!!</h1>
                        <h2>Welcome!!!</h2>
                        <h3>Welcome!!!</h3>
                        <h4>Welcome!!!</h4>
                        <p>Welcome!!!</p>
                        <h1>Welcome!!!</h1>
                        <h2>Welcome!!!</h2>
                        <h3>Welcome!!!</h3>
                        <h4>Welcome!!!</h4>
                        <p>Welcome!!!</p>
                        <h1>Welcome!!!</h1>
                        <h2>Welcome!!!</h2>
                        <h3>Welcome!!!</h3>
                        <h4>Welcome!!!</h4>
                        <p>Welcome!!!</p>
                        <h1>Welcome!!!</h1>
                        <h2>Welcome!!!</h2>
                        <h3>Welcome!!!</h3>
                        <h4>Welcome!!!</h4>
                        <p>Welcome!!!</p>
                    </div>:
                    <div>
                        <h1>请勿尝试从外部访问该页面</h1>
                    </div>
                }
            </div>
        )
    }
}

export default Welcome