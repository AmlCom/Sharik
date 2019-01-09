import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Signup from '../singup'
import Signin from '../singin'
import Profile from '../profile';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, render } from 'enzyme';
configure({ adapter: new Adapter() });


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('renders Signup component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Signup />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Singin without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Signin />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it('renders About without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<About />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// it('renders SignInCreator without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<SignInCreator />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// it('renders EventClassNew without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<EventClassNew />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });



describe('Testing the Signup component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Signup />, div);
  });
  it('should render correctly in "debug" mode', () => {
	 	// In debug mode, Chainer checks values of variables on runtime and shows more detailed error messages.
	 	// It helps you to debug your programs. However, it requires some additional overhead time.
    const component = shallow(<Signup debug />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly with no props', () => {
    const component = shallow(<Signup/>);
    expect(component).toMatchSnapshot();
  });
  it('should render banner text correctly with given strings', () => {
    const strings = ['one', 'two'];
    const component = shallow(<Signup list={strings} />);
    expect(component).toMatchSnapshot();
  });
});

describe('Testing the Signin component', () => {
	it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Signin />, div);
  });
	it('should render correctly in "debug" mode', () => {
	 	// In debug mode, Chainer checks values of variables on runtime and shows more detailed error messages.
	 	// It helps you to debug your programs. However, it requires some additional overhead time.
    const component = shallow(<Signin debug />);
  
    expect(component).toMatchSnapshot();
  });
  it('should render correctly with no props', () => {
    const component = shallow(<Signin/>);
    expect(component).toMatchSnapshot();
  });
  it('should render banner text correctly with given strings', () => {
    const strings = ['one', 'two'];
    const component = shallow(<Signin list={strings} />);
    expect(component).toMatchSnapshot();
  });
});



describe('Testing the Teacher component', () => {

it('renders Profile component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Profile />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Comments component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Comments />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Request component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Request />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Schedule component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Schedule />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Teacher component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Teacher />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Teachers component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Teachers />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Videos component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Videos />, div);
  ReactDOM.unmountComponentAtNode(div);
});


}