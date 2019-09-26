import React from 'react';
import { withRouter } from 'react-router-dom';
import {Table, message, Alert} from 'antd';
import {connect} from 'react-redux';
import TotalRows from '../TotalRows';
import {oneToOneJoinData} from '../../../utils/joinRestData';
import {getData} from '../../../services/api';
import {setText} from '../../../redux/filter/action';
import {
  makeFetchParamsFromQueryParams,
  makeQueryStringFromFetchParams, makeSortParams,
  sortNameMapToTable
} from './utils';

class FeaturesTable extends React.Component {
  constructor(props){
    super(props);

    this.defaultTableParams = makeFetchParamsFromQueryParams();

    this.state = {
      data: [],
      pagination: this.defaultTableParams['page[number]'] ? {current: parseInt(this.defaultTableParams['page[number]'])} : {},
      loading: false,
      totalEntries: 0,
      sort: this.defaultTableParams['sort_direction'] ? sortNameMapToTable[this.defaultTableParams['sort_direction']] : ''
    };
  };

  componentDidMount() {
    this.fetch({
      ...this.defaultTableParams
    });
  }

  componentDidUpdate(prevProps) {
    // on Search
    if (prevProps.searchText !== this.props.searchText) {
      this.searchForText();
    }
  }

  searchForText = () => {
    const onResetTableState = () => {
      // fetch data by searched text
      const apiParams = {
        'page[number]': this.state.pagination.current
      };

      //check for empty or undefined text
      if(this.props.searchText){
        apiParams.search = this.props.searchText;
      };
      this.fetch(apiParams);
    };

    //reset table default params
    this.setState({
      pagination: {current: 1},
      sort: ''
    }, onResetTableState);
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
      sort: sorter.order
    });
    const apiParams = {
      'page[number]': pagination.current,
      ...makeSortParams(sorter),
      ...filters,
    };
    if(this.props.searchText){
      apiParams.search = this.props.searchText;
    }
    this.fetch(apiParams);
  };

  updateLocation = (params) => {
    this.props.history.push(makeQueryStringFromFetchParams(params));
  };

  fetch = (params = {}) => {
    this.updateLocation(params);
    this.setState({ loading: true });
    getData(params).then(data => data.data).then(data => {
      const pagination = { ...this.state.pagination };
      pagination.total = data.meta.total_entries;
      this.setState({
        totalEntries: data.meta.total_entries,
        loading: false,
        data: oneToOneJoinData(data),
        pagination
      });
    }).catch(e => {
      message.error('get data error');
      this.setState({fetchError: true});
    });
  };

  render() {
    const columns = [
      {
        title: 'Art',
        dataIndex: 'id',
        render: (record, row) => row.element.type,
        width: '10%',
      },
      {
        title: 'Name',
        dataIndex: 'element',
        render: record => record.attributes.label,
        sorter: true,
        sortOrder: this.state.sort,
        width: '20%',
      }
    ];

    return (
      !this.state.fetchError ? (
        <>
          <TotalRows totalEntries={this.state.totalEntries} />
          <Table
            className='features-table'
            columns={columns}
            rowKey={record => record.id}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </>
      ) : <Alert
        message="Fetch Data Error"
        description="Unfortunately we could not get data from server"
        type="error"
        showIcon
      />
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FeaturesTable));
