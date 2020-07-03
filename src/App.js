import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Divider, Dropdown, Button, Input, Radio, Select } from 'antd';
import { SearchOutlined, EllipsisOutlined, StarFilled, StarOutlined, EditOutlined, MailOutlined, LayoutOutlined, DeleteOutlined, EnvironmentOutlined, BlockOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const denu = (
  <Menu>
    <Menu.Item key="0" icon={<EditOutlined />}>Edit</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1" icon={<MailOutlined />}>Subscribe</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" icon={<LayoutOutlined />}>Set as default</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="4" icon={<DeleteOutlined />}>Delete</Menu.Item>
  </Menu>
);
let newFilterArray = [{name:'last week_candy', selection: true, key: uuidv4()},{name:'choc_calgary', selection: false, key: uuidv4()},{name:'competetion', selection: false, key: uuidv4()}];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listShow: true,
      newFilterName: "",
      search_by: 'Category',
      location: 'North America',
    }
  }
  handleToggleFilterList = () => {
    this.setState({ listShow: !this.state.listShow })
  }
  handleFilterNameChange = e => {
    this.setState({
      newFilterName: e.target.value,
    });
  };
  handleAddNewFilter = () => {
    let name = this.state.newFilterName
    newFilterArray.push({ name: name, selection: false, key: uuidv4()});
    this.setState({ newFilterName: '' })
    this.handleToggleFilterList()
  }
  handleSearchByChange = e => {
    this.setState({
      search_by: e.target.value,
    });
  };
  handleLocationChange = e => {
    this.setState({
      location: e.target.value,
    });
  };
  handleFilterSelection = (item) => {
    const index = newFilterArray.indexOf(item);
    newFilterArray[index].selection = !newFilterArray[index].selection;
    this.forceUpdate();
  }
  render() {
    const { listShow } = this.state;
    // const SavedFilters = () => {
    //   return (

    //   )
    // }
    // const AddFilter = () => {
    //   return (

    //   )
    // }
    return (
      <Layout>
        <Sider className="sider-style">
          <div className="logo"><h1 style={{ color: '#ffffffa6', fontWeight: 'bold' }}>Filter</h1><p style={{ color: '#ffffffa6', textDecoration: 'underline', fontSize: 12, marginTop: 5 }}>clear filter</p></div>
          <Divider />
          <Menu theme="dark" mode="inline">
            <SubMenu key="1" title="Saved Filters" style={{ fontWeight: 'bold', fontSize: 14 }}>
              <div style={{ width: 215, float: 'right', paddingRight: 10 }}>
                {listShow ?  <React.Fragment>
          {newFilterArray ? newFilterArray.map(index => {
            return <div className="saved-filters-items" key={index.key}>
              <span onClick={() =>this.handleFilterSelection(index)}>{index.selection ? <StarFilled style={{ color: '#79E961' }} />: <StarOutlined />}&nbsp;&nbsp;{index.name}</span> <Dropdown overlay={denu} trigger={['click']}><EllipsisOutlined /></Dropdown>
            </div>
          }) : null}
          <Button ghost style={{ float: 'center' }} onClick={this.handleToggleFilterList}>Save New Filter</Button>
        </React.Fragment> : <React.Fragment>
          <Input type='text' placeholder="Filter Name" onChange={this.handleFilterNameChange.bind(this)} value={this.state.newFilterName}/>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 15 }}>
            <Button ghost onClick={this.handleToggleFilterList}>Cancel</Button>
            <Button ghost onClick={this.handleAddNewFilter}>Save</Button>
          </div>
        </React.Fragment>}
              </div>
            </SubMenu>
            <Divider />
            <div style={{ width: 245, paddingLeft: 25 }}>
              <Input placeholder="Keywords, #hashtags" prefix={<SearchOutlined style={{ color: '#ffffffa6', marginLeft: 24 }} />} />
            </div>
            <div className="search-by-div">
              <p style={{ fontWeight: 'bold', fontSize: 14 }}>Search By</p>
              <Radio.Group
                options={[
                  { label: <BlockOutlined style={{ fontSize: 22, padding: '4px 22px' }} />, value: 'Category' },
                  { label: <EnvironmentOutlined style={{ fontSize: 22, padding: '4px 22px' }} />, value: 'Map' }
                ]}
                onChange={this.handleSearchByChange}
                value={this.state.search_by}
                optionType="button"
              />
              <p style={{ fontSize: 12, marginTop: 15, marginLeft: 50 }}>Category: Candy</p>
            </div>
            <div style={{ width: 245, paddingLeft: 25 }}>
              <p style={{ fontWeight: 'bold', fontSize: 14 }}>Filter By</p>
              <Input placeholder="Tags" />
            </div>
            <Divider />
            <SubMenu key="2" title="Parameters" style={{ fontSize: 14 }}>
              <div style={{ width: 215, float: 'right', paddingRight: 10 }}>
              <Select ghost='true' defaultValue="Date Range">
                <Option value="Date Range">Date Range</Option>
              </Select>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', marginLeft: -36, marginTop: 15 }}>
              <Button style={{ width:110, padding: 3, color: 'white', borderColor:'white', backgroundColor:'transparent' }} >Followers Min</Button><Button style={{ width:110, padding: 3, color: 'white', borderColor:'white', backgroundColor:'transparent' }} >Followers Max</Button>
              </div>
              </div>
            </SubMenu>
            <Divider />
            <SubMenu key="3" title="Location" style={{ fontSize: 14}}>
              <div className="location-div">
              <Radio.Group style={{ marginLeft:-2, marginTop: -15}}
                options={[
                  { label: 'Global', value: 'Global' },
                  { label: 'North America', value: 'North America' }
                ]}
                onChange={this.handleLocationChange}
                value={this.state.location}
                optionType="button"
              />
              <Input placeholder="State" />
              <Input placeholder="City" />
              </div>
            </SubMenu>
            <Divider />
            <div style={{ width: 245, paddingLeft: 25 }}>
              <Input placeholder="Accounts" />
              <Button style={{ backgroundColor: '#7fce6e', color:'white', padding:'3px 87px', border:'none', marginTop:15 }}>Search</Button>
              <p style={{ fontSize: 12, marginTop: 15 }}>Accounts: 224</p>
            </div>

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            ...
          <br />
          Really
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          long
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          content
          </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Junaid</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default App;