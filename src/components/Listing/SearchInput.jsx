import React from 'react';
import {Input} from 'antd';
import {setText, removeText} from '../../redux/filter/action';
import {connect} from 'react-redux';

const SearchInput = (props) => {
  const onSearch = (value) => {
    if(value){
      props.setSearchText(value);
    }else{
      props.removeSearchText();
    }
  };
  const urlParams = new URLSearchParams(window.location.search);

  return (
    <div>
      <Input.Search
        defaultValue={urlParams.has('search') ? urlParams.get('search') : ''}
        size={'large'}
        onSearch={onSearch}
      />
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    searchText: state.filter.text,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setSearchText: (text) => dispatch(setText(text)),
    removeSearchText: () => dispatch(removeText())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
