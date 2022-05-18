import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import React from "react";
import { shallow } from 'enzyme';
import AddPost from "../../component/AddPost";
Enzyme.configure({ adapter: new Adapter() });
test("should test AddPost component", () => {
  const wrapper = shallow(<AddPost />);
  expect(wrapper).toMatchSnapshot();
});