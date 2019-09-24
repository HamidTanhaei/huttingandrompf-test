import React from 'react';
import {Input} from 'antd';
import {setText} from '../../../redux/filter/action';
import {connect} from 'react-redux';

const SearchInput = (props) => {
  return (
    <div>
      <Input.Search
        defaultValue={props.searchText}
        size={'large'}
        onSearch={props.setSearchText}
      />
    </div>
  );
}

export const mapStateToProps = (state) => {
  return {
    searchText: state.filter.text,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setSearchText: (text) => dispatch(setText(text))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
