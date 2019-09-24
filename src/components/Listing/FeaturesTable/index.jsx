import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table, message } from 'antd';
import {connect} from 'react-redux';
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

    const defaultParams = makeFetchParamsFromQueryParams();

    this.state = {
      data: [],
      pagination: defaultParams['page[number]'] ? {current: parseInt(defaultParams['page[number]'])} : {},
      loading: false,
      totalEntries: 0,
      sort: defaultParams['sort_direction'] ? sortNameMapToTable[defaultParams['sort_direction']] : ''
    };
  };

  componentDidMount() {
    this.fetch({
      ...makeFetchParamsFromQueryParams()
    });
  }

  componentDidUpdate(prevProps) {
    // on Search
    if (prevProps.searchText !== this.props.searchText) {
      this.searchForText();
    }
  }

  searchForText = () => {
    //reset component pagination
    this.setState({
      pagination: {current: 1},
      sort: ''
    }, () => {
      // fetch data by searched text
      const apiParams = {
        'page[number]': this.state.pagination.current
      };
      if(this.props.searchText){
        apiParams.search = this.props.searchText;
      }
      this.fetch(apiParams);
    });
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
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.meta.total_entries;
      this.setState({
        totalEntries: data.meta.total_entries,
        loading: false,
        data: oneToOneJoinData(data),
        pagination
      });
    }).catch(e => {
      message.error('get data error');
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
      <div className="total-entries">
        {this.state.totalEntries} rows found
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
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