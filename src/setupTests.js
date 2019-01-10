import { render, shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

configure({ adapter: new Adapter() })

global.render = render
global.shallow = shallow
global.mount = mount
global.React = React
