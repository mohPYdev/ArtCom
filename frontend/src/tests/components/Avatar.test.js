
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import React from "react";
import { shallow } from 'enzyme';
import Post from "../../component/Post";
Enzyme.configure({ adapter: new Adapter() });
test("should test Post component", () => {
  const wrapper = shallow(<Post />);
  expect(wrapper).toMatchSnapshot();
});