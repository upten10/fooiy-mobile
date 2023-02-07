import React from 'react';
import {
  FooiytiAImogi,
  FooiytiCImogi,
  FooiytiEImogi,
  FooiytiFImogi,
  FooiytiIImogi,
  FooiytiNImogi,
  FooiytiSImogi,
  FooiytiTImogi,
} from '../../../assets/icons/svg';
const FooiytiImogi = props => {
  if (props) {
    return props.each_fooiyti === 'e' ? (
      <FooiytiEImogi />
    ) : props.each_fooiyti === 'i' ? (
      <FooiytiIImogi />
    ) : props.each_fooiyti === 's' ? (
      <FooiytiSImogi />
    ) : props.each_fooiyti === 'n' ? (
      <FooiytiNImogi />
    ) : props.each_fooiyti === 't' ? (
      <FooiytiTImogi />
    ) : props.each_fooiyti === 'f' ? (
      <FooiytiFImogi />
    ) : props.each_fooiyti === 'a' ? (
      <FooiytiAImogi />
    ) : (
      <FooiytiCImogi />
    );
  }
};

export default FooiytiImogi;
