import React from 'react';
import {
  Ic_fooiyti_a,
  Ic_fooiyti_c,
  Ic_fooiyti_e,
  Ic_fooiyti_f,
  Ic_fooiyti_i,
  Ic_fooiyti_n,
  Ic_fooiyti_s,
  Ic_fooiyti_t,
} from '../../../assets/svg';
const FooiytiImogi = props => {
  if (props) {
    return props.each_fooiyti === 'e' ? (
      <Ic_fooiyti_e />
    ) : props.each_fooiyti === 'i' ? (
      <Ic_fooiyti_i />
    ) : props.each_fooiyti === 's' ? (
      <Ic_fooiyti_s />
    ) : props.each_fooiyti === 'n' ? (
      <Ic_fooiyti_n />
    ) : props.each_fooiyti === 't' ? (
      <Ic_fooiyti_t />
    ) : props.each_fooiyti === 'f' ? (
      <Ic_fooiyti_f />
    ) : props.each_fooiyti === 'a' ? (
      <Ic_fooiyti_a />
    ) : (
      <Ic_fooiyti_c />
    );
  }
};

export default FooiytiImogi;
