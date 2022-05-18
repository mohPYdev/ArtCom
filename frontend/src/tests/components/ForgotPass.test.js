import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import React from "react";
import { shallow } from 'enzyme';
import ForgotPass from "../../component/ForgotPass";
Enzyme.configure({ adapter: new Adapter() });
test("should test ForgotPass component", () => {
  const wrapper = shallow(<ForgotPass />);
  expect(wrapper).toMatchSnapshot();
});