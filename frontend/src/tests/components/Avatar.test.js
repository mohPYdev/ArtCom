
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import React from "react";
import { shallow } from 'enzyme';
import Avatar from "../../component/Avatar";
Enzyme.configure({ adapter: new Adapter() });
test("should test Avatar component", () => {
  const wrapper = shallow(<Avatar />);
  expect(wrapper).toMatchSnapshot();
});