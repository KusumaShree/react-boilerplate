"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem("options");
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (ex) {}
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var jsonData = JSON.stringify(this.state.options);
                localStorage.setItem("options", jsonData);
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {}
    }, {
        key: "handleDeleteOptions",
        value: function handleDeleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "handleDeleteOption",
        value: function handleDeleteOption(optionToRemove) {
            // if(this.state.options.indexOf(optionToRemove) > -1){

            // }
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: "handlePick",
        value: function handlePick() {
            var randNum = Math.floor(Math.random() * this.state.options.length);
            console.log(randNum);
        }
    }, {
        key: "handleAddOption",
        value: function handleAddOption(option) {
            if (!option) {
                return "Enter an option";
            } else if (this.state.options.indexOf(option) > -1) {
                return "This option is already present";
            } else {
                this.setState(function (prevState) {
                    return {
                        options: prevState.options.concat(option)
                    };
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var app = {
                title: "Indecision App",
                subTitle: "Put your life in hands of computer"
            };
            return React.createElement(
                "div",
                null,
                React.createElement(Header, { title: app.title, subTitle: app.subTitle }),
                React.createElement(Action, {
                    hasOptions: !!this.state.options.length,
                    handlePick: this.handlePick }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);
//set default properties
// IndecisionApp.defaultProps = {
//     options : []
// }

var Header = function Header(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        React.createElement(
            "h2",
            null,
            props.subTitle
        )
    );
};
Header.defaultProps = {
    title: "This is default value"
    // class Header extends React.Component{
    //     render() {
    //         console.log(this.props);
    //         return (
    //             <div>
    //                 <h1>{this.props.title}</h1>
    //                 <h2>{this.props.subTitle}</h2>
    //             </div>
    //         );
    //     }
    // }

};var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { disabled: !props.hasOptions, onClick: props.handlePick },
            "What should i do?"
        )
    );
};

// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What should i do?</button>
//             </div>
//         )
//     }
// }

var Option = function (_React$Component2) {
    _inherits(Option, _React$Component2);

    function Option() {
        _classCallCheck(this, Option);

        return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
    }

    _createClass(Option, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            console.log(this);
            return React.createElement(
                "li",
                null,
                this.props.option,
                React.createElement(
                    "button",
                    { onClick: function onClick() {
                            _this3.props.handleDeleteOption(_this3.props.option);
                        } },
                    "Remove"
                )
            );
        }
    }]);

    return Option;
}(React.Component);

var Options = function Options(props) {
    return React.createElement(
        "div",
        null,
        "Options here",
        React.createElement(
            "button",
            { onClick: props.handleDeleteOptions },
            "Remove All"
        ),
        props.options.length === 0 && React.createElement(
            "p",
            null,
            "Please add an option to get started"
        ),
        React.createElement(
            "ol",
            null,
            props.options.map(function (option, index) {
                return React.createElement(Option, { key: index, option: option, handleDeleteOption: props.handleDeleteOption });
            })
        )
    );
};
// class Options extends React.Component {
//     render(){
//         console.log(this.props.options);
//         return (

//             <div>
//                 Options here
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//                 <ol>
//                 {
//                     this.props.options.map((option, index) => {
//                         return <Option key={index} option={option}/>
//                     })
//                 }
//                 </ol>


//             </div>
//         )
//     }
// }

var AddOption = function (_React$Component3) {
    _inherits(AddOption, _React$Component3);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this4 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this4.handleAddOption = _this4.handleAddOption.bind(_this4);
        _this4.state = {
            error: undefined
        };
        return _this4;
    }

    _createClass(AddOption, [{
        key: "handleAddOption",
        value: function handleAddOption(e) {
            e.preventDefault();

            var option = e.target.elements.inputValue.value.trim();
            var error = this.props.handleAddOption(option);
            this.setState(function () {
                return {
                    error: error
                };
            });
            if (!error) {
                e.target.elements.inputValue.value = "";
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.state.error && React.createElement(
                    "p",
                    null,
                    this.state.error
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.handleAddOption },
                    React.createElement("input", { type: "text", name: "inputValue" }),
                    React.createElement(
                        "button",
                        null,
                        "Add"
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

// const User = (props) =>{
//     return (
//         <div>
//             <h2>Name: {props.name}</h2>
//             <h4>Age: {props.age}</h4>
//         </div>
//     )
// }
// ReactDOM.render(<IndecisionApp options={['op 1', 'op2']}/>,document.getElementById('appRoot'))


ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('appRoot'));
