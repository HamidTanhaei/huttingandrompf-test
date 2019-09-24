import React from 'react';
import { Table } from 'antd';
import {connect} from 'react-redux';
import {oneToOneJoinData} from '../../../utils/joinRestData';
import {getData} from '../../../services/api';
import {setText} from '../../../redux/filter/action';

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
    width: '20%',
  }
];

class FeaturesTable extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    totalEntries: 0
  };

  componentDidMount() {
    this.fetch({
      search: this.props.searchText,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchText !== this.props.searchText) {
      this.searchForText();
    }
  }

  searchForText = () => {
    //reset component pagination
    this.setState({
      pagination: {current: 1}
    }, () => {
      // fetch data by searched text
      this.fetch({
        search: this.props.searchText,
        'page[number]': this.state.pagination.current
      })
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      search: this.props.searchText,
      'page[number]': pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    console.log(params);
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
    });
  };

  render() {
    console.log('rendered');
    return (
      <div className="total-entries">
        {this.state.totalEntries} rows found
        <Table
          columns={columns}
          rowKey={record => Math.floor(Math.random() * 10000) + 1}
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

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesTable);
